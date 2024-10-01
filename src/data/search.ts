import {
  type DefinedInitialDataOptions,
  type QueryKey,
  createQuery,
} from "@tanstack/solid-query";
import {
  type InferInput,
  type InferOutput,
  array,
  enum_,
  nullable,
  number,
  object,
  parse,
  pipe,
  string,
  transform,
} from "valibot";

import { createMemo } from "solid-js";
import Sort from "../enums/sort";
import { type Entry, EntrySchema } from "../model/entry";

const SearchParameterSchema = object({
  q: string(),
  sort: nullable(enum_(Sort), Sort.Relevance),
  start: pipe(
    nullable(number(), 0),
    transform((v) => v.toString()),
  ),
});
export type SearchParameterInput = InferInput<typeof SearchParameterSchema>;
export type SearchParameterOutput = InferOutput<typeof SearchParameterSchema>;

// TODO: Pagination
export async function search(input: SearchParameterOutput): Promise<Entry[]> {
  const params = new URLSearchParams({ ...input, fmt: "json" });
  const response = await fetch(`https://oeis.org/search?${params}`);
  const data = await response.json();

  return parse(array(EntrySchema), data);
}

export function getSearchQueryKey(input: SearchParameterOutput): QueryKey {
  return ["search", input];
}

export function createSearchQuery(
  getInput: () => SearchParameterInput,
  options: Omit<
    DefinedInitialDataOptions<Entry[], Error, Entry[], QueryKey>,
    "queryKey" | "queryFn"
  >,
) {
  const input = createMemo(() => parse(SearchParameterSchema, getInput()));

  return createQuery<Entry[], Error, Entry[], QueryKey>(() => ({
    queryKey: getSearchQueryKey(input()),
    queryFn: async () => await search(input()),
    ...options,
    enabled: input().q !== "",
  }));
}
