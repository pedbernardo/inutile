const CURRENCY_FORMATTER = new Intl.NumberFormat('pt-BR', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
})

/**
 * Adiciona `0` em números menores que 10, mantendo
 * sempre 2 dígitos
 *
 * @param {number|string} number - número para verificar a adição de dígitos
 * @returns {string} número com 2 dígitos
 */
export function padTwoDigits (number) {
  return (number).toString().padStart(2, '0')
}

/**
 * Verifica se o valor está no formato monetário pt-BR,
 * devendo conter as casas fracionais com 2 dígitos
 *
 * @example
 * isCurrency('1.000,30')  => true
 * isCurrency('1.000,999') => false
 * isCurrency('1.000')     => false
 *
 * @param {string|number} value - valor monetário
 * @returns {boolean} se o valor respeita o formato monetário
 */
export function isCurrency (value) {
  if (typeof value !== 'string') return false

  const [integer, fractional] = (value).split(',')

  return !isNaN(parseInt(integer)) && (fractional || '').length === 2
}

/**
 * Transforma uma string monetária em número.
 * Quando informado strings vazias o valor 0 é retornado
 *
 * @example '1.000,50' => 1000.5
 *
 * @param {string} currencyValue - valor monetário pt-BR
 * @returns {number} valor monetário em formato numérico
 */
export function currencyToNumber (currencyValue) {
  return parseFloat(
    currencyValue
      .replace(/\./g, '')
      .replace(',', '.') || 0
  )
}

/**
 * Transforma um número em valor monetário pt-BR
 *
 * @param {number} number - valor numérico
 * @param {NumberFormat} formatter - padrão formatador
 * @returns {string} valor monetário
 */
export function numberToCurrency (
  number,
  formatter = CURRENCY_FORMATTER
) {
  return formatter.format(number)
}
