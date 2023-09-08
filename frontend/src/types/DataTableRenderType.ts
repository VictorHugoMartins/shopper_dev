import { DataTableColumnType } from "./DataTableColumnType"
import { DataTableRowType } from "./DataTableRowType"

export type DataTableRenderType = {
  columns: DataTableColumnType[],
  rows: DataTableRowType[],
}