// "Plant Tag" -> "plant-tag". Used for the /works/:slug URLs.
export const slugify = (text) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
