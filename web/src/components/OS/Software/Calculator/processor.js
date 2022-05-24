const sign = [".", "+", "-", "*", "/"];

const calculation = (e) => {
  let data;
  // remove if sign in the end position
  if (sign.indexOf(e[e.length - 1]) !== -1) {
    data = e.splice(0, e.length - 1);
  } else {
    data = e;
  }
  return [eval(data.join('')).toString()];

}

export const processor = (data, num) => {
  switch (num) {
    case null: return data;
    case "equal":
      return calculation(data);
    case "del":
      const newData = data.splice(0, data.length - 1);
      return newData;
    case "c":
      return [];
    case ".":
    case "+":
    case "-":
    case "*":
    case "/":
      if (data.length === 0) {
        return ["0", num];
      } else if (sign.indexOf(data[data.length - 1]) === -1) {
        return [...data, num];
      } else {
        const newDisplay = data.splice(0, data.length - 1);
        return [...newDisplay, num]
      }
    default:
      return [...data, num];
  }

}
