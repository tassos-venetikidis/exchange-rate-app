const selectOne = document.getElementById("currency-one");
const selectTwo = document.getElementById("currency-two");
const inputOne = document.getElementById("amount-one");
const inputTwo = document.getElementById("amount-two");
const swapBtn = document.getElementById("swap");
const rateP = document.getElementById("rate");

async function getAllCurrenciesAsOptions() {
  const response = await fetch(
    "https://v6.exchangerate-api.com/v6/77f84ef63dda5f0d273a2176/latest/USD"
  );
  const data = await response.json();
  for (const currency of Object.keys(data.conversion_rates)) {
    const optionElementOne = document.createElement("option");
    const optionElementTwo = document.createElement("option");
    optionElementOne.textContent = currency;
    optionElementOne.value = currency;
    if (currency === "EUR") optionElementOne.selected = true;
    optionElementTwo.textContent = currency;
    optionElementTwo.value = currency;
    if (currency === "USD") optionElementTwo.selected = true;
    selectOne.append(optionElementOne);
    selectTwo.append(optionElementTwo);
  }
  calculateExchange();
}

async function calculateExchange() {
  const inputAmount = inputOne.value;
  const inputCurrency = selectOne.value;
  const outputCurrency = selectTwo.value;

  const response = await fetch(
    `https://v6.exchangerate-api.com/v6/77f84ef63dda5f0d273a2176/latest/${inputCurrency}`
  );
  const data = await response.json();

  const rate = data.conversion_rates[outputCurrency];

  inputTwo.value = (inputAmount * rate).toFixed(2);
  displayExchangeRate(rate);
}

function swapCurrencies() {
  const temp = selectOne.value;
  selectOne.value = selectTwo.value;
  selectTwo.value = temp;
  calculateExchange();
}

function displayExchangeRate(rate) {
  rateP.textContent = `1 ${selectOne.value} = ${rate} ${selectTwo.value}`;
}

document.addEventListener("DOMContentLoaded", getAllCurrenciesAsOptions);
inputOne.addEventListener("input", calculateExchange);
swapBtn.addEventListener("click", swapCurrencies);
selectOne.addEventListener("input", calculateExchange);
selectTwo.addEventListener("input", calculateExchange);
