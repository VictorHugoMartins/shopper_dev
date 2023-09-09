import connection from "../connect_database";
import { ProductType } from "../types/ProductType";

// Atualiza os preços de pacotes após alterar o preço de produtos individuais via csv
async function updatePackPriceFromProduct(item: ProductType) {
  try {
    const result = await new Promise<any>((resolve, reject) => {
      connection.query(`SELECT DISTINCT pack_id, sales_price, qty, product_id
       FROM packs
       INNER JOIN products ON packs.pack_id = products.code
       AND products.code = ?`,
        Number(item.product_code),
        (err: any, rows: any) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
        }
      );
    });

    if (typeof result !== "undefined" && typeof result[0] !== "undefined") {
      console.log(result[0])
      const update = await new Promise<any>((resolve, reject) => {
        connection.query(`UPDATE products SET sales_price = (
           SELECT sales_price - (qty * (SELECT sales_price FROM products WHERE code = ? LIMIT 1)) + (qty * ?)
           FROM subquery
         ) WHERE code = ?`,
          [Number(result[0].product_id), Number(item.new_price), Number(item.product_code)],
          (err: any, rows: any) => {
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