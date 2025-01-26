import { readdirSync, statSync, readFileSync } from "fs";
import { join, resolve } from "path";
import matter from "gray-matter";

import { Licenses } from "../theme";
import validateLicense from "./validate";

const licensesDirectory = resolve(import.meta.dirname, "../../licenses");

const licenses: Licenses = {};

const entries = readdirSync(licensesDirectory);

for (const entry of entries) {
  const joinedPath = join(licensesDirectory, entry);
  const stats = statSync(joinedPath);

  // Don't include non-markdown files, or the section index page
  if (!stats.isFile() || !entry.endsWith(".md") || entry === "index.md") continue;

  const licenseId = entry.replace(/\.md$/, "");

  const licenseMarkdown = readFileSync(joinedPath, "utf-8");
  const frontMatter = matter(licenseMarkdown);

  validateLicense(licenseId, frontMatter);

  const { data, content } = frontMatter;

  licenses[licenseId] = {
    name: licenseId.replaceAll("-", " "),
    link: "/licenses/" + licenseId,
    source: data.source,
    title: data.title,
    content,
  };
}

export default licenses;
