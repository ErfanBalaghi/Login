const formElement = document.querySelector("form") as HTMLFormElement;
const allInputs = Array.from(formElement.elements) as HTMLInputElement[];
const [firstName, email, password, repPassword] = allInputs;

const formSubmitBtn = document.querySelector("button") as HTMLButtonElement;

interface objectStructor {
  [key: string]: object;
}

formElement.addEventListener("submit", (event) => {
  event.preventDefault();
});

function getAttrs(
  elements = [firstName, email, password, repPassword]
): objectStructor {
  const getAttrs: {
    [key: string]: object;
  } = {};
  for (const key of elements) {
    const attrKeys: {
      [key: string]: object;
    } = {};
    if ("required" in key.attributes) {
      attrKeys.required = {
        value: true,
        errorMessage: key.getAttribute("data-requirederror"),
      };
    }
    if ("minlength" in key.attributes) {
      const getminlength = key.getAttribute("minlength");
      attrKeys.minlength = {
        value: typeof getminlength === "string" ? +getminlength : 0,
        errorMessage: key.getAttribute("data-minlengtherror"),
      };
    }
    if ("maxlength" in key.attributes) {
      const getmaxlength = key.getAttribute("maxlength");
      attrKeys.maxlength = {
        value: typeof getmaxlength === "string" ? +getmaxlength : 0,
        errorMessage: key.getAttribute("data-maxlengtherror"),
      };
    }
    getAttrs[key.id] = attrKeys;
  }
  return getAttrs;
}

function checkFileds(
  attrFields: objectStructor,
  elements = [firstName, email, password, repPassword]
) {
  const getErrors: objectStructor = {};

  elements.forEach((item, index) => {
    const objAttrs: objectStructor = { ...attrFields[item.id] };
    for (const key in objAttrs) {
      const itemAttr = objAttrs[key];
      // console.log(key);
      if (
        key === "required" &&
        "value" in itemAttr &&
        typeof itemAttr.value === "boolean"
      ) {
        const result = checkRequired({
          typeValue: itemAttr.value,
          type: key,
          inputValue: item.value,
        });
      }

      if (
        (key === "minlength" || key === "maxlength") &&
        "value" in itemAttr &&
        typeof itemAttr.value === "number"
      ) {
        const result = checkLength({
          typeValue: itemAttr.value,
          type: key,
          inputValue: item.value,
        });
      }
    }
    getErrors[item.id] = {};
  });
}

function checkLength(data: {
  typeValue: number;
  type: string;
  inputValue: string;
}) {
  if (data.type === "minlength" && +data.typeValue <= data.inputValue.length) {
    return true;
  } else if (
    data.type === "maxlength" &&
    +data.typeValue >= data.inputValue.length
  ) {
    return true;
  } else {
    return false;
  }
}

function checkRequired(data: {
  typeValue: boolean;
  type: string;
  inputValue: string;
}) {
  if (data.typeValue && data.inputValue) {
    return true;
  } else {
    return false;
  }
}

formSubmitBtn.addEventListener("mouseup", (event) => {
  event.preventDefault();
  const attrValues: objectStructor = getAttrs();
  checkFileds(attrValues);
  // console.log(attrValues);
});
