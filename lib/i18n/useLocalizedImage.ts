import { useLanguage } from "./LanguageContext";
import { resolveLocalizedImage, type ImageSlot } from "./images";

export function useLocalizedImage(slot: ImageSlot): string {
  const { lang } = useLanguage();
  return resolveLocalizedImage(slot, lang);
}
