import { Icon } from "@iconify-icon/solid";
import clsx from "clsx";
import { type Component, For, type JSX, Show } from "solid-js";

import { tooltip } from "../../helpers/popper";
import { t } from "../../i18n";
import intl from "../../i18n/intl";
import type { Entry } from "../../model/entry";
import KeywordBadge from "../keyword-badge";

export interface EntryCardProps extends JSX.HTMLAttributes<HTMLDivElement> {
  class?: string;
  data: Entry;
}

const EntryCard: Component<EntryCardProps> = ({
  class: cls,
  data,
  ...props
}) => {
  const author = () => data.author[0];
  const isManyAuthors = () => data.author.length > 1;

  return (
    <div class={clsx("card", cls)} {...props}>
      <div class="card-body">
        <div class="d-flex justify-content-between">
          <div>
            <h5 class="card-title">{data.number}</h5>
            <p class="card-text">
              <Show when={author()}>{(author) => <i>{author().name}</i>}</Show>
              <Show when={isManyAuthors()}>
                {", "}
                <i>{t.etAl()}</i>
              </Show>
            </p>
          </div>

          <div>
            <div
              class="d-flex align-items-center"
              {...tooltip({ title: t.createdDate(), placement: "bottom" })}
            >
              <Icon icon="tabler:calendar-plus" class="me-1" />
              <span>{intl().date.format(data.created)}</span>
            </div>
            <div
              class="d-flex align-items-center"
              {...tooltip({ title: t.modifiedDate(), placement: "bottom" })}
            >
              <Icon icon="tabler:calendar-clock" class="me-1" />
              <span>{intl().date.format(data.time)}</span>
            </div>
          </div>
        </div>
        <p class="card-text mt-3">{data.name}</p>
      </div>
      <hr />
      <div class="card-body">
        <pre class="text-wrap">{data.data.join(", ")}</pre>
      </div>
      <hr />
      <div class="card-body">
        <span class="d-flex gap-2">
          <For each={data.keyword}>{(k) => <KeywordBadge value={k} />}</For>
        </span>
        {/* TODO: Mathematica modal */}
        {/* TODO: Maple modal */}
        {/* TODO: Program modal */}
      </div>
    </div>
  );
};

export default EntryCard;
