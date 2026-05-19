const email = document.querySelector("#email");
const country = document.querySelector("select");
const postalCode = document.querySelector("#postal-code");
const passwd = document.querySelector("#password");
const confirmPasswd = document.querySelector("#confirm-password");
const submitBtn = document.querySelector("#submit");
const emailSpan = document.querySelector(".email");
const postalCodeSpan = document.querySelector(".postal-code");
const passwdSpan = document.querySelector(".password");
const confirmPasswdSpan = document.querySelector(".confirm-password");
const countrySpan = document.querySelector(".country");
const form = document.querySelector("form");

function showEmailError() {
  if (email.validity.valueMissing) {
    emailSpan.textContent = "Enter an email";
  } else if (email.validity.typeMismatch) {
    emailSpan.textContent = "Value needs to be an email address";
  } else if (email.validity.tooShort) {
    emailSpan.textContent = `Email should be at least ${email.minLength} characters`;
  } else if (!email.value.endsWith("@gmail.com")) {
    emailSpan.textContent = "Email should end with @gmail.com";
  }
  emailSpan.classList.add("error");
}
function showPostalCodeError() {
  if (postalCode.validity.patternMismatch) {
    postalCodeSpan.textContent = `Postal code must be ${postalCode.minLength} digits`;
  } else if (postalCode.validity.valueMissing) {
    postalCodeSpan.textContent = "Enter your postal code";
  }
  postalCodeSpan.classList.add("error");
}
function showPasswordError() {
  const password = passwd.value;
  if (!/[A-Z]/.test(password)) {
    passwdSpan.textContent = "Password must contain an uppercase";
  }
  if (!/\d/.test(password)) {
    passwdSpan.textContent = "Password must contain a number";
  }
  if (passwd.value.length < 8) {
    passwdSpan.textContent = "Password must contain at least 8 characters.";
  }
  if (passwd.validity.valueMissing) {
    passwdSpan.textContent = "Please input your password";
  }
  passwdSpan.classList.add("error");
}
function showSubmissionMsg() {
  const content = document.querySelector("#content");
  const dialog = document.createElement("dialog");
  const para = document.createElement("p");
  content.appendChild(dialog);
  dialog.appendChild(para);
  para.textContent = "Submission successful";
  dialog.showModal();
  const okBtn = document.createElement("button");
  okBtn.textContent = "Ok";
  dialog.appendChild(okBtn);
  okBtn.addEventListener("click", () => {
    dialog.close();
  });
}
email.addEventListener("input", () => {
  if (email.validity.valid && email.value.endsWith("@gmail.com")) {
    emailSpan.textContent = "";
    emailSpan.classList.remove("error");
  } else {
    showEmailError();
  }
});

if (country.value === "") {
  postalCode.disabled = true;
}
country.addEventListener("change", () => {
  postalCode.value = ""; // clear the postal code input upon value change
  postalCodeSpan.textContent = ""; // clear the error message
  postalCodeSpan.classList.remove("error"); // remove the error class
  postalCode.disabled = false;
  countrySpan.textContent = "";
  countrySpan.classList.remove("error");
  if (
    country.value === "nigeria" ||
    country.value === "india" ||
    country.value === "china"
  ) {
    postalCode.placeholder = "123456";
    postalCode.minLength = 6;
    postalCode.pattern = "[0-9]{6}"; // six digit numbers
  } else if (
    country.value === "us" ||
    country.value === "mexico" ||
    country.value === "peru"
  ) {
    postalCode.pattern = "[0-9]{5}"; // five digit numbers
    postalCode.minLength = 5;
    postalCode.placeholder = "12345";
  }
});

postalCode.addEventListener("input", () => {
  if (postalCode.validity.valid) {
    postalCodeSpan.textContent = "";
    postalCodeSpan.classList.remove("error");
  } else {
    showPostalCodeError();
  }
});

passwd.addEventListener("input", () => {
  if (passwd.validity.valid) {
    passwdSpan.classList.remove("error");
    passwdSpan.textContent = "";
  } else {
    showPasswordError();
  }
});

confirmPasswd.addEventListener("input", () => {
  if (confirmPasswd.value === "") {
    confirmPasswdSpan.textContent = "Please confirm your password";
    confirmPasswdSpan.classList.add("error");
  } else if (confirmPasswd.value !== passwd.value) {
    confirmPasswdSpan.textContent = "Password doesn't match";
    confirmPasswdSpan.classList.add("error");
  } else {
    confirmPasswdSpan.textContent = "";
    confirmPasswdSpan.classList.remove("error");
  }
});

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (!email.validity.valid || !email.value.endsWith("gmail.com")) {
    showEmailError();
    return;
  }
  if (country.value === "") {
    countrySpan.textContent = "Please choose a country";
    countrySpan.classList.add("error");
    return;
  } else {
    countrySpan.textContent = "";
    countrySpan.classList.remove("error");
  }
  if (!postalCode.validity.valid) {
    showPostalCodeError();
    return;
  }
  if (!passwd.validity.valid) {
    showPasswordError();
    return;
  }
  if (confirmPasswd.value.trim() === "") {
    confirmPasswdSpan.textContent = "Please confirm your password";
    confirmPasswdSpan.classList.add("error");
    return;
  } else {
    confirmPasswdSpan.textContent = "";
    confirmPasswdSpan.classList.remove("error");
  }

  showSubmissionMsg();
});
