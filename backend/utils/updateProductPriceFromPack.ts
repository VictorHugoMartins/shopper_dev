import connection from "../connect_database";
import { ProductType } from "../types/ProductType";

// Atualiza os preços de produtos individuais após alterar o preço do pacote via csv
// Supõe-se que o pacote é constituído de todos os produtos iguais
async function updateProductPriceFromPack(item: ProductType) {
  try {
    const result = await new Promise<any>((resolve, reject) => {
      connection.query(`SELECT DISTINCT product_id, sales_price, pack_id, qty
      FROM packs
      INNER JOIN products ON packs.pack_id = products.code
      WHERE pack_id = products.code
      and products.code = ?
      LIMIT 1`,
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

    if (typeof result !== "undefined" && typeof result[0] !== "undefined") {
      console.log(result[0])
      await new Promise<any>((resolve, reject) => {
        connection.query(`UPDATE products
      SET sales_price = sales_price / ?
      WHERE code = ?`,
          [Number(result[0].qty), result[0].product_id],
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
    console.log("Erro ao tentar atualizar produtos do pacote: ", error)
  }
}

export default updateProductPriceFromPack;