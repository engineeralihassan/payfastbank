"use strict";
const account1 = {
  owner: "engineeralihassan",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
  img: "assets/images/pic-1.jpg",
  movementsDates: [
    "2022-05-18T21:31:17.178Z",
    "2012-04-23T07:42:02.383Z",
    "2022-01-28T09:15:04.904Z",
    "2022-04-01T10:17:24.185Z",
    "2022-05-08T14:11:59.604Z",
    "2022-07-24T17:01:17.194Z",
    "2022-07-23T23:36:17.929Z",
    "2022-08-11T10:51:36.790Z",
  ],
  currency: "EUR",
  locale: "pt-PT", // de-DE
};

const account2 = {
  owner: "danishriaz",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  img: "assets/images/pic-3.jpg",
  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
  currency: "PKR",
  locale: "en-US",
};

const account3 = {
  owner: "Anas Ashiq",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  img: "assets/images/pic-4.jpg",
  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const account4 = {
  owner: "Husnain Rubbani",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
  img: "assets/images/pic-1.jpg",
  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2020-05-27T17:01:17.194Z",
    "2020-07-11T23:36:17.929Z",
    "2020-07-12T10:51:36.790Z",
  ],
  currency: "EUR",
  locale: "pt-PT", // de-DE
};

const accounts = [account1, account2, account3, account4];
// navbar variables
const navbarNav = document.querySelector(".navbar-nav");
const navbarToggleBtn = document.querySelector(".nav-toggle-btn");
let links = document.querySelectorAll(".nav-item");
let username = document.querySelector(".username");
let passward = document.querySelector(".passward");
let submit = document.querySelector(".submit");
// user functionality variables
const labelWelcome = document.querySelector(".ownername");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".submit");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

let inputLoginUsername = document.querySelector(".username");
let inputLoginPin = document.querySelector(".passward");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");
let img = document.querySelector(".userimage");
let navbarloginbtn = document.querySelector(".login-main-btn");

// navbar toggle functionality
navbarToggleBtn.addEventListener("click", function () {
  navbarNav.classList.toggle("active");
  this.classList.toggle("active");
});

// console.log(links);
for (let i = 0; i < links.length; i++) {
  links[i].addEventListener("click", (e) => {
    navbarNav.classList.toggle("active");
    navbarToggleBtn.classList.toggle("active");
  });
}

// ??????????????????????????????

let displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = "";
  let movs = sort ? acc.movements.slice().sort((a, b) => a - b) : acc.movements;

  movs.forEach((element, ind, arr) => {
    let type = element > 0 ? "deposit" : "withdrawal";
    let date = new Date(acc.movementsDates[ind]);
    let displayDate = movementDates(date, acc.locale);
    let formatdMovements = new Intl.NumberFormat(acc.locale, {
      style: "currency",
      currency: "PKR",
    }).format(element);

    let htmlrow = `
       <div class="movements__row">
          <div class="movements__type movements__type--${type}">
          ${ind + 1} ${type}
          </div>
          <div class="movements__date">${displayDate}</div>
        
          <div class="movements__value">
          ${formatdMovements}</div>
        </div>`;

    containerMovements.insertAdjacentHTML("afterbegin", htmlrow);
  });
};

let movementDates = function (date, locale) {
  let calDayspass = (date, date1) =>
    Math.round(Math.abs(date1 - date) / (1000 * 60 * 60 * 24));
  // count days
  let dayspass = calDayspass(new Date(), date);
  console.log(dayspass);
  if (dayspass === 0) {
    return "Today";
  }
  if (dayspass === 1) {
    return "Yesteday";
  }
  if (dayspass <= 7) {
    return `${dayspass} days ago `;
  }
  return new Intl.DateTimeFormat(locale).format(date);
};

let user = "Ali Hassan";

let createUsername = (accs) => {
  accs.forEach((acc) => {
    acc.username = acc.owner
      .toLowerCase()
      .split(" ")
      .map((el) => el.slice(0, 1))
      .join("");
  });
};

// ******************************************************

// calculate the balance total
let calcBalance = function (acc) {
  let totalbalance = acc.movements.reduce((acc, el, ind, arr) => acc + el, 0);
  acc.balance = totalbalance;

  labelBalance.textContent = acc.balance.toFixed(2) + " " + "Rs";
  //this 0 is initial value of the accumulator
};

// *************************************************************************

let calcDisplaySummry = function (acc) {
  let incomes = acc.movements
    .filter((incom) => incom > 0)
    .reduce((acc, incom) => acc + incom, 0);
  labelSumIn.textContent = incomes.toFixed(2) + "$";
  let expences = acc.movements
    .filter((expence) => expence < 0)
    .reduce((acc, exp) => acc + exp, 0);
  labelSumOut.textContent = expences.toFixed(2) + "$";
  // intrest acount
  let intrest = acc.movements
    .filter((expence) => expence > 0)
    .map((exp, ind) => (exp * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      console.log(arr);
      return int >= 1;
    })
    .reduce((acc, intst, ind) => acc + intst, 0);

  labelSumInterest.textContent = intrest.toFixed(2) + "$";
};

// update UI function
function updateUi(acc) {
  // // Display movements
  displayMovements(acc);
  // // display balance
  calcBalance(acc);
  // // display summry
  calcDisplaySummry(acc);
}

let currAccount, timer;

btnLogin.addEventListener("click", function (e) {
  e.preventDefault();

  currAccount = accounts.find((acc) => acc.owner === inputLoginUsername.value);

  if (currAccount.pin === Number(inputLoginPin.value)) {
    alert(`This is Mr ${currAccount.owner} Account`);
    // let acounts configration and display data
    // display ui ux
    labelWelcome.textContent = `${currAccount.owner}`;
    document.querySelector(".main").style.display = "none";
    document.querySelector(".usersection").style.display = "block";
    navbarloginbtn.textContent = "logout";

    // Dates functionality reference
    let now = new Date();
    let optionsobj = {
      hour: "numeric",
      minute: "numeric",
      day: "numeric",
      month: "numeric",
      // month: "2-digit",
      year: "numeric",
      // weekday: "long",
    };

    // browser languages
    // let local = navigator.language;
    // account local

    labelDate.textContent = new Intl.DateTimeFormat(
      currAccount.locale,
      optionsobj
    ).format(now);

    // let now = new Date();

    // let day = `${now.getDate()}`.padStart(2, "0");
    // let month = `${now.getMonth() + 1}`.padStart(2, "0");
    // let year = now.getFullYear();
    // let hour = `${now.getHours()}`.padStart(2, "0");
    // let mints = `${now.getMinutes()}`.padStart(2, "0");
    // labelDate.textContent = `${day}/${month}/${year}, ${hour}:${mints}`;

    //thses 3 function use more place thats why we
    //put the in 1 plcae

    // // Display movements
    // displayMovements(currAccount.movements);

    // // display balance
    // calcBalance(currAccount);

    // // display summry
    // calcDisplaySummry(currAccount);

    updateUi(currAccount);
    // clear inputs

    img.src = `${currAccount.img}`;

    inputLoginUsername.value = inputLoginPin.value = "";
  } else {
    alert("This acount is not available");

    containerApp.style.opacity = 0;
  }
});
// *******************************************8
// let transfer money implementations
navbarloginbtn.addEventListener("click", (e) => {
  e.preventDefault();
  document.querySelector(".usersection").style.display = "none";
  document.querySelector(".landing").style.display = "block";
  navbarloginbtn.textContent = "login";
});
btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();
  let amount = Number(inputTransferAmount.value);
  let reciever = accounts.find((acc) => acc.owner === inputTransferTo.value);

  if (
    amount > 0 &&
    reciever &&
    currAccount.balance > amount &&
    reciever?.owner !== currAccount.owner
  ) {
    alert("Transfer valid");
    currAccount.movements.push(-amount);
    reciever.movements.push(amount);
    // add date into dates array
    currAccount.movementsDates.push(new Date().toISOString());
    reciever.movementsDates.push(new Date().toISOString());

    // update ui
    updateUi(currAccount);

    inputTransferAmount.value = inputTransferTo.value = "";
  } else {
    alert("not valid transfer");
  }
});
// ***********************************************
// LOAN FUNCTIONALITY IMPLEMENTATIONS

btnLoan.addEventListener("click", function (e) {
  e.preventDefault();
  let amount = Math.floor(inputLoanAmount.value);

  if (amount > 0 && currAccount.movements.some((move) => move >= amount * 10)) {
    setTimeout(function () {
      currAccount.movements.push(amount);
      // add date into dates array
      currAccount.movementsDates.push(new Date().toISOString());

      updateUi(currAccount);
    }, 2500);

    inputLoanAmount.value = "";
  } else {
    alert(`Sorry ${currAccount.owner} you could not meet the loan requirments.
    Its necessary to deposit at-least 1 amount which is 10% of this Loan 
    Amount`);
  }
});
// *********************************************
// DELETE ACOUNT IMPLEMENTATIONS
btnClose.addEventListener("click", function (e) {
  e.preventDefault();

  if (
    currAccount.owner === inputCloseUsername.value &&
    currAccount.pin === Number(inputClosePin.value)
  ) {
    let conf = confirm(`you realy want to delete acount
    this could not be recoverd again`);
    inputCloseUsername.value = inputClosePin.value = "";
    if (conf) {
      let index = accounts.findIndex(
        (acc, ind) => acc.username === currAccount.username
      );
      console.log(index);
      accounts.splice(index, 1);
      //hide acount ui
      document.querySelector(".usersection").style.display = "none";
      document.querySelector(".landing").style.display = "block";
      navbarloginbtn.textContent = "login";
    }
  } else {
    alert("The Username and Passward in not matched");
  }
});
