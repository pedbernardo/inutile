(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Inutile = {}));
})(this, (function (exports) { 'use strict';

  /**
   * Retorna um array com os intervalos informados, sendo
   * somado ao valor de `step` a cada item
   *
   * @param {number} start - início do intervalo
   * @param {number} stop - final do intervalo
   * @param {number} step - valor adicionado a cada intervalo
   * @returns {number[]} array de intervalos
   */
  function range (start, stop, step = 1) {
    return Array.from(
      { length: (stop - start) / step + 1 },
      (_, i) => start + (i * step)
    )
  }

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

    date.setMonth(currentMonth, 1);

    const month = date.toLocaleString('pt-BR', { month: config.month });

    if (!config.capitalize) return month

    return month[0].toUpperCase() + month.slice(1)
  }

  /**
   * Adiciona dias a um objeto Date
   *
   * @param {Date} date - data para calcular
   * @param {number} quantity - dias para somar, aceita valores negativos
   * @return {Date} data calculada
   */
  function addDays (date, quantity) {
    const newDate = new Date(date);
    newDate.setDate(date.getDate() + quantity);

    return newDate
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
   * Adiciona anos a um objeto Date
   *
   * @param {Date} date - data para calcular
   * @param {number} quantity - meses para somar, aceita valores negativos
   * @return {Date} data calculada
   */
  function addYears (date, quantity) {
    const newDate = new Date(date);
    newDate.setFullYear(date.getFullYear() + quantity);

    return newDate
  }

  /**
   * Retorna a data no primeiro dia do mês
   *
   * @param {Date} date data de referência
   * @returns {Date} data no primeiro dia do mês
   */
  function getFirstDateOfMonth (date) {
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
  function getLastDateOfMonth (date) {
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
  function dateRange (start, end, options = { details: false }) {
    const startMonth = start.getMonth();
    const startYear = start.getFullYear();
    const endMonth = end.getMonth();
    const endYear = end.getFullYear();
    const yearsInterval = range(startYear, endYear);

    return yearsInterval
      .map((year, i) => {
        const startAt = i === 0 ? startMonth : 0;
        const endAt = i === yearsInterval.length - 1 ? endMonth : 11;

        return range(startAt, endAt)
          .map(monthNumber => {
            const date = new Date(year, monthNumber, 1);

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

  exports.addDays = addDays;
  exports.addMonths = addMonths;
  exports.addYears = addYears;
  exports.affirmativeToBoolean = affirmativeToBoolean;
  exports.capitalize = capitalize;
  exports.currencyToNumber = currencyToNumber;
  exports.dateFromTime = dateFromTime;
  exports.dateRange = dateRange;
  exports.differenceInMs = differenceInMs;
  exports.durationToDecimal = durationToDecimal;
  exports.formatDate = formatDate;
  exports.getFirstDateOfMonth = getFirstDateOfMonth;
  exports.getLastDateOfMonth = getLastDateOfMonth;
  exports.getMonthNameByNumber = getMonthNameByNumber;
  exports.isCurrency = isCurrency;
  exports.isDate = isDate;
  exports.isDateString = isDateString;
  exports.isDuration = isDuration;
  exports.isTime = isTime;
  exports.msToDuration = msToDuration;
  exports.numberToCurrency = numberToCurrency;
  exports.padTwoDigits = padTwoDigits;
  exports.parseDate = parseDate;
  exports.range = range;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
