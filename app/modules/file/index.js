const kTypeTemplate = {

}

/**
 *
 * @param template
 * @param {string[]} types
 */
export function registerTemplateForTypes(template, types) {
  types.forEach(looper => kTypeTemplate[looper] = template)
}
