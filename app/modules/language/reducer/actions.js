export const LANGUAGE_TOKENIZE = 'language/TOKENIZE'

export function tokenize(file) {
  return {
    type: LANGUAGE_TOKENIZE,
    payload: file
  }
}
