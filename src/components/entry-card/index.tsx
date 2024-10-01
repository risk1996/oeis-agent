import { Icon } from "@iconify-icon/solid";
import clsx from "clsx";
import { type Component, Show } from "solid-js";

import { t } from "../../i18n";
import intl from "../../i18n/intl";
import type { Entry } from "../../model/entry";

export interface EntryCardProps {
  class?: string;
  data: Entry;
}

const EntryCard: Component<EntryCardProps> = (props) => {
  const author = () => props.data.author[0];
  const isManyAuthors = () => props.data.author.length > 1;

  return (
    <div class={clsx("card", props.class)}>
      <div class="card-body">
        <div class="d-flex justify-content-between">
          <div>
            <h5 class="card-title">{props.data.number}</h5>
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
              data-bs-toggle="tooltip"
              data-bs-placement="bottom"
              data-bs-title={t.createdDate()}
            >
              <Icon icon="tabler:calendar-plus" class="me-1" />
              <span>{intl().date.format(props.data.created)}</span>
            </div>
            <div
              class="d-flex align-items-center"
              data-bs-toggle="tooltip"
              data-bs-placement="bottom"
              data-bs-title={t.modifiedDate()}
            >
              <Icon icon="tabler:calendar-clock" class="me-1" />
              <span>{intl().date.format(props.data.time)}</span>
            </div>
          </div>
        </div>
        <p class="card-text mt-3">{props.data.name}</p>
      </div>
      <hr />
      <div class="card-body">
        <pre class="text-wrap">{props.data.data.join(", ")}</pre>
      </div>
      <hr />
      <div class="card-body">
        {/* TODO: Mathematica modal */}
        {/* TODO: Maple modal */}
        {/* TODO: Program modal */}
      </div>
    </div>
  );
};

export default EntryCard;
