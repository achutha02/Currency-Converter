// const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json";

const dropDowns = document.querySelectorAll('select');
const btn = document.querySelector('form button');
const result = document.querySelector('.msg');

for (let select of dropDowns) {
    for (let currCode in countryList) {
        let newOption = document.createElement('option');
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name === 'from' && currCode === 'USD'){
            newOption.selected = 'selected';
        }
        else if(select.name === 'to' && currCode === 'INR'){
            newOption.selected = 'selected';
        }
        select.append(newOption);
    }
    select.addEventListener('change', (evt) => {
        updateFlags(evt.target);
    });
}

const updateFlags = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector('img');
    img.src = newSrc;

};

btn.addEventListener('click', (evt) => {
    evt.preventDefault();
    let amount = document.querySelector('.amount input');
    let amtVal = amount.value;
    if(amtVal === "" || amtVal < 1){
        amtVal = 1;
        amount.value = "1";
    }
    let fromCurr = dropDowns[0].value.toLowerCase();
    let toCurr = dropDowns[1].value.toLowerCase();

    const URL = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${fromCurr}.json`;

    fetch(URL)
    .then((res) => res.json())
    .then((data) => {
      let rate = data[fromCurr][toCurr];
      let convertedAmount = (amtVal * rate).toFixed(2);
      result.innerText = `${amtVal} ${fromCurr.toUpperCase()} = ${convertedAmount} ${toCurr.toUpperCase()}`;
    })
    .catch(() => {
      result.innerText = "Something went wrong. Try again.";
    });
});