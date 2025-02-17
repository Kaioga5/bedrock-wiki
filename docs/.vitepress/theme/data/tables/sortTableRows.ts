import { TableRow, TableValue } from "../../types";

export interface TableSorting {
  column: string;
  order: "ascending" | "descending";
}

export type SortableTableValue = Exclude<TableValue, string[]>; // Lists cannot be sorted

const typeOrder = ["undefined", "boolean", "number", "string"];

/**
 * Sorts an array of rows in place. This method mutates the array and returns a reference to the same array.
 */
export default function sortTableRows(sorting: TableSorting, rows: TableRow[]) {
  return rows.sort(compareRows);

  function compareRows(rowA: TableRow, rowB: TableRow) {
    const valueA = rowA[sorting.column] as SortableTableValue;
    const valueB = rowB[sorting.column] as SortableTableValue;

    if (valueA === valueB) return 0;

    let relative: number;

    if (
      (typeof valueA === "boolean" && typeof valueB === "boolean") ||
      (typeof valueA === "number" && typeof valueB === "number")
    ) {
      relative = valueA > valueB ? 1 : -1;
    } else if (typeof valueA === "string" && typeof valueB === "string") {
      relative = valueA.localeCompare(valueB);
    } else {
      relative = typeOrder.indexOf(typeof valueA) - typeOrder.indexOf(typeof valueB);
    }

    if (sorting.order === "descending") relative *= -1;

    return relative;
  }
}
