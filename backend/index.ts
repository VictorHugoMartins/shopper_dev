import { SERVER_PORT } from "./config/enviroment_variables";
import connection from "./connect_database";
import { objType } from "./types/objType";
import { convertCSVBase64ToDict } from "./utils/convertCSVBase64ToDict";

const express = require('express');
const cors = require('cors')

const server = express();

server.use(express.json({ limit: '50mb' }));
server.use(cors())
server.options('*', cors())

function buildColumnsObject(columns: any) {
  return [{
    value: "product_code",
    label: "Código do Produto"
  },
  {
    value: "new_price",
    label: "Preço"
  },
  {
    value: "message",
    label: "Válido"
  }]
}

server.post('/api/validate', (req: any, res: any) => {
  let list = convertCSVBase64ToDict(req.body.data)
  let isValid = true

  list.forEach(function (item: objType) {
    item.message = "";
    if (!item.product_code) {
      item.message = item.message + "Código inexistente!"
    }
    if (!item.new_price || (Number.isNaN(item.new_price))) {
      item.message = item.message + "Novo preço inválido!"
    }

    connection.connect(function (err: any) {
      if (err) throw err;
      connection.query("SELECT code, cost_price, sales_price from products where code = ?",
        item.product_code,
        function (err: any, result: any) {
          if (err) {
            throw err;
          }

          console.log(result)

          if (!result) {
            item.message = item.message + "Código inexistente!";
          } else {
            if (item.new_price < result.cost_price) {
              item.message = "Não atende a restrição do time financeiro!"
            }
            if ((item.new_price > 10 * (result.sales_price / 100)) || (item.new_price < 10 * (result.sales_price / 100))) {
              item.message = item.message + "Não atende a restrição do time de marketing!"
            }
          }
        });
    });

    if (item.message === "") {
      item.message = item.message + "Válido!"
    } else {
      isValid = false
    }
  })

  return res.json({
    success: true,
    object: {
      isValid: isValid,
      list: {
        columns: buildColumnsObject(list),
        rows: list
      }
    }
  });
})

server.put('/api/update', (req: any, res: any) => {
  let list = req.body.data

  list.forEach(function (item: objType) {
    item.message = "";

    connection.query("UPDATE products SET sales_price = ? where code = ?",
      [item.new_price, item.product_code],
      function (err: any, result: any) {
        if (err) throw err;
      }
    );


    connection.query(`with subquery as (
                        select distinct(product_id), sales_price, pack_id, qty
                          from packs
                          inner join products
                          where packs.pack_id = products.code
                          and pack_id = ?
                          limit 1
                      )
                      select products.sales_price,
                            ?/subquery.qty from products
                      inner join subquery on code = subquery.product_id`,
      [item.product_code, item.new_price],
      function (err: any, result: any) {
        if (err) throw err;
      }
    );

    connection.query(`with subquery as (
                        select distinct(pack_id), sales_price, qty, product_id
                        from packs
                        inner join products
                        on packs.pack_id = products.code
                      )
                      select pack_id,
                            sales_price,
                            sales_price - (qty * (select sales_price from products where code = 24 limit 1) ) + (qty * ?),
                            qty
                      from subquery`,
      [item.product_code],
      function (err: any, result: any) {
        if (err) throw err;
      }
    );

  })


  return res.json({
    success: true,
    message: "Dados atualizados com sucesso!"
  });
})

server.listen(SERVER_PORT);