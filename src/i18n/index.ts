import { flatten, proxyTranslator, translator } from "@solid-primitives/i18n";
import { createMemo, createSignal } from "solid-js";

import en from "./locales/en";

const dictionaries = { en };
export type Locale = keyof typeof dictionaries;

export const [getLocale, setLocale] = createSignal<Locale>("en");
const dict = createMemo(() => flatten(dictionaries[getLocale()]));

export const t = proxyTranslator(translator(dict));
