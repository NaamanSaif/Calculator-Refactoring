export const add = (a, b) => {
    if(a===null || b===null) return "Error";
    return a + b;
}
export const subtract = (a, b) => {
  if(a===null || b===null) return "Error";
  return a - b;
}
export const multiply = (a, b) => a * b;
export const divide = (a, b) => (b === 0 ? "Error" : a / b);

export const calculate = (expression) => {
  try {
    const operators = ["+", "-", "x", "/"];
    const tokens = expression.split(/([+\-x/])/); // Split by operators, keeping them in the result
    const numbers = tokens
      .filter((token) => !operators.includes(token))
      .map(Number);
    const ops = tokens.filter((token) => operators.includes(token));

    let result = numbers[0];
    for (let i = 0; i < ops.length; i++) {
      const operator = ops[i];
      const nextNumber = numbers[i + 1];

      switch (operator) {
        case "+":
          result = add(result, nextNumber);
          break;
        case "-":
          result = subtract(result, nextNumber);
          break;
        case "x":
          result = multiply(result, nextNumber);
          break;
        case "/":
          result = divide(result, nextNumber);
          if (result === "Error") {
            return "Error";
          }
          break;
        default:
          return "Error";
      }
    }

    return result.toString();
  } catch (error) {
    return "Error";
  }
};
