import { type Component, For, Show } from "solid-js";

import type { OEISEntry } from "../../data/search";

export interface OEISEntryCardProps {
  data: OEISEntry;
}

const OEISEntryCard: Component<OEISEntryCardProps> = (props) => {
  return (
    <>
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">{props.data.id}</h5>
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
          <li class="list-group-item">An item</li>
          <li class="list-group-item">Another item</li>
        </ul>
      </div>
      <pre>{JSON.stringify(props.data, null, 2)}</pre>
    </>
  );
};

export default OEISEntryCard;
