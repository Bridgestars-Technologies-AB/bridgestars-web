import {useTranslation} from 'i18next-vue';

export default function useTranslate() {
  const {t, i18next} = useTranslation();
  return {t, i18:i18next}
}
