import { Icon } from "@iconify-icon/solid";
import { type Component, For, Show, createMemo, createSignal } from "solid-js";

import CodeLanguage, { getCodeLanguageIcon } from "../../enums/code-language";
import { getEntryCode, isEntryCodeExists } from "../../helpers/code";
import { allEnumMembers } from "../../helpers/enum";
import { t } from "../../i18n";
import type { Entry } from "../../model/entry";
import Codeblock from "../codeblock";
import TabItem from "../tab-item";
import Tabs from "../tabs";

export interface EntryCodeProps {
  entry: Entry;
}

const EntryCode: Component<EntryCodeProps> = ({ entry }) => {
  const availableLanguages = createMemo(() =>
    allEnumMembers(CodeLanguage).filter((l) => isEntryCodeExists(entry, l)),
  );
  const otherLanguages = createMemo(() =>
    [
      ...new Set(
        entry.program
          .map((p) => p.language)
          .filter(
            (p): p is string =>
              typeof p === "string" && p !== "Python" && p !== "Haskell",
          ),
      ),
    ].sort(),
  );
  const [getActiveLanguage, setActiveLanguage] = createSignal<string | null>(
    availableLanguages()[0] ?? otherLanguages()[0] ?? null,
  );

  return (
    <Show when={getActiveLanguage() !== null}>
      <Tabs>
        <For each={availableLanguages()}>
          {(language) => {
            const icon = getCodeLanguageIcon(language);

            return (
              <TabItem
                active={getActiveLanguage() === language}
                onClick={() => setActiveLanguage(language)}
              >
                <Show when={icon}>
                  {(icon) => (
                    <Icon
                      icon={icon()}
                      class="align-middle me-1"
                      width="1rem"
                    />
                  )}
                </Show>

                {t.code[language]()}
              </TabItem>
            );
          }}
        </For>
        <For each={otherLanguages()}>
          {(language) => (
            <TabItem
              active={getActiveLanguage() === language}
              onClick={() => setActiveLanguage(language)}
            >
              <Icon icon="tabler:file" class="align-middle me-1" width="1rem" />

              {language}
            </TabItem>
          )}
        </For>
      </Tabs>

      <Show when={getActiveLanguage()}>
        {(language) => (
          <For each={getEntryCode(entry, language())}>
            {(code) => (
              <Codeblock language={language()}>{code.join("\n")}</Codeblock>
            )}
          </For>
        )}
      </Show>
    </Show>
  );
};

export default EntryCode;
