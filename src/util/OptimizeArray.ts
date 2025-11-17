export const OptimizeArray = (optionsArray: Array<string>) => {
  const newArray = optionsArray.map((op, index) => {
    return {
      key: index + 1,
      label: op,
      value: op,
    };
  });
  return newArray;
};

export const OptimizeMSArray = (optionsArray: Array<string>) => {
  const newArray = optionsArray.map((op, index) => {
    return {
      key: index + 1,
      name: op,
      value: op,
    };
  });
  return newArray;
};

export const OptimizeArrayForMultiSelect = (optionsArray: Array<string>) => {
  const newArray = optionsArray.map((op, index) => {
    return {
      key: index + 1,
      label: op,
      value: op,
    };
  });
  return newArray;
};
