
import i18next from 'i18next'
import I18NextVue from 'i18next-vue'
import LanguageDetector from 'i18next-browser-languagedetector';

import sv from '~/localization/lang/sv.json'
import en from '~/localization/lang/en.json'

i18next.init({
  debug:true,
  resources:{sv:{translation: sv}, en:{translation:en}},
  fallbackLng: ['en', 'sv', 'cimode'],
  supportedLngs: ['sv', 'en', 'cimode']
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
  nuxtApp.vueApp.use(I18NextVue, {i18next})
})
