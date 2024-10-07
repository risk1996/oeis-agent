import { type Params, useParams } from "@solidjs/router";
import { type Component, For, Match, Show, Switch } from "solid-js";

import { Icon } from "@iconify-icon/solid";
import EntryCode from "../../components/entry-code";
import KeywordBadge from "../../components/keyword-badge";
import LoadingSection from "../../components/loading-section";
import SearchErrorSection from "../../components/search-error-section";
import { createSearchQuery } from "../../data/search";
import { isEntryHasCode } from "../../helpers/code";
import { tooltip } from "../../helpers/popper";
import { t } from "../../i18n";
import intl from "../../i18n/intl";

export interface DetailPageParams extends Params {
  id: string;
}

const DetailPage: Component = () => {
  const params = useParams<DetailPageParams>();
  const searchQuery = createSearchQuery(
    () => ({ q: `id:${params.id}`, sort: null }),
    {},
  );

  return (
    <Switch>
      <Match when={searchQuery.isPending}>
        <h4>{params.id}</h4>
        <LoadingSection class="py-4" />
      </Match>

      <Match when={searchQuery.isError}>
        <h4>{params.id}</h4>
        <SearchErrorSection error={searchQuery.error} />
      </Match>

      <Match when={searchQuery.isSuccess}>
        <Show when={searchQuery.data?.[0]}>
          {(detail) => (
            <>
              {/* TODO: Wrap on small screen */}
              <div class="d-flex justify-content-between">
                <div>
                  <h4>{detail().number}</h4>

                  <ul class="list-unstyled">
                    <li>
                      <b>{t.author.by()}</b>:
                    </li>
                    <ul>
                      <For each={detail().author}>
                        {(author) => (
                          <li>
                            <i>{author.name}</i>
                            <Show when={author.date}>
                              {", "}
                              {author.date}
                            </Show>
                          </li>
                        )}
                      </For>
                    </ul>
                  </ul>
                </div>

                <div>
                  <div
                    class="d-flex align-items-center"
                    {...tooltip({
                      title: t.dates.created(),
                      placement: "bottom",
                    })}
                  >
                    <Icon icon="tabler:calendar-plus" class="me-1" />
                    <span>{intl().dateMedium.format(detail().created)}</span>
                  </div>
                  <div
                    class="d-flex align-items-center"
                    {...tooltip({
                      title: t.dates.modified(),
                      placement: "bottom",
                    })}
                  >
                    <Icon icon="tabler:calendar-clock" class="me-1" />
                    <span>{intl().dateMedium.format(detail().time)}</span>
                  </div>
                </div>
              </div>

              <h5>{t.description.label()}</h5>
              <p class="card-text mt-3">{detail().name}</p>
              <hr />

              <h5>{t.sequence.label()}</h5>
              <pre class="text-wrap">{detail().data.join(", ")}</pre>
              <hr />

              <Show when={(detail().formula.length ?? 0) > 0}>
                <h5>{t.formula.label()}</h5>
                <pre textContent={detail().formula.join("\n")} />
                <hr />
              </Show>

              <Show when={isEntryHasCode(detail())}>
                <h5>{t.code.label()}</h5>
                <EntryCode entry={detail()} />
                <hr />
              </Show>

              <span class="d-flex gap-2">
                <For each={detail().keyword}>
                  {(k) => <KeywordBadge value={k} />}
                </For>
              </span>
            </>
          )}
        </Show>
      </Match>
    </Switch>
  );
};

export default DetailPage;
