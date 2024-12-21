const formElement = document.querySelector("form") as HTMLFormElement;
const formSubmitBtn = document.querySelector("button") as HTMLButtonElement;
const allInputs = document.querySelectorAll<HTMLInputElement>("input");
const [firstName, email, password, repPassword, male, female] = allInputs;

type Objs = {
  [key: string]: {
    [key: string]: string | number | boolean | HTMLInputElement | object;
    element: HTMLInputElement;
    value: string;
    id: string;
    validate: { [key: string]: boolean };
  };
};

function getArrts(inputProps: HTMLInputElement[]): object {
  const obj: Objs = {};

  inputProps.forEach((item) => {
    const id: string = item.id;
    const getAttr = item.attributes;
    const setAttr: {
      [key: string]: string | number | boolean | object;
      id: string;
      validate: { [key: string]: boolean };
    } = {
      id: "",
      validate: {},
    };

    for (const key of getAttr) {
      if (
        key.name === "minlength" ||
        key.name === "maxlength" ||
        key.name === "required"
      ) {
        setAttr[key.name] = +key.value || key.value;
        setAttr.validate = { ...setAttr.validate, [key.name]: false };
        setAttr.id = id;
      }
    }

    obj[id] = {
      ...setAttr,
      value: item.value,
      element: item,
      validate: { ...setAttr.validate },
    };
  });

  return obj;
}

formElement.addEventListener("submit", (event) => {
  event.preventDefault();
});

formSubmitBtn.addEventListener("mouseup", (event) => {
  event.preventDefault();

  const data: Objs = { ...getArrts([firstName, email, password, repPassword]) };
  for (const key in data) {
    if (
      data[key]["minlength"] &&
      +data[key].value.length >= +data[key]["minlength"]
    ) {
      data[key].validate.minlength = true;
    }
    if (data[key]["required"] !== undefined && data[key].value !== "") {
      data[key].validate.required = true;
    }
  }

  const valdates = Object.values(data);
  const errors: object[] = valdates.map((item) => {
    const list: object[] = [];
    const validateKeys: string[] = Object.keys(item.validate);
    const id: string = item.id;
    const attrs: NamedNodeMap = item.element.attributes;
    for (let key of validateKeys) {
      if (!item.validate[key]) {
        const errorMassage: string | null = item.element.getAttribute(
          `data-${key}error`
        );
        console.log(typeof errorMassage);
        list.push({ value: `data-${key}error`, message: errorMassage });
        // list.push(`data-${key}error`);
      }
    }
    return { [id]: {...list} };
  });

  console.log(errors);
});
