import connection from "../connect_database";
import { objType } from "../types/objType";
import updatePackPriceFromProduct from "./updatePackPriceFromProduct";
import updateProductPriceFromPack from "./updateProductPriceFromPack";

async function updateList(data: any) {
  let list = data;

  await Promise.all(list.map(async function (item: objType) {
    connection.query("UPDATE products SET sales_price = ? WHERE code = ?",
      [Number(item.new_price), Number(item.product_code)],
      function (err: any, result: any) {
        if (err) throw err;
      }
    );

    updateProductPriceFromPack(item);
    updatePackPriceFromProduct(item);

  }))
}

export default updateList;