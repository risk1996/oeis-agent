import { Icon } from "@iconify-icon/solid";
import { type Component, For, Show, createMemo, createSignal } from "solid-js";

import {
  getAllEntryProgramLanguages,
  getEntryProgramDisplay,
} from "../../helpers/code";
import type { Entry } from "../../model/entry";
import Codeblock from "../codeblock";
import CopyIconButton from "../copy-icon-button";
import TabItem from "../tab-item";
import Tabs from "../tabs";

export interface EntryCodeProps {
  entry: Entry;
}

const EntryCode: Component<EntryCodeProps> = ({ entry }) => {
  const allDisplays = createMemo(() =>
    getAllEntryProgramLanguages(entry).map((language) =>
      getEntryProgramDisplay(entry, language),
    ),
  );
  const [getActiveLanguage, setActiveLanguage] = createSignal<string | null>(
    allDisplays()[0]?.language.name ?? null,
  );
  const activeDisplay = createMemo(() =>
    allDisplays().find(
      (display) => display.language.name === getActiveLanguage(),
    ),
  );

  return (
    <Show when={getActiveLanguage() !== null}>
      <Tabs>
        <For each={allDisplays()}>
          {(display) => {
            return (
              <TabItem
                active={getActiveLanguage() === display.language.name}
                onClick={() => setActiveLanguage(display.language.name)}
              >
                <Show when={display.icon}>
                  {(icon) => (
                    <Icon
                      icon={icon()}
                      class="align-middle me-1"
                      width="1rem"
                    />
                  )}
                </Show>

                {display.language.name}
              </TabItem>
            );
          }}
        </For>
      </Tabs>

      <Show when={activeDisplay()}>
        {(display) => (
          <For each={display().code}>
            {(code) => (
              <div class="pb-2">
                <Codeblock language={display().language.highlight}>
                  {code.join("\n")}
                </Codeblock>
                <CopyIconButton
                  class="d-block w-100"
                  withText
                  content={code.join("\n")}
                />
              </div>
            )}
          </For>
        )}
      </Show>
    </Show>
  );
};

export default EntryCode;
