const formElement = document.querySelector("form") as HTMLFormElement;
const allInputs = Array.from(formElement.elements) as HTMLInputElement[];
const [firstName, email, password, repPassword, male, female] = allInputs;

const formSubmitBtn = document.querySelector("button") as HTMLButtonElement;

interface objectStructor {
  [key: string]: { [key: string]: any };
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
      const result = checkRequired({
        typeValue: true,
        inputValue: key.value,
      });

      attrKeys.required = {
        valide: result,
        value: true,
        errorMessage: key.getAttribute("data-requirederror"),
      };
    }
    if ("minlength" in key.attributes) {
      const getminlength = key.getAttribute("minlength");
      const valueHandle = typeof getminlength === "string" ? +getminlength : 0;
      const result = checkLength({
        typeValue: valueHandle,
        type: "minlength",
        inputValue: key.value,
      });
      attrKeys.minlength = {
        valide: result,
        value: valueHandle,
        errorMessage: key.getAttribute("data-minlengtherror"),
      };
    }
    if ("pattern" in key.attributes) {
      const getminlength = key.getAttribute("pattern");
      const valueHandle = typeof getminlength === "string" ? getminlength : "";
      const result = checkPattern({
        typeValue: valueHandle,
        inputValue: key.value,
      });
      attrKeys.pattern = {
        valide: result,
        value: valueHandle,
        errorMessage: key.getAttribute("data-patternerror"),
      };
    }
    if ("maxlength" in key.attributes) {
      const getmaxlength = key.getAttribute("maxlength");
      const valueHandle = typeof getmaxlength === "string" ? +getmaxlength : 0;
      const result = checkLength({
        typeValue: valueHandle,
        type: "maxlength",
        inputValue: key.value,
      });
      attrKeys.maxlength = {
        valide: result,
        value: typeof getmaxlength === "string" ? +getmaxlength : 0,
        errorMessage: key.getAttribute("data-maxlengtherror"),
      };
    }
    getAttrs[key.id] = { ...attrKeys, element: key };
  }
  return getAttrs;
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

function checkRequired(data: { typeValue: boolean; inputValue: string }) {
  if (data.typeValue && data.inputValue) {
    return true;
  } else {
    return false;
  }
}

function checkPattern(data: { typeValue: string; inputValue: string }) {
  const regValue = new RegExp(data.typeValue);
  return regValue.test(data.inputValue);
}

function checkPasswords(): boolean {
  const validatePasswords: boolean = password.value === repPassword.value;
  const localErrorElement = document.getElementById(
    "localError"
  ) as HTMLParagraphElement;
  if (!validatePasswords) {
    localErrorElement.textContent = "Passwords Is Not Equal";
    return false;
  } else {
    localErrorElement.textContent = "";
  }
  return true;
}

function checkGenderHandler(): boolean {
  const resultElement = [male, female].find((item) => item.checked);
  const localErrorElement = document.getElementById(
    "genderError"
  ) as HTMLSpanElement;
  if (!resultElement) {
    localErrorElement.textContent = "Choose Your Gender";
    return false;
  } else {
    localErrorElement.textContent = "";
  }
  return true;
}

formSubmitBtn.addEventListener("mouseup", (event) => {
  event.preventDefault();
  const attrValues: objectStructor = getAttrs();
  let checkResultField: boolean = true;
  for (const key in attrValues) {
    attrValues[key].element.nextElementSibling.textContent = "";
    if ("required" in attrValues[key] && !attrValues[key].required.valide) {
      attrValues[key].element.nextElementSibling.textContent =
        attrValues[key].required.errorMessage;
      checkResultField = false;
    } else if (
      "minlength" in attrValues[key] &&
      !attrValues[key].minlength.valide
    ) {
      attrValues[key].element.nextElementSibling.textContent =
        attrValues[key].minlength.errorMessage;
      checkResultField = false;
    } else if (
      "maxlength" in attrValues[key] &&
      !attrValues[key].maxlength.valide
    ) {
      attrValues[key].element.nextElementSibling.textContent =
        attrValues[key].maxlength.errorMessage;
      checkResultField = false;
    } else if (
      "pattern" in attrValues[key] &&
      !attrValues[key].pattern.valide
    ) {
      attrValues[key].element.nextElementSibling.textContent =
        attrValues[key].pattern.errorMessage;
      checkResultField = false;
    }
  }

  let checkGender: boolean = checkGenderHandler();

  let checkPassword: boolean = checkPasswords();

  if (checkResultField && checkGender && checkPassword) {
    console.log("signup");
  }
});
