import connection from "./connect_database";
import { SERVER_PORT } from "./config/enviroment_variables";


import { objType } from "./types/objType";
import validateList from "./utils/validateList";

const express = require('express');
const cors = require('cors')

const server = express();

server.use(express.json({ limit: '50mb' }));
server.use(cors())
server.options('*', cors())

server.post('/api/validate', async (req: any, res: any) => {
  try {
    const object = await validateList(req.body.data)
    return res.json({
      success: true,
      object
    });
  } catch {
    return res.json({
      success: false,
      object: {},
      message: "Erro ao validar dados!"
    });
  }
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
                      update products set sales_price = ( select products.sales_price,
                            ?/subquery.qty from products
                      inner join subquery on code = subquery.product_id ) where code = ?`,
      [item.product_code, item.new_price, item.product_code],
      function (err: any, result: any) {
        if (err) throw err;
      }
    );

    connection.query(`with subquery as (
                        select distinct(pack_id), sales_price, qty, product_id
                        from packs
                        inner join products
                        on packs.pack_id = products.code
                        and product_code = ?
                      )
                      update products set sales_price = (
                      select sales_price - (qty * (select sales_price from products where code = 24 limit 1) ) + (qty * ?)
                      from subquery ) where code = ?`,
      [item.product_code, item.product_code],
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