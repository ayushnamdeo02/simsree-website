// Builds a section title from the CMS's split fields (title / highlight / suffix).
// Editors sometimes type the whole sentence into the title field and fill the
// highlight too, so only add the parts the title doesn't already contain.
export function composeTitle(text = '', highlight, suffix) {
  let out = text.trim();
  if (highlight && !out.includes(highlight)) out = `${out} ${highlight}`.trim();
  if (suffix && !out.includes(suffix)) out = `${out} ${suffix}`.trim();
  return out;
}

// Figma keeps some words together with non-breaking spaces ("the Director.",
// "something beyond"). The CMS copy has plain spaces, so re-apply them for the
// listed phrases to make lines wrap where the design does.
export function keepTogether(text = '', ...phrases) {
  return phrases.reduce((out, p) => out.replace(p, p.replace(/ /g, ' ')), text);
}
