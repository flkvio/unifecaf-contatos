const buttonEnviar = document.querySelector("#enviar");
const linkCadastro = document.querySelector("#lista-cadastro");

const inputEmail = document.querySelector("#email");
const inputSenha = document.querySelector("#senha");

const login = async function () {
  let url = "https://back-login.vercel.app/usuarios";
  const response = await fetch(url);
  const usuariosCadastrados = await response.json();

  let dadosUsuario = {};
  dadosUsuario.email = inputEmail.value;
  dadosUsuario.senha = inputSenha.value;

  checarUsuario(dadosUsuario, usuariosCadastrados);
};

const checarUsuario = function (usuario, cadastrados) {
  cadastrados.forEach((cadastrado) => {
    if (
      usuario.email == cadastrado.email &&
      usuario.senha == cadastrado.senha
    ) {        
        window.location.assign("../lista-de-contatos.html");
    } else {
      console.log("Errado");
    }
  });
};
buttonEnviar.addEventListener("click", login);