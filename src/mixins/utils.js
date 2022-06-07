import jwt_decode from 'jwt-decode';

import createStore from '@/store';

const shortMonths = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Set', 'Out', 'Nov', 'Dez'];

const cardFlags = {
  amex: /^3[47][0-9]{13}$/,
  elo: /^4011(78|79)|^43(1274|8935)|^45(1416|7393|763(1|2))|^50(4175|6699|67[0-6][0-9]|677[0-8]|9[0-8][0-9]{2}|99[0-8][0-9]|999[0-9])|^627780|^63(6297|6368|6369)|^65(0(0(3([1-3]|[5-9])|4([0-9])|5[0-1])|4(0[5-9]|[1-3][0-9]|8[5-9]|9[0-9])|5([0-2][0-9]|3[0-8]|4[1-9]|[5-8][0-9]|9[0-8])|7(0[0-9]|1[0-8]|2[0-7])|9(0[1-9]|[1-6][0-9]|7[0-8]))|16(5[2-9]|[6-7][0-9])|50(0[0-9]|1[0-9]|2[1-9]|[3-4][0-9]|5[0-8]))/,
  hipercard: /^(606282\d{10}(\d{3})?)|(3841\d{15})$/,
  mastercard: /^(5[1-5]\d{4}|677189)\d{10}$/,
  visa: /^4\d{12}(\d{3})?$/,
  'dinners-club': /^3(0[0-5]|[68]\d)\d{11}$/,
  aura: /^((?!504175))^((?!5067))(^50[0-9])/,
  jcb: /^(?:2131|1800|35\d{3})\d{11}$/,
  discover: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
  cabal: /(60420[1-9]|6042[1-9][0-9]|6043[0-9]{2}|604400)/,
  sorocred: /^627892|^636414/,
  banescard: /^636117/,
};

export const utils = {
  methods: {
    getCookie(name) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2)
        return parts
          .pop()
          .split(';')
          .shift();
    },
    setCookie(name, value, expires, path, domain, secure) {
      let cookieText = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;
      if (expires instanceof Date) {
        cookieText += `; expires=${expires.toGMTString()}`;
      }

      if (path) cookieText += `; path=${path}`;
      if (domain) cookieText += `; domain=${domain}`;
      if (secure) cookieText += `; secure`;

      document.cookie = cookieText;
    },
    validateEmail(email) {
      return !/(\w+)(@{1})(\w+)(\.{1})(\w+)/.test(email);
    },
    numericOnly(input) {
      if (input === null) return null;
      let clearString = input.replace(/[^\d]/g, '');
      return clearString;
    },
    formatBirthDate(date) {
      return date.replace(/(\d{2})(\d{2})(\d{4})/, '$1/$2/$3');
    },
    numberFormat(numberData) {
      const countryNumber = {
        usa: numberData.phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/g, '$1 $2 $3'),
      };
      return countryNumber[numberData.country];
    },
    numberCellPhone(number) {
      const phone = this.numericOnly(number);
      return phone.replace(/(\d{2})(\d{5})(\d{4})/g, '($1) $2-$3');
    },
    checkIfValidPassword(password) {
      return password !== null && /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/.test(password);
    },
    checkIfHaveSameValue(valueOne, valueTwo) {
      return valueOne === valueTwo;
    },
    getInstante(date) {
      const dateToISO = new Date(date);
      return dateToISO.toISOString();
    },
    formatDate(data) {
      return data.replace(/(\d{4})-(\d{2})-(\d{2})/, '$3/$2/$1');
    },
    formatCEP(cep) {
      const formatedCep = cep !== null ? cep.replace(/(\d{5})(\d{3})/, '$1-$2') : cep;
      return formatedCep;
    },
    checkFullName(name) {
      return /(\w{2})+\s(\w{1})+/.test(name);
    },
    formatDateToInput(data) {
      const rmvInstant = this.formatInstant(data);
      return rmvInstant.replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$3-$2-$1');
    },
    formatInstant(data) {
      const dataInstant = new Date(data);
      return `${dataInstant.getDate() < 10 ? '0' + dataInstant.getDate() : dataInstant.getDate()}/${
        dataInstant.getMonth() + 1 < 10
          ? '0' + (dataInstant.getMonth() + 1)
          : dataInstant.getMonth() + 1
      }/${dataInstant.getFullYear()}`;
    },
    formatExtensiveDate(date) {
      const newDate = new Date(date);

      const day = newDate
        .getDate()
        .toString()
        .padStart(2, '0');

      return `${day} de ${shortMonths[newDate.getMonth()]}. de ${newDate.getFullYear()}`;
    },
    checkCardNumberisValidEven(cardNumber) {
      let cardsum = 0;
      for (let index = 0; index < cardNumber.split('').length - 1; index++) {
        if (index % 2 === 0) {
          let value = +cardNumber.split('')[index] * 2;
          value = value > 9 ? this.reducer(value) : value;
          cardsum += value;
        } else {
          cardsum += +cardNumber.split('')[index] * 1;
        }
      }
      let verifyNumber = 10 - (cardsum % 10);
      verifyNumber = verifyNumber === 10 ? 0 : verifyNumber;
      return +verifyNumber === +cardNumber.substr(cardNumber.length - 1, cardNumber.length);
    },
    checkCardNumberisValidOdd(cardNumber) {
      let cardsum = 0;
      for (let index = 0; index < cardNumber.split('').length - 1; index++) {
        if (index % 2 === 1) {
          let value = +cardNumber.split('')[index] * 2;
          value = value > 9 ? this.reducer(value) : value;
          cardsum += value;
        } else {
          cardsum += +cardNumber.split('')[index] * 1;
        }
      }
      let verifyNumber = 10 - (cardsum % 10);
      verifyNumber = verifyNumber === 10 ? 0 : verifyNumber;
      return +verifyNumber === +cardNumber.substr(cardNumber.length - 1, cardNumber.length);
    },
    reducer(value) {
      return value
        .toString()
        .split('')
        .map(Number)
        .reduce(function(a, b) {
          return a + b;
        }, 0);
    },
    numberAreDifferents(cpfCnpj) {
      const regex = new RegExp('^(' + cpfCnpj.split('')[0] + ')+$', 'g');
      return !regex.test(cpfCnpj);
    },
    getSecondCPFDigit(cpf) {
      let somaTotal = 0;
      for (let index = 1; index <= 10; index++) {
        somaTotal += +cpf.substring(index - 1, index) * (12 - index);
      }
      return (somaTotal * 10) % 11 >= 10 ? 0 : (somaTotal * 10) % 11;
    },
    getFirstCPFDigit(cpf) {
      let soma = 0;
      for (let index = 1; index <= 9; index++) {
        soma += +cpf.substring(index - 1, index) * (11 - index);
      }
      return (soma * 10) % 11 >= 10 ? 0 : (soma * 10) % 11;
    },
    checkIfCpfIsValid(cpf) {
      if (
        +cpf.substring(9, 10) === +this.getFirstCPFDigit(cpf) &&
        +cpf.substring(10, 11) === +this.getSecondCPFDigit(cpf) &&
        this.numberAreDifferents(cpf)
      ) {
        return true;
      }
      return false;
    },
    cpfFormater(number) {
      const value = number || '00000000000';
      return value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    },
    cnpjFormater(number) {
      const value = number || '00000000000000';
      return value.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
    },
    cardFormater(number) {
      return number.length === 16
        ? number.replace(/(\d{4})(\d{4})(\d{4})(\d{4})/, '$1 $2 $3 $4')
        : number.replace(/(\d{4})(\d{6})(\d{5})/, '$1 $2 $3');
    },
    checkCardFlag(cardNumber) {
      var cardFlag;
      switch (true) {
        case /^4/.test(cardNumber):
          cardFlag = 'Visa';
          break;
        case /^5/.test(cardNumber):
          cardFlag = 'Master Card';
          break;
        case /^300|301|305|36|38/.test(cardNumber):
          cardFlag = 'Dinners';
          break;
        case /^34|37/.test(cardNumber):
          cardFlag = 'Amex';
          break;
        case /^636368|636369|438935|451416|636297|5067|4576|4011|506699/.test(cardNumber):
          cardFlag = 'Elo';
          break;
        case /^6011|622|64|65/.test(cardNumber):
          cardFlag = 'Discover';
          break;
        case /^50/.test(cardNumber):
          cardFlag = 'Aura';
          break;
        case /^60/.test(cardNumber):
          cardFlag = 'Hipercard';
          break;
      }
    },
    formatDateCC(cardNumber) {
      return cardNumber.replace(/(\d{4})-(\d{2})/, '$2-$1');
    },
    shortenMiddleName(fullName) {
      const splitedName = fullName.trim().split(' ');
      let nameshortten = '';
      const prepositions = ['da', 'de', 'di', 'do', 'dos', 'das', 'DE'];
      for (let index = 0; index < splitedName.length; index++) {
        if (
          index > 0 &&
          index < splitedName.length - 1 &&
          !prepositions.includes(splitedName[index])
        ) {
          nameshortten += `${splitedName[index].charAt(0)} `;
        } else {
          nameshortten += `${splitedName[index]} `;
        }
      }
      return splitedName.length > 2 ? nameshortten.trim().toUpperCase() : fullName;
    },
    inputError(input) {
      const inputSelected = {
        name: 'Nome',
        firstname: 'Nome',
        lastname: 'Sobrenome',
        email: 'E-mail',
        confirm_email: 'Confirmação de e-mail',
        phone: 'Telefone',
        country: 'País',
        birthdate: 'Data de nascimento',
        password: 'Senha',
        confirm_password: 'Confirmação ',
        zipcode: 'CEP ',
        state: 'Estado ',
        street: 'Logradouro',
        number: 'Número da residência',
        city: 'Cidade ',
      };
      return inputSelected[input];
    },
    getobjectQueryParams(stringParam) {
      let qParams;
      if (stringParam.includes('/?')) {
        const params = stringParam.split('/?')[1];
        qParams = params
          .replace(/\=/g, '": "')
          .replace(/\&/g, '", "')
          .replace(/^/, '"')
          .replace(/$/, '"');
        return JSON.parse(`{${qParams}}`);
      }
      return {};
    },
    checkIfImageIsValid(file) {
      return (/\.jpeg$/.test(file.name) || /\.jpg$/.test(file.name)) && file.size < 4000000;
    },
    objectToArray(object) {
      return Object.keys(object).length;
    },
    getBrowser() {
      const nAgt = navigator.userAgent;
      let browserName, verOffset;
      if ((verOffset = nAgt.indexOf('Opera')) != -1) {
        browserName = 'Opera';
      } else if ((verOffset = nAgt.indexOf('MSIE')) != -1) {
        browserName = 'Microsoft Internet Explorer';
      } else if ((verOffset = nAgt.indexOf('Chrome')) != -1) {
        browserName = 'Chrome';
      } else if ((verOffset = nAgt.indexOf('Safari')) != -1) {
        browserName = 'Safari';
      } else if ((verOffset = nAgt.indexOf('Firefox')) != -1) {
        browserName = 'Firefox';
      }
      return browserName;
    },
    tokenIsInvalid() {
      // TODO: remove
      if (this.$store.state.token !== null) {
        const expirationDate = jwt_decode(this.$store.state.token).exp * 1000;
        return expirationDate < Date.now();
      }
      return false;
    },
    overwriteFindocsType(type = '') {
      return type.toLowerCase() === 'findocs' ? 'finseries' : type.toLowerCase();
    },
    getBannerType(banner) {
      if ('bannerType' in banner) {
        return banner.bannerType.split(':')[1] || 'finclass';
      }

      return 'finclass';
    },
    getBannerCourseId(banner) {
      return banner.bannerButtonPrimary.split(':')[0] || '';
    },
    getImageTypePath(type) {
      const pathBy = {
        finclass: 'finclassSingular.svg',
        finclasses: 'finclassUpdated.svg',
        finbooks: 'finbooksUpdated.svg',
        findocs: 'finseriesUpdated.svg', // TODO: update along with backend
        finseries: 'finseriesUpdated.svg',
        finsessions: 'finsessionsUpdated.svg',
      };

      if (Object.keys(pathBy).includes(type)) {
        // return require('@/assets/img/types/' + pathBy[type.toLowerCase()]);
        return ''
      }
      
      // return require('@/assets/img/types/' + pathBy['finclass']);
      return ''
    },
    buildCourseURL(courseGroup, courseID) {
      return courseGroup === 'FINCLASSES'
        ? `/expert-details/${courseID}`
        : `/chapter/${this.overwriteFindocsType(courseGroup)}/${courseID}`;
    },
    // @see https://stackoverflow.com/questions/11381673/detecting-a-mobile-browser
    isMobileDevice() {
      return window.matchMedia('(orientation: landscape)').matches
        ? window.matchMedia('(max-width: 845px)').matches &&
            window.matchMedia('(max-height: 390px)').matches
        : window.matchMedia('(max-width: 767px)').matches;
    },
    isTabletDevice() {
      return !this.isMobileDevice() && window.matchMedia('(max-width: 1439px)').matches;
    },
    isDesktopDevice() {
      return !this.isTabletDevice() && window.matchMedia('(min-width: 1440px)').matches;
    },
    isSafari() {
      return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    },
    isProductionEnvironment() {
      return process.env.VUE_APP_STAGE === 'app';
    },
    normalizeString(value) {
      return value.normalize('NFD').replace(/\p{Diacritic}/gu, '');
    },
    msToTime(s) {
      // Pad to 2 or 3 digits, default is 2
      function pad(n, z) {
        z = z || 2;
        return ('00' + n).slice(-z);
      }

      var ms = s % 1000;
      s = (s - ms) / 1000;
      var secs = s % 60;
      s = (s - secs) / 60;
      var mins = s % 60;
      var hrs = (s - mins) / 60;

      return pad(mins) + ':' + pad(secs);
    },
    togglePageScrollBehavior(block = true, element) {
      if (element) {
        if (block) {
          element.style.overflowY = 'hidden';
          element.style.height = '100vh';
        } else {
          element.style.overflowY = 'auto';
          element.style.height = 'auto';
        }
      } else {
        if (block) {
          document.body.style.overflowY = 'hidden';
          document.body.style.height = '100vh';
        } else {
          document.body.style.overflowY = 'auto';
          document.body.style.height = 'auto';
        }
      }
    },
    padTo2Digits(num) {
      return num.toString().padStart(2, '0');
    },
    getPublishedTime(item) {
      const today = new Date();
      const published = new Date(item?.createdAt * 1000);

      const diffTime = Math.abs(today - published);
      const diffMinutes = Math.floor(diffTime / (1000 * 60));
      const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays > 7) {
        return [
          this.padTo2Digits(published.getDate()),
          this.padTo2Digits(published.getMonth() + 1),
          published.getFullYear(),
        ].join('/');
      } else if (diffDays >= 1) {
        return `${diffDays} ${diffDays > 1 ? 'dias' : 'dia'} atrás`;
      } else if (diffHours >= 1) {
        return `${diffHours}${diffHours > 1 ? 'h' : ' hora'} atrás`;
      } else if (diffMinutes >= 1) {
        return `${diffMinutes}min atrás`;
      } else {
        return 'Neste momento';
      }
    },
    isValidPublishContent(str) {
      const textWithoutSpacesAndParentesis = str && str.replaceAll(')', '').replaceAll(' ', '');

      const urlRegex = /(?:((?:https?|ftp):\/\/)|ww)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?/;
      const emojisRegex = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;
      const emailRegex = /(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;
      const numbersRegex = /\d+/g;
      const phoneRegex = /(\(?\d{2}\)?\s)?(\d{4,5}\-\d{4})/g;
      const numbersFoundInText = textWithoutSpacesAndParentesis?.match(numbersRegex);

      const hasEmoji = str?.match(emojisRegex);
      const hasUrl = str?.toLowerCase().match(urlRegex);
      const hasPhone = numbersFoundInText?.some((el) => el.length > 7) || str.match(phoneRegex);
      const hasEmail = textWithoutSpacesAndParentesis?.match(emailRegex);

      return !hasEmoji && !hasUrl && !hasPhone && !hasEmail;
    },
    findRepeatedContent(arr, isComment, typedContent) {
      return arr?.find((el) => {
        const elBody = isComment ? el.commentBody : el.topicBody;
        const hasSameContent = elBody === typedContent.trim();
        const hours = 60 * 60 * 1000;
        const createdAtInMiliseconds = el.createdAt * 1000;
        const diffHoursFromNow = Math.floor(Math.abs(Date.now() - createdAtInMiliseconds) / hours);
        return hasSameContent && diffHoursFromNow < 6;
      });
    },
    getCardFlag(brand) {
      if (!brand) return null;

      try {
        // const icon = require('@/assets/img/card-flags/' + brand + '.svg');
        const icon = ''
        return icon ?? null;
      } catch (error) {
        return null;
      }
    },
    getCardFlagBy(cardNumber) {
      const _cardNumber = cardNumber.replace(/\D/g, '');
      for (const flag in cardFlags) {
        if (cardFlags[flag].test(_cardNumber)) {
          return flag;
        }
      }

      return '';
    },
    // Note: rawExpirationDate arrives like this -> 1123
    checkIfDateIsExpired(rawExpirationDate) {
      if (!rawExpirationDate || typeof rawExpirationDate !== 'string') return;
      if (rawExpirationDate.length !== 4) return;

      const today = new Date();

      const month = rawExpirationDate.toString().substring(0, 2);
      const year = rawExpirationDate.toString().substring(2);
      const expirationDate = new Date(`20${year}`, month - 1);

      return expirationDate < today;
    },
    getRemainingDaysFromTodayUntil(endDate) {
      if (!endDate) return;

      const ONE_DAY_IN_MILLISECONDS = 24 * 60 * 60 * 1000;
      const start = new Date(); // now
      const end = new Date(endDate); // subscriptionCycle end date

      // The result is a negative number (because these days are "missing")
      return Math.floor((start - end) / ONE_DAY_IN_MILLISECONDS);
    },
    getCurrentTime() {
      function padToTwoDigitsWithZero(value) {
        return value.padStart(2, 0);
      }

      const hours = new Date().getHours().toString();
      const minutes = new Date().getMinutes().toString();

      return `${padToTwoDigitsWithZero(hours)}:${padToTwoDigitsWithZero(minutes)}`;
    },
    getPercentage(portion, total) {
      if (!portion || !total) {
        return `0%`;
      }

      const percentage = ((portion / total) * 100).toFixed(2);
      return `${percentage}%`;
    },
    getPlanBaseCleanedTitle(planTitle) {
      // Note: planTitle arrive like: 'FINCLASS | 4X'
      try {
        return String(planTitle)?.split(' | ')[0];
      } catch (error) {
        return 'FINCLASS';
      }
    },
    getPlanBaseInstallments(planTitle) {
      // Note: planTitle arrive like: 'FINCLASS | 4X'
      try {
        return String(planTitle)
          ?.split(' | ')[1]
          ?.split('')[0];
      } catch (error) {
        return '';
      }
    },
    scrollToElm(elm = document.body) {
      const elmSpacing = 240;
      const elmTopWithSpacing = elm?.getBoundingClientRect().top - elmSpacing;
      window.scrollTo({ top: elmTopWithSpacing, behavior: 'instant' });
    },
    cantSignLifetimeOffers() {
      let state;

      if (this.$store) {
        state = this.$store.state;
      } else {
        state = createStore.state;
      }

      const hasSignatureExpiring =
        this.getRemainingDaysFromTodayUntil(state.currentSignature.cycleEndDate) > -30;
      const isRecurrent = state.currentSignature.isRecurrent;

      return hasSignatureExpiring && isRecurrent;
    },
  },
};
