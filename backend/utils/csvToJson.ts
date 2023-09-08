import { objType } from "../types/objType";

export function csvToJson(csv: string): {}[] {
  let result = [] as Array<objType>;

  let lines = csv.split("\n");
  let headers = lines[0].split(",");

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