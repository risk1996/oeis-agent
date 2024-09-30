import { type Component, For, Match, Switch } from "solid-js";
import { ValiError } from "valibot";

import { createSearchOEISQuery, getQ } from "../../data/search";

export type SearchResultProps = Record<never, never>;

const SearchResult: Component<SearchResultProps> = () => {
  const searchQuery = createSearchOEISQuery(getQ, {});

  return (
    <main class="container-lg mt-3">
      <h4>Search result for "{getQ()}"</h4>

      <Switch>
        <Match when={searchQuery.isPending}>
          <p>Loading...</p>
        </Match>
        <Match when={searchQuery.isError}>
          <p>Error:</p>
          <pre>{searchQuery.error?.message}</pre>
          {searchQuery.error instanceof ValiError ? (
            <pre>{JSON.stringify(searchQuery.error.issues)}</pre>
          ) : null}
        </Match>
        <Match when={searchQuery.isSuccess}>
          <For each={searchQuery.data}>
            {(entry) => <pre>{JSON.stringify(entry, null, 2)}</pre>}
          </For>
        </Match>
      </Switch>
    </main>
  );
};

export default SearchResult;
