export const func = (arr) => {
  const newArr = [];

  arr.forEach((element) => {
    let newElement;
    if (typeof element.value === 'object') {
      newElement = element;
    } else {
      newElement = { ...element, value: [element.value] };
    }
    if (newArr.length === 0) {
      newArr.push(newElement);
    } else {
      const index = newArr.findIndex((e) => e.title === element.title);
      if (index !== -1) {
        return (newArr[index].value = newArr[index].value.concat(
          newElement.value,
        ));
      } else {
        newArr.push(newElement);
      }
    }
  });
  return newArr.flat().map((el) => {
    return {
      ...el,
      totalAnswers: el.value.length,
      value: el.value.reduce((acc, el) => {
        acc[el] = (acc[el] || 0) + 1;
        return acc;
      }, {}),
    };
  });
};
