const formElement = document.querySelector("form") as HTMLFormElement;
const formSubmitBtn = document.querySelector("button") as HTMLButtonElement;
const [firstName, email, password, repPassword]: HTMLFormControlsCollection =
  formElement.elements;

formElement.addEventListener("submit", (event) => {
  event.preventDefault();
});

function getAttrs(
  elements = [firstName, email, password, repPassword]
): object {
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
  attrFields: object,
  elements = [firstName, email, password, repPassword]
) {
  for (const key of elements) {
    console.log(key);
  }
}

formSubmitBtn.addEventListener("mouseup", (event) => {
  event.preventDefault();
  const attrValues: object = getAttrs();
  checkFileds(attrValues);
  // console.log(attrValues);
});
