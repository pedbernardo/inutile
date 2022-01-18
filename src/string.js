/**
 * Converte as respostas afirmativas `Sim` e `Não`
 * em seus equivalentes boleanos
 *
 * @param {string} text - afirmativa
 * @returns {boolean} representação boleana
 */
export function affirmativeToBoolean (text) {
  const answer = text
    .toLowerCase()
    .replace('ã', 'a')

  if (answer === 'sim') return true
  if (answer === 'nao') return false

  return null
}

/**
 * Capitaliza uma string
 *
 * @example
 * capitalize('eu sou uma FRASE rs') => 'Eu Sou Uma Frase Rs'
 * @param {string} text
 * @returns {string} texto capitalizado
 */
export function capitalize (text) {
  return text
    .toLowerCase()
    .split(' ')
    .map(word => {
      if (word.length === 1) return word
      return word.charAt(0).toUpperCase() + word.slice(1)
    }).join(' ')
}
