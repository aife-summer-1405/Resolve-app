export const STEP_SLUGS = [
  "first-info",
  "address",
  "facilities",
  "images",
  "final-approval",
];

export const stepHref = (index: number) =>
  `/dashboard/properties/add/info/${STEP_SLUGS[index]}?view=seller`;