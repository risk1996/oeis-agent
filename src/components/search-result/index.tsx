import { type Component, For, Match, Switch } from "solid-js";
import { ValiError } from "valibot";

import { createSearchOEISQuery, getQ } from "../../data/search";
import { t } from "../../i18n";
import OEISEntryCard from "../oeis-entry-card";

export type SearchResultProps = Record<never, never>;

const SearchResult: Component<SearchResultProps> = () => {
  const searchQuery = createSearchOEISQuery(getQ, {});

  return (
    <main class="container-lg mt-3">
      <Switch>
        <Match when={getQ() === ""}>
          <h4>{t.noSearchQuery()}</h4>
          <p>{t.startSearching()}</p>
        </Match>
        <Match when={true}>
          <h4>{t.searchResultFor(getQ())}</h4>

          <Switch>
            <Match when={searchQuery.isPending}>
              <div class="text-center mt-2">
                <div
                  class="spinner-border text-primary mt-3 mb-2"
                  role="status"
                  aria-hidden="true"
                />
                <p>{t.loadingData()}</p>
              </div>
            </Match>

            <Match when={searchQuery.isError}>
              <p>Error:</p>
              <pre>{searchQuery.error?.message}</pre>
              {searchQuery.error instanceof ValiError ? (
                <pre>{JSON.stringify(searchQuery.error.issues)}</pre>
              ) : null}
            </Match>

            <Match when={searchQuery.isSuccess}>
              <div class="row">
                <For each={searchQuery.data}>
                  {(entry) => (
                    <div class="col-12 col-md-6 p-2 d-flex align-items-stretch">
                      <OEISEntryCard data={entry} />
                    </div>
                  )}
                </For>
              </div>
            </Match>
          </Switch>
        </Match>
      </Switch>
    </main>
  );
};

export default SearchResult;
