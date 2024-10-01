import { Icon } from "@iconify-icon/solid";
import clsx from "clsx";
import { type Component, For, Show } from "solid-js";

import type { OEISEntry } from "../../data/search";
import { t } from "../../i18n";
import intl from "../../i18n/intl";

export interface OEISEntryCardProps {
  class?: string;
  data: OEISEntry;
}

const OEISEntryCard: Component<OEISEntryCardProps> = (props) => (
  <div class={clsx("card", props.class)}>
    <div class="card-body">
      <div class="d-flex justify-content-between">
        <div>
          <h5 class="card-title">{props.data.number}</h5>
          <p class="card-text">
            <For each={props.data.author}>
              {(author) => (
                <span class="badge bg-secondary me-1">
                  <i>{author.name}</i>
                  <Show when={author.date !== null}>
                    <span>
                      , <small>{author.date}</small>
                    </span>
                  </Show>
                </span>
              )}
            </For>
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
    <ul class="list-group list-group-flush">
      <li class="list-group-item">
        <pre class="text-wrap">{props.data.data.join(", ")}</pre>
      </li>
      <li class="list-group-item">
        {/* TODO: Comment */}
        {/* TODO: Formula */}
        {/* TODO: Keyword? */}
        {/* TODO: Offset? */}
        {/* TODO: Reference */}
        {/* TODO: XRef */}
      </li>
    </ul>
    <div class="card-body">
      {/* TODO: Mathematica modal */}
      {/* TODO: Maple modal */}
      {/* TODO: Program modal */}
    </div>
  </div>
);

export default OEISEntryCard;
