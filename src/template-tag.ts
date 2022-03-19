/**
 *
 * @param {TemplateStringsArray} template
 * @returns {string}
 *
 * @description This function is helper function for tailwind intellisense. It does not support about any arguments passed into it.
 */
export const tw = (template: TemplateStringsArray | string): string =>
  typeof template === "string" ? template : template[0];
