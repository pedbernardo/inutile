import { padTwoDigits } from './number'

/**
 * Verifica se o horário informado respeita o formato
 * de HH:MM e possui intervalo válido (até 23h e até 59min)
 *
 * @example
 * isTime('23:59') => true
 * isTime('24:00') => false
 * isTime('23:60') => false
 *
 * @param {string} time - horário no formato HH:MM
 * @returns {boolean} se o horário é válido
 */
export function isTime (time) {
  const [HH, MM] = time.split(':')

  return !isNaN(
    Date.parse(`2000-01-01T${HH}:${MM}:00`)
  )
}

/**
 * Verifica se a duração informada respeita o formato
 * de [H]:MM
 *
 * @example
 * isDuration('120:59') => true
 * isDuration('100')    => false
 * isDuration('50:61')  => false
 *
 * @param {string} duration - duração no formato [H]:MM
 * @returns {boolean} se a duração é válida
 */
export function isDuration (duration) {
  const MM = duration.split(':')[1]

  return MM?.length === 2 && parseInt(MM) <= 59
}

/**
 * Transforma uma string de duração [H]:MM na sua
 * representação decimal
 *
 * @param {string} duration - duração no formato [H]:MM
 * @returns {number} duração em formato decimal
 */
export function durationToDecimal (duration) {
  if (!isDuration(duration)) return

  const [HH, MM] = duration.split(':')

  return parseInt(HH) + parseInt(MM) / 60
}

/**
 * Obtém um objeto Date nativo a partir de um horário
 * no formato HH:MM
 *
 * @param {string} time - horário no formato HH:MM
 * @returns {Date} horário no formato Date
 */
export function dateFromTime (time) {
  if (!isTime(time)) return

  const [HH, MM] = time.split(':')

  // a data em si é indiferente, apenas
  // utilizada para obter um objeto Date
  return new Date(`2000-01-01T${HH}:${MM}:00`)
}

/**
 * Calcula a diferença em milissegundos entre duas datas
 *
 * @param {Date} startDate - data de início
 * @param {Date} endDate - data de término
 * @returns {number} diferença em milissegundos
 */
export function differenceInMs (startDate, endDate) {
  return endDate.getTime() - startDate.getTime()
}

/**
 * Converte a duração em milissegundos para sua representação
 * em horas, minutos, segundos e milissegundos, informando
 * ainda a máscara em [H]:MM (desprezando os segundos)
 *
 * @param {number} duration - duração em milissegundos
 * @returns {object} detalhes da duração em [H]:MM:SS:SSSS
 */
export function msToDuration (duration) {
  const hours = Math.floor((duration / (1000 * 60 * 60)))
  const minutes = Math.floor((duration / (1000 * 60)) % 60)
  const seconds = Math.floor((duration / 1000) % 60)
  const milliseconds = parseInt((duration % 1000) / 100)

  return {
    mask: `${padTwoDigits(hours)}:${padTwoDigits(minutes)}`,
    hours,
    minutes,
    seconds,
    milliseconds
  }
}
