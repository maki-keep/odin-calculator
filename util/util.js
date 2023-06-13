// a and b strings
// float result

export const sum = function(a, b) {
  return parseFloat(a) + parseFloat(b);
};

export const difference = function(a, b) {
  return parseFloat(a) - parseFloat(b);
};

export const product = function(a, b) {
  return parseFloat(a) * parseFloat(b);
};

export const fraction = function(a, b) {
  if (parseInt(b, 10) === 0) {
    return "MATH ERROR";
  }
  return parseFloat(a) / parseFloat(b);
};
