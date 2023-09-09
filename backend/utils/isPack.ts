import connection from "../connect_database";
import { ProductType } from "../types/ProductType";

// Atualiza os preços de produtos individuais após alterar o preço do pacote via csv
// Supõe-se que o pacote é constituído de todos os produtos iguais
async function isPack(item: ProductType) {
  try {
    const result = await new Promise<any>((resolve, reject) => {
      connection.query(`SELECT products.code from products inner join packs on products.code = packs.pack_id and products.code = ?`,
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

    return (typeof result !== "undefined" && typeof result[0] !== "undefined")

  } catch (error) {
    console.log("Erro ao verificar se o produto é um pacote: ", error)
  }
}

export default isPack;