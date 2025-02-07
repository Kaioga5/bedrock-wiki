import isObject from "../utils/isObject";
import { Table, TableRow } from "../types";

import parseTableValue from "./parseTableValue";

export default function parseTableRow(index: number, data: unknown, columns: Table["columns"]) {
  const row: TableRow = {};

  if (!isObject(data)) {
    throw new TypeError(`Table row ${index} must be an object.`);
  }

  for (const columnId in data) {
    if (!(columnId in columns)) {
      throw new TypeError(
        `Table row ${index} contains a value for the non-existent column "${columnId}".`
      );
    }

    row[columnId] = parseTableValue(data[columnId]);
  }

  return row;
}
