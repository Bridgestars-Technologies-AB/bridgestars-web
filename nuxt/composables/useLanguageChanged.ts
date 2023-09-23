/**
 * @description
 * Hook to listen to language changes
 *
 * @returns A function to unsubscribe from the event
 * **/
export default function onLanguageChanged(callback: (lang: string) => void) {
  const { i18 } = useTranslate();
  i18.on("languageChanged", callback);
  const unsubscribe = () => i18.off("languageChanged", callback);
  return unsubscribe;
}
