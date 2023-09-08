import { objType } from "../types/objType";
import { csvToJson } from "./csvToJson";

export function convertCSVBase64ToDict(base64file: string): any {
  base64file = base64file.split('data:text/csv;base64,')[1];
  const csvData = atob(base64file);

  return csvToJson(csvData)
}