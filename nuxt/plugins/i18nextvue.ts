import i18next from "i18next";
import I18NextVue from "i18next-vue";
import { universalLanguageDetect } from "@unly/universal-language-detector";

const SUPPORTED_LANGUAGES = ["en", "sv"];
const FALLBACK_LANG = "en";

i18next
  .init({
    debug: false,
    resources: {},
    fallbackLng: FALLBACK_LANG,
    supportedLngs: SUPPORTED_LANGUAGES,
    ns: ["common"],
    defaultNS: "common",
  });

export default defineNuxtPlugin((nuxtApp) => {
  const lang = universalLanguageDetect({
    supportedLanguages: SUPPORTED_LANGUAGES, // Whitelist of supported languages, will be used to filter out languages that aren't supported
    fallbackLanguage: FALLBACK_LANG, // Fallback language in case the user's language cannot be resolved
    // acceptLanguageHeader: get(req, 'headers.accept-language'), // Optional - Accept-language header will be used when resolving the language on the server side
    // serverCookies: cookies, // Optional - Cookie "i18next" takes precedence over navigator configuration (ex: "i18next: fr"), will only be used on the server side
    errorHandler: (error) => { // Optional - Use you own logger here, Sentry, etc.
      console.log("Language Detection Error:");
      console.error(error);
    },
  });

  i18next.changeLanguage(lang);

  nuxtApp.vueApp.use(I18NextVue, { i18next });
});
