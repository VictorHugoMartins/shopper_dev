import connection from "../connect_database";
import { ProductType } from "../types/ProductType";

// Atualiza os preços de pacotes após alterar o preço de produtos individuais via csv
async function updatePackPriceFromProduct(item: ProductType) {
  try {
    const results = await new Promise<any>((resolve, reject) => {
      connection.query(`SELECT DISTINCT pack_id, sales_price, qty, product_id
       FROM packs
       INNER JOIN products ON packs.pack_id = products.code
       AND products.code = ?`,
        Number(item.product_code),
        (err: Error, rows: {}) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
        }
      );
    });

    if (typeof results !== "undefined" && typeof results[0] !== "undefined") {
      await new Promise<{}>((resolve, reject) => {
        connection.query(`UPDATE products SET sales_price = (
          SELECT sales_price - (? * (SELECT sales_price FROM (SELECT * FROM products) AS p WHERE code = ? LIMIT 1)) + (? * ?)
          FROM (SELECT * FROM products WHERE code = ? ) AS p
        ) WHERE code = ?`,
          [Number(results[0].qty),
          Number(results[0].product_id),
          Number(results[0].qty),
          Number(item.new_price),
          Number(item.product_code),
          Number(item.product_code)],
          (err: Error, rows: {}) => {
            if (err) {
              reject(err);
            } else {
              resolve(rows);
            }
          }
        );
      });
    }
  } catch (error) {
    console.log("Erro ao atualizar packote do produto: ", error)
  }
}

export default updatePackPriceFromProduct;