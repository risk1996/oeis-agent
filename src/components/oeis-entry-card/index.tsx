import { type Component, For, Show } from "solid-js";

import type { OEISEntry } from "../../data/search";

export interface OEISEntryCardProps {
  data: OEISEntry;
}

const OEISEntryCard: Component<OEISEntryCardProps> = (props) => {
  return (
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">
          {props.data.number}

          <Show when={props.data.id !== undefined}>
            {" - "}
            {props.data.id}
          </Show>
          {/* TODO: Revision */}
          {/* TODO: Created */}
          {/* TODO: Time */}
        </h5>
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
        <p class="card-text">{props.data.name}</p>
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">
          <For each={props.data.data}>
            {(datum) => <code class="badge text-bg-primary me-1">{datum}</code>}
          </For>
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
};

export default OEISEntryCard;
