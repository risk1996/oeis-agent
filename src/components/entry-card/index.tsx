import { Icon } from "@iconify-icon/solid";
import { A } from "@solidjs/router";
import clsx from "clsx";
import { type Component, For, type JSX, Show } from "solid-js";

import { useDirective } from "../../directives";
import { tooltip } from "../../directives/popper";
import { t } from "../../i18n";
import intl from "../../i18n/intl";
import type { Entry } from "../../model/entry";
import KeywordBadge from "../keyword-badge";

useDirective(tooltip);

export interface EntryCardProps extends JSX.HTMLAttributes<HTMLDivElement> {
  class?: string;
  data: Entry;
}

const EntryCard: Component<EntryCardProps> = ({
  class: cls,
  data,
  ...props
}) => {
  const author = () => data.authors[0];
  const isManyAuthors = () => data.authors.length > 1;

  return (
    <div class={clsx("card", cls)} {...props}>
      <div class="card-body">
        <div class="d-flex justify-content-between">
          <div>
            <A href={`/id/${data.number}`} class="link-primary">
              <h5 class="card-title">{data.number}</h5>
            </A>

            <p class="card-text">
              <Show when={author()}>{(author) => <i>{author().name}</i>}</Show>
              <Show when={isManyAuthors()}>
                {", "}
                <i>{t.author.etAl()}</i>
              </Show>
            </p>
          </div>

          <div>
            <div
              class="d-flex align-items-center"
              use:tooltip={{ title: t.dates.created(), placement: "bottom" }}
            >
              <Icon icon="tabler:calendar-plus" class="me-1" />
              <span>{intl().dateMedium.format(data.created)}</span>
            </div>
            <div
              class="d-flex align-items-center"
              use:tooltip={{ title: t.dates.modified(), placement: "bottom" }}
            >
              <Icon icon="tabler:calendar-clock" class="me-1" />
              <span>{intl().dateMedium.format(data.modified)}</span>
            </div>
          </div>
        </div>
        <p class="card-text mt-3">{data.name}</p>
      </div>
      <hr />
      <div class="card-body">
        <pre class="text-wrap text-break">{data.sequence.join(", ")}</pre>
      </div>
      <hr />
      <div class="card-body">
        <span class="d-flex gap-2">
          <For each={data.keywords}>{(k) => <KeywordBadge value={k} />}</For>
        </span>
      </div>
    </div>
  );
};

export default EntryCard;
