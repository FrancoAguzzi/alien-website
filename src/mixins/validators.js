export const validators = {
  methods: {
    required(value) {
      return value === null || value === '' || value === undefined;
    },
    confirmValue(firstValue, valueToCompare) {
      return firstValue !== valueToCompare || this.required(valueToCompare);
    },
    email(value) {
      return (
        !/(^[^@][a-z0-9-_.]+)(@{1})([a-z0-9-_]+[^@])(\.{1})([a-z0-9]+[^@])/i.test(value) ||
        this.required(value)
      );
    },
    lessThanTwoWords(value) {
      return value.trim().split(' ').length < 2;
    },
  },
};
