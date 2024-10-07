import { type Params, useParams } from "@solidjs/router";
import { type Component, For, Match, Show, Switch } from "solid-js";

import { Icon } from "@iconify-icon/solid";
import CopyIconButton from "../../../components/copy-icon-button";
import EntryCode from "../../../components/entry-code";
import KeywordBadge from "../../../components/keyword-badge";
import LoadingSection from "../../../components/loading-section";
import SearchErrorSection from "../../../components/search-error-section";
import { createSearchQuery } from "../../../data/search";
import { tooltip } from "../../../helpers/popper";
import { t } from "../../../i18n";
import intl from "../../../i18n/intl";

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
                      <For each={detail().authors}>
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
                    <span>{intl().dateMedium.format(detail().modified)}</span>
                  </div>
                </div>
              </div>

              <div class="d-flex justify-content-between align-items-baseline">
                <h5>{t.description.label()}</h5>
                <CopyIconButton content={detail().name} />
              </div>
              <p class="card-text mt-3">{detail().name}</p>
              <hr />

              <div class="d-flex justify-content-between align-items-baseline">
                <h5>{t.sequence.label()}</h5>
                <CopyIconButton content={detail().sequence.join(", ")} />
              </div>
              <pre class="text-wrap">{detail().sequence.join(", ")}</pre>
              <hr />

              <Show when={(detail().formulas.length ?? 0) > 0}>
                <div class="d-flex justify-content-between align-items-baseline">
                  <h5>{t.formula.label()}</h5>
                  <CopyIconButton content={detail().formulas.join("\n")} />
                </div>
                <pre textContent={detail().formulas.join("\n")} />
                <hr />
              </Show>

              <Show when={detail().programs.length > 0}>
                <h5>{t.code.label()}</h5>
                <EntryCode entry={detail()} />
                <hr />
              </Show>

              <h5>{t.keyword.label()}</h5>
              <span class="d-flex gap-2">
                <For each={detail().keywords}>
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
