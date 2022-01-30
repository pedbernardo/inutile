import { range } from './array'

/**
 * Verifica se é um objeto Date
 *
 * @param {Date} date - objeto Date
 * @returns {boolean} se é um objeto date
 */
export function isDate (date) {
  return date instanceof Date && !isNaN(date)
}

/**
 * Verifica se é um string de data no formato DD/MM/AAAA
 *
 * @param {string} stringDate - data no formato DD/MM/AAAA
 * @returns {boolean} se é uma data válida
 */
export function isDateString (stringDate) {
  return isDate(parseDate(stringDate))
}

/**
 * Transforma uma data no formato DD/MM/AAAA em um objeto Date
 *
 * @param {string} stringDate - data no formato DD/MM/AAAA
 * @return {Date} Date Object
 */
export function parseDate (stringDate) {
  const [dd, mm, yyyy] = stringDate.split('/')
  return new Date(yyyy, mm - 1, dd)
}

/**
 * Formata um objeto Date com o método nativo `toLocaleDateString`
 * utilizando sempre a linguaguem `pt-BR`
 *
 * @param {Date} date - objeto Date
 * @param {object} config - objeto de configuração do método `toLocaleDateString`
 * @returns {string} data formatada
 */
export function formatDate (date, config = {}) {
  return date.toLocaleDateString('pt-BR', config)
}

/**
 * Retorna o nome do mês informado em inteiro (0-11) por extenso
 * utilizando sempre a linguaguem `pt-BR`
 *
 * @param {string|number} monthNumber - número do mês, iniciando em 0 (ex. 0 = Janeiro)
 * @param {string} config.month - parâmetro `month` do método `toLocaleString`
 * @param {boolean} config.capitalize - retorna o nome do mês capitalizado (ex. Janeiro ao invés de janeiro)
 * @return {string} nome do mês
 */
export function getMonthNameByNumber (monthNumber, config = {
  month: 'long',
  capitalize: true
}) {
  const date = new Date()
  const currentMonth = parseInt(monthNumber)

  date.setMonth(currentMonth, 1)

  const month = date.toLocaleString('pt-BR', { month: config.month })

  if (!config.capitalize) return month

  return month[0].toUpperCase() + month.slice(1)
}

/**
 * Adiciona meses a um objeto Date
 *
 * @param {Date} date - data para calcular
 * @param {number} quantity - meses para somar, aceita valores negativos
 * @return {Date} data calculada
 */
export function addMonths (date, quantity) {
  const newDate = new Date(date)
  newDate.setMonth(date.getMonth() + quantity)

  return newDate
}

/**
 * Adiciona anos a um objeto Date
 *
 * @param {Date} date - data para calcular
 * @param {number} quantity - meses para somar, aceita valores negativos
 * @return {Date} data calculada
 */
export function addYears (date, quantity) {
  const newDate = new Date(date)
  newDate.setFullYear(date.getFullYear() + quantity)

  return newDate
}

/**
 * Retorna a data no primeiro dia do mês
 *
 * @param {Date} date data de referência
 * @returns {Date} data no primeiro dia do mês
 */
export function getFirstDateOfMonth (date) {
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    1
  )
}

/**
 * Retorna a data no último dia do mês
 *
 * @param {Date} date data de referência
 * @returns {Date} data no último dia do mês
 */
export function getLastDateOfMonth (date) {
  return new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  )
}

/**
 * Retorna um array ou objeto de datas de acordo com o intervalo informado
 *
 * @param {Date} start - data de início do intervalo
 * @param {Date} end - data de término do intervalo
 * @param {boolean} options.details - se o resultado deve trazer detalhes da data
 * @returns {Date[]|Object[]} - array com o intervalo de datas
 */
export function dateRange (start, end, options = { details: false }) {
  const startMonth = start.getMonth()
  const startYear = start.getFullYear()
  const endMonth = end.getMonth()
  const endYear = end.getFullYear()
  const yearsInterval = range(startYear, endYear)

  return yearsInterval
    .map((year, i) => {
      const startAt = i === 0 ? startMonth : 0
      const endAt = i === yearsInterval.length - 1 ? endMonth : 11

      return range(startAt, endAt)
        .map(monthNumber => {
          const date = new Date(year, monthNumber, 1)

          if (!options.details) return date

          return {
            date,
            year,
            month: monthNumber,
            monthName: getMonthNameByNumber(monthNumber)
          }
        })
    })
    .flat()
}
