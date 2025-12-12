const selectOne = document.getElementById("currency-one");
const selectTwo = document.getElementById("currency-two");

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
}

document.addEventListener("DOMContentLoaded", () => {
  getAllCurrenciesAsOptions();
});
