
import i18next from 'i18next'
// import resourcesToBackend from 'i18next-resources-to-backend'
import I18NextVue from 'i18next-vue'

import universalLanguageDetect from '@unly/universal-language-detector';
// import sv from '~/localization/lang/sv.json'
// import en from '~/localization/lang/en.json'
const SUPPORTED_LANGUAGES = ['en', 'sv'];
const FALLBACK_LANG = 'en';

i18next
.init({
  debug:false,
  resources:{},
  fallbackLng: FALLBACK_LANG,
  supportedLngs: SUPPORTED_LANGUAGES,
  ns: ['common'],
  defaultNS: 'common',
})

// i18next.use(LanguageDetector).init({
//   detection: {
//     // order and from where user language should be detected
//     order: ['querystring', 'cookie', 'localStorage', 'sessionStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],
//
//     // keys or params to lookup language from
//     lookupQuerystring: 'lng',
//     lookupCookie: 'i18next',
//     lookupLocalStorage: 'i18nextLng',
//     lookupSessionStorage: 'i18nextLng',
//     lookupFromPathIndex: 0,
//     lookupFromSubdomainIndex: 0,
//
//     // cache user language on
//     caches: [],//['localStorage', 'cookie'],
//     excludeCacheFor: ['cimode'], // languages to not persist (cookie, localStorage)
//
//     // optional expire and domain for set cookie
//     cookieMinutes: 10,
//     cookieDomain: 'myDomain',
//
//     // optional htmlTag with lang attribute, the default is:
//     htmlTag: document.documentElement,
//
//     // optional set cookie options, reference:[MDN Set-Cookie docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie)
//     cookieOptions: { path: '/', sameSite: 'strict' },
//   },
// });

export default defineNuxtPlugin(nuxtApp => {
  const lang = universalLanguageDetect({
    supportedLanguages: SUPPORTED_LANGUAGES, // Whitelist of supported languages, will be used to filter out languages that aren't supported
    fallbackLanguage: FALLBACK_LANG, // Fallback language in case the user's language cannot be resolved
    // acceptLanguageHeader: get(req, 'headers.accept-language'), // Optional - Accept-language header will be used when resolving the language on the server side
    // serverCookies: cookies, // Optional - Cookie "i18next" takes precedence over navigator configuration (ex: "i18next: fr"), will only be used on the server side
    errorHandler: (error) => { // Optional - Use you own logger here, Sentry, etc.
      console.log('Custom error handler:');
      console.error(error);
    },
  });
  i18next.on('languageChanged', (lng) => {

  })
  i18next.changeLanguage(lang);
  
  nuxtApp.vueApp.use(I18NextVue, {i18next})
})
