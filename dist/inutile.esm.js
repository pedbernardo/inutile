/**
 * Verifica se é um objeto Date
 *
 * @param {Date} date - objeto Date
 * @returns {boolean} se é um objeto date
 */
function isDate (date) {
  return date instanceof Date && !isNaN(date)
}

/**
 * Verifica se é um string de data no formato DD/MM/AAAA
 *
 * @param {string} stringDate - data no formato DD/MM/AAAA
 * @returns {boolean} se é uma data válida
 */
function isDateString (stringDate) {
  return isDate(parseDate(stringDate))
}

/**
 * Transforma uma data no formato DD/MM/AAAA em um objeto Date
 *
 * @param {string} stringDate - data no formato DD/MM/AAAA
 * @return {Date} Date Object
 */
function parseDate (stringDate) {
  const [dd, mm, yyyy] = stringDate.split('/');
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
function formatDate (date, config = {}) {
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
function getMonthNameByNumber (monthNumber, config = {
  month: 'long',
  capitalize: true
}) {
  const date = new Date();
  const currentMonth = parseInt(monthNumber);

  date.setMonth(currentMonth);

  const month = date.toLocaleString('pt-BR', { month: config.month });

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
function addMonths (date, quantity) {
  const newDate = new Date(date);
  newDate.setMonth(date.getMonth() + quantity);

  return newDate
}

/**
 * Converte as respostas afirmativas `Sim` e `Não`
 * em seus equivalentes boleanos
 *
 * @param {string} text - afirmativa
 * @returns {boolean} representação boleana
 */
function affirmativeToBoolean (text) {
  const answer = text
    .toLowerCase()
    .replace('ã', 'a');

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
function capitalize (text) {
  return text
    .toLowerCase()
    .split(' ')
    .map(word => {
      if (word.length === 1) return word
      return word.charAt(0).toUpperCase() + word.slice(1)
    }).join(' ')
}

const CURRENCY_FORMATTER = new Intl.NumberFormat('pt-BR', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
});

/**
 * Adiciona `0` em números menores que 10, mantendo
 * sempre 2 dígitos
 *
 * @param {number|string} number - número para verificar a adição de dígitos
 * @returns {string} número com 2 dígitos
 */
function padTwoDigits (number) {
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
function isCurrency (value) {
  if (typeof value !== 'string') return false

  const [integer, fractional] = (value).split(',');

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
function currencyToNumber (currencyValue) {
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
function numberToCurrency (
  number,
  formatter = CURRENCY_FORMATTER
) {
  return formatter.format(number)
}

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
function isTime (time) {
  const [HH, MM] = time.split(':');

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
function isDuration (duration) {
  const MM = duration.split(':')[1];

  return MM?.length === 2 && parseInt(MM) <= 59
}

/**
 * Transforma uma string de duração [H]:MM na sua
 * representação decimal
 *
 * @param {string} duration - duração no formato [H]:MM
 * @returns {number} duração em formato decimal
 */
function durationToDecimal (duration) {
  if (!isDuration(duration)) return

  const [HH, MM] = duration.split(':');

  return parseInt(HH) + parseInt(MM) / 60
}

/**
 * Obtém um objeto Date nativo a partir de um horário
 * no formato HH:MM
 *
 * @param {string} time - horário no formato HH:MM
 * @returns {Date} horário no formato Date
 */
function dateFromTime (time) {
  if (!isTime(time)) return

  const [HH, MM] = time.split(':');

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
function differenceInMs (startDate, endDate) {
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
function msToDuration (duration) {
  const hours = Math.floor((duration / (1000 * 60 * 60)));
  const minutes = Math.floor((duration / (1000 * 60)) % 60);
  const seconds = Math.floor((duration / 1000) % 60);
  const milliseconds = parseInt((duration % 1000) / 100);

  return {
    mask: `${padTwoDigits(hours)}:${padTwoDigits(minutes)}`,
    hours,
    minutes,
    seconds,
    milliseconds
  }
}

export { addMonths, affirmativeToBoolean, capitalize, currencyToNumber, dateFromTime, differenceInMs, durationToDecimal, formatDate, getMonthNameByNumber, isCurrency, isDate, isDateString, isDuration, isTime, msToDuration, numberToCurrency, padTwoDigits, parseDate };
