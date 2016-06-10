import { emailRegex } from './regex';

const isEmpty = value => value === undefined || value === null || value === '';
const join = (rules) => (value, data) => rules.map(rule => rule(value, data)).filter(error => !!error)[0 /* first error */ ];

// Some utils validation rules...

export function email(value) {
  if (!isEmpty(value) && !emailRegex.test(value)) {
    return 'Inserisci un indirizzo email valido';
  }
}

export function required(value) {
  if (isEmpty(value)) {
    return 'Campo obbligatorio';
  }
}

export function minLength(min) {
  return value => {
    if (!isEmpty(value) && value.length < min) {
      return `Inserisci almeno ${min} caratteri`;
    }
  };
}

export function maxLength(max) {
  return value => {
    if (!isEmpty(value) && value.length > max) {
      return `Non inserire più di ${max} caratteri`;
    }
  };
}

// TODO: Implement it...
export function rangeLength(min, max) {
}

export function integer(value) {
  if (!Number.isInteger(Number(value))) {
    return 'Inserisci un intero';
  }
}

export function oneOf(enumeration) {
  return value => {
    if (!~enumeration.indexOf(value)) {
      return `Deve essere uno tra i seguenti valori: ${enumeration.join(', ')}`;
    }
  };
}

export function match(field) {
  return (value, data) => {
    if (data) {
      if (value !== data[field]) {
        return 'I valori non corrispondono';
      }
    }
  };
}

// Customize the error of rule
export function withMessage(rule, message) {
  return (value, data) => {
    const defaultMessage = rule(value, data);
    if (defaultMessage) {
      return message ? message : defaultMessage;
    }
  };
}

// Create validation function from given funct rules
export function createValidator(rules) {
  return (data = {}) => {
    const errors = {};
    Object.keys(rules).forEach((key) => {
      const rule = join([].concat(rules[key])); // concat enables both functions and arrays of functions
      const error = rule(data[key], data);
      if (error) {
        errors[key] = error;
      }
    });
    return errors;
  };
}
