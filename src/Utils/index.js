export default class Utils {
  static validateEmail(email) {
    return !/(\w+)(@{1})(\w+)(\.{1})(\w+)/.test(email);
  }

  static numericOnly(input) {
    const clearString = input.replace(/[^\d]/g, '');
    return clearString;
  }

  static formatBirthDate(date) {
    return date.replace(/(\d{2})(\d{2})(\d{4})/, '$1/$2/$3');
  }

  static numberFormat(numberData) {
    const countryNumber = {
      usa: numberData.phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/g, '$1 $2 $3'),
    };
    return countryNumber[numberData.country];
  }

  static checkIfValidPassword(password) {
    return password !== null && /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/.test(password);
  }

  static checkIfHaveSameValue(valueOne, valueTwo) {
    return valueOne === valueTwo;
  }

  static getInstante(date) {
    const dateToISO = new Date(date);
    return dateToISO.toISOString();
  }

  static formatDate(data) {
    return data.replace(/(\d{4})-(\d{2})-(\d{2})/, '$3/$2/$1');
  }

  static formatCEP(cep) {
    const formatedCep = cep !== null ? cep.replace(/(\d{5})(\d{3})/, '$1-$2') : cep;
    return formatedCep;
  }

  static checkFullName(name) {
    return /(\w{2})+\s(\w{1})+/.test(name);
  }

  static formatDateToInput(data) {
    const rmvInstant = this.formatInstant(data);
    return rmvInstant.replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$3-$2-$1');
  }

  static formatInstant(data) {
    const dataInstant = new Date(data);
    return `${dataInstant.getDate() < 10 ? '0' + dataInstant.getDate() : dataInstant.getDate()}/${
      dataInstant.getMonth() + 1 < 10
        ? '0' + (dataInstant.getMonth() + 1)
        : dataInstant.getMonth() + 1
    }/${dataInstant.getFullYear()}`;
  }

  static checkCardNumberisValidEven(cardNumber) {
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
  }

  static checkCardNumberisValidOdd(cardNumber) {
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
  }

  static reducer(value) {
    return value
      .toString()
      .split('')
      .map(Number)
      .reduce(function(a, b) {
        return a + b;
      }, 0);
  }

  static numberAreDifferents(cpfCnpj) {
    const regex = new RegExp('^(' + cpfCnpj.split('')[0] + ')+$', 'g');
    return !regex.test(cpfCnpj);
  }

  static getSecondCPFDigit(cpf) {
    let somaTotal = 0;
    for (let index = 1; index <= 10; index++) {
      somaTotal += +cpf.substring(index - 1, index) * (12 - index);
    }
    return (somaTotal * 10) % 11 >= 10 ? 0 : (somaTotal * 10) % 11;
  }

  static getFirstCPFDigit(cpf) {
    let soma = 0;
    for (let index = 1; index <= 9; index++) {
      soma += +cpf.substring(index - 1, index) * (11 - index);
    }
    return (soma * 10) % 11 >= 10 ? 0 : (soma * 10) % 11;
  }

  static checkIfCpfIsValid(cpf) {
    if (
      +cpf.substring(9, 10) === +this.getFirstCPFDigit(cpf) &&
      +cpf.substring(10, 11) === +this.getSecondCPFDigit(cpf) &&
      this.numberAreDifferents(cpf)
    ) {
      return true;
    }
    return false;
  }

  static cpfFormater(number) {
    return number.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }

  static cardFormater(number) {
    return number.length === 16
      ? number.replace(/(\d{4})(\d{4})(\d{4})(\d{4})/, '$1 $2 $3 $4')
      : number.replace(/(\d{4})(\d{6})(\d{5})/, '$1 $2 $3');
  }

  static checkCardFlag(cardNumber) {
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
  }

  static formatDateCC(cardNumber) {
    return cardNumber.replace(/(\d{4})-(\d{2})/, '$2-$1');
  }

  static shortenMiddleName(fullName) {
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
  }

  static inputError(input) {
    const inputSelected = {
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
      plain: 'Logradouro',
      number: 'Número da residência',
      city: 'Cidade ',
    };
    return inputSelected[input];
  }

  static checkInputEmpty(input) {
    return input === '' || input === undefined || input === null;
  }

  static checkvalidEmail() {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.errorMessage = Utils.validateEmail(this.userData.email)
        ? null
        : 'Insira um e-mail: válido.';
    }, 700);
  }
}
