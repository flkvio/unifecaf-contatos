const form = document.querySelector("#form");

const nomeCompleto = document.querySelector("#nome");
const email = document.querySelector("#email");
const senha = document.querySelector("#senha");
const confirmarSenha = document.querySelector("#confirmar-senha");

const cadastrar = async function () {
  let url =
    "https://projeto-integrado-avaliacao.azurewebsites.net/projeto2/fecaf/novo/contato";

  const form = document.querySelector("#form");

  const nomeCompleto = document.querySelector("#nome");
  const imagem = document.querySelector("#imagem");
  const email = document.querySelector("#email");
  const senha = document.querySelector("#senha");
  const confirmarSenha = document.querySelector("#confirmar-senha");

  const request = fetch(url, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nome: nomeCompleto.value,
      imagem: imagem.value,
      email: email.value,
      senha: senha.value,
    }),
  });
};

form.addEventListener("submit", (event) => {
  event.preventDefault();

  if (senha.value === confirmarSenha.value) {
    cadastrar();
    console.log({
      nome: nomeCompleto.value,
      imagem: imagem.value,
      email: email.value,
      senha: senha.value,
    });
  }
});
