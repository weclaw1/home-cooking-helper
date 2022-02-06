import { createI18n } from "vue-i18n";
import en from "./en";
import pl from "./pl";

const i18n = createI18n({
  locale: navigator.language.split("-")[0],
  fallbackLocale: "en",
  messages: {
    en: en,
    pl: pl,
  },
});

export { i18n };
