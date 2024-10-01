import {
  type InferOutput,
  array,
  isoTimestamp,
  number,
  object,
  optional,
  pipe,
  string,
  transform,
} from "valibot";

import { parseAuthors } from "../helpers/author";

export const EntrySchema = object({
  author: pipe(optional(string(), ""), transform(parseAuthors)),
  comment: optional(array(string()), []),
  created: pipe(
    string(),
    isoTimestamp(),
    transform((v) => new Date(v)),
  ),
  data: pipe(
    string(),
    transform((v) => v.split(",").map(Number)),
  ),
  example: optional(array(string()), []),
  formula: optional(array(string()), []),
  id: optional(string(), ""),
  keyword: pipe(
    string(),
    transform((v) => v.split(",")),
  ),
  link: optional(array(string()), []),
  maple: optional(array(string()), []),
  mathematica: optional(array(string()), []),
  name: string(),
  number: pipe(
    number(),
    transform((v) => `A${v.toString().padStart(6, "0")}`),
  ),
  offset: pipe(
    string(),
    transform((v) => v.split(",").map(Number)),
  ),
  program: optional(array(string()), []),
  reference: optional(array(string()), []),
  references: number(),
  revision: number(),
  time: pipe(
    string(),
    isoTimestamp(),
    transform((v) => new Date(v)),
  ),
  xref: optional(array(string()), []),
});
export type Entry = InferOutput<typeof EntrySchema>;
