import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import sv from "javascript-time-ago/locale/sv";

let timeAgo: TimeAgo | null = null;

export default function useTimeAgo() {
  if(timeAgo) return timeAgo;
  const { i18 } = useTranslate();
  TimeAgo.addLocale(sv);
  TimeAgo.addLocale(en);
  timeAgo = new TimeAgo(i18.language);
  return timeAgo;
}
