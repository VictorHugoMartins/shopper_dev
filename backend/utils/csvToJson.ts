import { ProductType } from "../types/ProductType";

export function csvToJson(csv: string): {}[] | null {
  let result = [] as Array<ProductType>;

  let lines = csv.split("\n");
  let headers = lines[0].split(",");

  if (!headers.includes('product_code') && !headers.includes('new_price\r') && headers.length !== 2) {
    return null
  }

  for (let i = 1; i < lines.length; i++) {
    let obj = {} as any;
    let currentLine = lines[i].split(",");

    for (let j = 0; j < headers.length; j++) {
      obj[headers[j].replace('\r', '')] = currentLine[j];
    }

    result.push(obj);
  }

  return result;
}