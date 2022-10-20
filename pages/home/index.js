const inputsColor = [...document.querySelectorAll("input[type=color]")];
const inputFontScale = document.querySelector("#fontScale");
const buttonCopy = document.querySelector(".button-copy-colors");

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

buttonCopy.addEventListener("click", (event) => {
  let fontsSize = [];
  let variables = [];

  event.preventDefault();

  buttonCopy.textContent = "Copied!";

  setTimeout(() => {
    buttonCopy.textContent = "Copy Styles";
  }, 3000);

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
