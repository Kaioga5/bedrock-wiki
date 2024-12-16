import { defineLoader } from "vitepress";
import { Table } from "../types";
import { readFileSync } from "fs";

export interface Tables {
  [path: string]: Table;
}

declare const data: Tables;
export { data };

export default defineLoader({
  watch: "docs/public/assets/tables/**/*.json",
  load(watchedFiles: string[]) {
    const data = {};

    for (const path of watchedFiles) {
      data[path] = JSON.parse(readFileSync(path, "utf-8"));
    }

    return data;
  },
});
