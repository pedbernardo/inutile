/**
 * Retorna um array com os intervalos informados, sendo
 * somado ao valor de `step` a cada item
 *
 * @param {number} start - início do intervalo
 * @param {number} stop - final do intervalo
 * @param {number} step - valor adicionado a cada intervalo
 * @returns {number[]} array de intervalos
 */
export function range (start, stop, step = 1) {
  return Array.from(
    { length: (stop - start) / step + 1 },
    (_, i) => start + (i * step)
  )
}
