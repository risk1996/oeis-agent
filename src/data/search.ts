import {
  type DefinedInitialDataInfiniteOptions,
  type QueryKey,
  createInfiniteQuery,
} from "@tanstack/solid-query";
import { sum } from "remeda";
import {
  type InferInput,
  type InferOutput,
  array,
  enum_,
  nullable,
  object,
  parse,
  string,
} from "valibot";

import { createMemo } from "solid-js";
import Sort from "../enums/sort";
import { type Entry, EntrySchema } from "../model/entry";

const SearchParameterSchema = object({
  q: string(),
  sort: nullable(enum_(Sort), Sort.Relevance),
});
export type SearchParameterInput = InferInput<typeof SearchParameterSchema>;
export type SearchParameterOutput = InferOutput<typeof SearchParameterSchema>;

export async function search(
  input: SearchParameterOutput,
  page: number,
): Promise<Entry[]> {
  const start = (page * 10).toString();
  const params = new URLSearchParams({ ...input, start, fmt: "json" });
  const response = await fetch(`https://oeis.org/search?${params}`);
  const data = await response.json();

  return parse(nullable(array(EntrySchema), []), data);
}

export function getSearchQueryKey(input: SearchParameterOutput): QueryKey {
  return ["search", input];
}

export function createSearchQuery(
  getInput: () => SearchParameterInput,
  options: Omit<
    DefinedInitialDataInfiniteOptions<Entry[], Error, Entry[], QueryKey>,
    "queryKey" | "queryFn" | "initialPageParam" | "getNextPageParam"
  >,
) {
  const input = createMemo(() => parse(SearchParameterSchema, getInput()));

  return createInfiniteQuery<Entry[], Error, Entry[], QueryKey, number>(() => ({
    queryKey: getSearchQueryKey(input()),
    queryFn: async ({ pageParam }) => await search(input(), pageParam),
    initialPageParam: 0,
    getNextPageParam: (_, allPages, lastPage) => {
      const itemCount = sum(allPages.map((page) => page.length));
      const expectedCount = (lastPage + 1) * 10;

      return itemCount < expectedCount ? null : lastPage + 1;
    },
    select: (data) => data.pages.flat(),
    ...options,
    enabled: input().q !== "",
  }));
}
