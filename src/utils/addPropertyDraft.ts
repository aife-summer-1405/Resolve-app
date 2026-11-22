import { del } from "idb-keyval";

const DRAFT_KEY = "add-property:draft";
const IMAGES_KEY = "add-property:images";

export const resetAddPropertyDraft = async () => {
  localStorage.removeItem(DRAFT_KEY);
  await del(IMAGES_KEY);
};