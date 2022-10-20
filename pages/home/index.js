const inputsColor = [...document.querySelectorAll("input[type=color]")];
const inputFontScale = document.querySelector("#fontScale");
const buttonCopy = document.querySelector(".button-copy-colors");
const buttonSaveStyles = document.querySelector(".button-save-colors");

const transformVariablesColors = (input) => {
  const variablesColors = `
        --color-${input.getAttribute("id")}: ${input.value};
    `;

  return variablesColors;
};

const transformVariablesFontsSize = (value, index) => {
  const variablesFontSizes = `
          --font-size-${index + 1}: ${value}rem;
      `;

  return variablesFontSizes;
};

let objectStyles = [];

const saveColorsStyles = (input) => {
  objectStyles.push(input.value);
  window.localStorage.setItem("stylesColors", JSON.stringify(objectStyles));
};

const saveFontSizesStyles = (value) => {
  window.localStorage.setItem("stylesFontSizes", JSON.stringify(value));
};

if (window.localStorage.getItem("stylesColors") !== null) {
  let stylesLocalStorage = JSON.parse(
    window.localStorage.getItem("stylesColors")
  );

  stylesLocalStorage.forEach((style, index) => {
    inputsColor[index].value = style;
  });

  inputFontScale.value = JSON.parse(
    window.localStorage.getItem("stylesFontSizes")
  );
}

const changeTextButton = (element, textMoment, textFixed, delay) => {
  element.textContent = textMoment;
  element.style.pointerEvents = "none";

  setTimeout(() => {
    element.textContent = textFixed;
    element.style.pointerEvents = "auto";
  }, delay);
};

buttonSaveStyles.addEventListener("click", (event) => {
  event.preventDefault();
  inputsColor.map((input) => {
    saveColorsStyles(input);
  });
  saveFontSizesStyles(inputFontScale.value);
  changeTextButton(buttonSaveStyles, "Saved!", "Save Styles", 3000);

  objectStyles = [];
});

buttonCopy.addEventListener("click", (event) => {
  let fontsSize = [];
  let variables = [];

  event.preventDefault();

  changeTextButton(buttonCopy, "Copied!", "Copy Styles", 3000);

  inputsColor.map((input) => {
    variables.push(transformVariablesColors(input));
  });

  if (inputFontScale.value != "") {
    inputFontScale.value.split(",").forEach((element) => {
      fontsSize.push(Number(element.trim()) / 16);
    });
  }

  fontsSize.forEach((value, index) => {
    variables.push(transformVariablesFontsSize(value, index));
  });

  navigator.clipboard.writeText(
    variables.join("").toString().replace(/\s/g, "")
  );
});
