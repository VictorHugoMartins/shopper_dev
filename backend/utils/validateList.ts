import connection from "../connect_database";
import { ProductType } from "../types/ProductType";
import { convertCSVBase64ToDict } from "./convertCSVBase64ToDict";
import tableColumns from "./tableColumns";
import verifyDifference from "./verifyDifference";

async function validateList(data: any) {
  let isValid = true

  let list = convertCSVBase64ToDict(data)

  if (!list) {
    isValid = false;
  }

  const newList = await Promise.all(list.map(async function (item: ProductType) {
    item.message = "";
    if (!item.product_code) {
      item.message = item.message + "Código inexistente!"
    } else {
      if (!item.new_price || (Number.isNaN(parseFloat(item.new_price.toString())))) {
        item.message = item.message + "Novo preço inválido!"
      }

      const results = await new Promise<any>((resolve, reject) => {
        connection.query(
          "SELECT code, name, cost_price, sales_price from products where code = ? limit 1",
          item.product_code,
          (err: Error, rows: {}) => {
            if (err) {
              reject(err);
            } else {
              resolve(rows);
            }
          }
        );
      });

      if (!results) {
        item.message = item.message + "Código inexistente!";
      } else {
        let result = { ...results[0], cost_price: parseFloat(results[0].cost_price), sales_price: parseFloat(results[0].sales_price) }
        item = { ...item, name: result.name, sales_price: result.sales_price };
        console.log(item, result)

        if (item.new_price < result.cost_price) {
          item.message = "Não atende a restrição do time financeiro!"
        }

        // Aceita mudanças de até 10% no valor atual
        if (verifyDifference(result.sales_price, item.new_price)) {
          item.message = item.message + "Não atende a restrição do time de marketing!"
        }
      }
    }

    if (item.message === "") {
      item.message = item.message + "Válido!"
    } else {
      isValid = false
    }

    return item;
  }))

  return {
    isValid: isValid,
    list: {
      columns: tableColumns,
      rows: newList
    }
  }
}

export default validateList;