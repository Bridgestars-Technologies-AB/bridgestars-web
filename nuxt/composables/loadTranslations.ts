import { useTranslation as useT } from "i18next-vue";
import { i18n } from "i18next";

// we do not use a store for this since we want the client to load the same libs that the server did
// when using a store, the state is synced between server and client and then client thinks the libs are already loaded
// this is therefore a local representation
const ns = new Map<string, Set<string>>();

/**
 * Downloads a translation namespace and returns the translation function.
 * When language is changed, the namespace will be reloaded automatically.
 * @param namespace The translation namespace to load
 *
 * @returns The translation function and the i18 instance.
 */
export default async function loadTranslations(namespace: string | undefined) {
  const { t, i18next } = useT();
  if (namespace) {
    const load = (lng: string) => loadNamespace(lng, namespace, i18next);

    const lang = i18next.language;
    if (!ns.has(namespace)) ns.set(namespace, new Set());

    i18next.on("languageChanged", load);
    onBeforeUnmount(() => {
      // console.log("Stopping listening to languageChanged for namespace: ", namespace)
      i18next.off("languageChanged", load);
    });
    await load(lang);
  }
  return { t, i18: i18next };
}

async function loadNamespace(lang: string, namespace: string, i18next: i18n) {
  // console.log(ns)
  if (ns.get(namespace)?.has(lang)) return;
  i18next.addResourceBundle(
    lang,
    namespace,
    await import(`~/localization/${lang}/${namespace}.json`),
  );
  ns.get(namespace)?.add(lang);
  // console.log(`Translation [${namespace}/${lang}] loaded`)
}
