// const login = async function(){
//     let url = "https://back-login.vercel.app/usuarios";

//     let inputEmail = document.querySelector("#email");
//     let inputPassword = document.querySelector("#password");

//     loginForm.email = inputEmail.value;
//     loginForm.password = inputPassword.value;
//     let loginForm = {};

//     const response = await fetch(url)
//     const json = response.json();
//     console.log(json)
// }

// document.addEventListener("submit", login)

const login = async function () {
  let url = "https://back-login.vercel.app/usuarios";

  let inputEmail = document.querySelector("#email");
  let inputPassword = document.querySelector("#password");

  loginForm.email = inputEmail.value;
  loginForm.password = inputPassword.value;
  let loginForm = {};
  const request = await fetch(url, {
    method: "POST",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(loginForm),
  });
};

document.addEventListener("submit", login);
