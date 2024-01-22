const baseUrl =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
const dropdown = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("button");
const frombtn = document.querySelector(".from select");
const tobtn = document.querySelector(".to select");
const message = document.querySelector(".msg");
const image = document.querySelector("#image");
const loader = document.querySelector("#loader");
window.addEventListener("load", () => {
  loadedPage();
});
for (let select of dropdown) {
  for (let code in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = code;
    if (select.name === "from" && code === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && code === "INR") {
      newOption.selected = "selected";
    }

    select.append(newOption);
    select.classList.add("point");
  }
  select.addEventListener("change", (ele) => {
    changeOption(ele.target);
  });
}
let changeOption = (element) => {
  let code = element.value;
  console.log(code);
  let curr = countryList[code];
  let newSrc = `https://flagsapi.com/${curr}/flat/64.png`;
  let chng = element.parentElement.querySelector("img");
  chng.src = newSrc;
};
btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  loadedPage();
});
const loadedPage = async () => {
  let amnt = document.querySelector(".amount input");
  let amountEnter = amnt.value;
  if (amountEnter === "" || amountEnter < 1) {
    amountEnter = 1;

    amnt.value = "1";
  }

  let newUrl = `${baseUrl}/${frombtn.value.toLowerCase()}/${tobtn.value.toLowerCase()}.json`;

  let response = await fetch(newUrl);
  let concise = await response.json();
  let restData = concise[tobtn.value.toLowerCase()];
  let finalAmount = amountEnter * restData;
  message.innerText = `${amnt.value} ${frombtn.value} = ${finalAmount} ${tobtn.value}`;
};

let loadingImage = () => {
  image.addEventListener("load", function () {
    loader.style.display = "none";
  });
  image.addEventListener("progress", function (event) {
    loader.style.display = "flex";
  });
  image.addEventListener("error", function () {
    loader.innerHTML = "Error loading image";
  });
};
loadingImage();
