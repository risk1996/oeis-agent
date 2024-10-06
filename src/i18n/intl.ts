import { createMemo } from "solid-js";
import { getLocale } from ".";

const intl = createMemo(() => ({
  dateMedium: Intl.DateTimeFormat(getLocale(), { dateStyle: "medium" }),
}));

export default intl;
