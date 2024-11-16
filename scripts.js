import { currencyRates } from "./utils/currencyRates.js";
import { formateCurrencyBRL } from "./utils/formatterCurrency.js";


const form = document.querySelector("form");
const amountInput = document.querySelector("#amount");
const currency = document.querySelector("#currency");
const footer = document.querySelector("main footer");
const description = document.getElementById("description");
const result = document.getElementById("result");

/**
 * @param {*} amount
 * @param {*} price
 * @param {*} cod
 * @param {*} symbol
 *
 * @returns void
 *
 * @description Esta função converte a moeda de acordo com o valor informado e a moeda selecionada e adiciona o resultado no rodapé da página.
 *
 * @example
 * convertCurrency(10, 5.8, "USD", "$");
 * $ 1 = R$ 5,80
 * R$ 58,00
 */
function convertCurrency(amount, price, cod, symbol) {
  try {
    description.textContent = `${cod} ${symbol} 1 = ${formateCurrencyBRL(
      price
    )}`;

    const totalQuote = amount * price;

    result.textContent = formateCurrencyBRL(totalQuote);

    footer.classList.add("show-result");
  } catch (error) {
    console.log(error);
    footer.classList.remove("show-result");
    alert("Não foi possível converter. Tente novamente mais tarde");
  }
}

/**
 *
 * @param {*} selectedCurrencyCode
 * @returns currency object or undefined
 *
 * @description Esta função filtra a moeda selecionada e retorna o objeto da moeda.
 *
 * @example
 * filterCurrency("USD");
 * { cod: "USD", symbol: "$", rate: 5.8 }
 *
 */
function filterCurrency(selectedCurrencyCode) {
  const currency = currencyRates.find(
    (currency) => currency.cod === selectedCurrencyCode
  );
  return currency;
}

amountInput.addEventListener("input", () => {
  const hasCharacteresRegex = /\D+/g;

  amountInput.value = amountInput.value.replace(hasCharacteresRegex, "");
});

/**
 *
 * @param {*} event
 * @returns void
 *
 * @description Esta função é responsável por capturar o evento de submit do formulário e chamar a função convertCurrency.
 */
form.onsubmit = function (event) {
  event.preventDefault();

  const selectedCurrencyCode = currency.value;

  console.log(selectedCurrencyCode);

  const selectedCurrency = filterCurrency(selectedCurrencyCode);

  const amount = amountInput.value;
  const price = selectedCurrency.rate;
  const cod = selectedCurrency.cod;
  const symbol = selectedCurrency.symbol;

  convertCurrency(amount, price, cod, symbol);
};
