//Lista os contatos cadastrados e usa a função criarCardContato pra exibir eles na tela.
const getContatos = async function () {
  const url =
    "https://projeto-integrado-avaliacao.azurewebsites.net/projeto2/fecaf/listar/contatos";
  const request = await fetch(url);
  const response = await request.json();
  console.log(response);
  response.contatos.reverse().forEach((contato) => {
    criarCardContato(contato);
  });
};

//Função usada pra deletar contatos, é chamada no CreateDeleteModal.
const deleteContatos = async function (id) {
  const url = `https://projeto-integrado-avaliacao.azurewebsites.net/projeto2/fecaf/excluir/contato/${id}`;
  const request = await fetch(url, { method: "DELETE" });
  const response = await request.json();
  console.log(response);
};

//Exibe um popp up na tela perguntando se você deseja excluir o contato, caso queira, ela chama o deleteContatos.
const createDeleteModal = function (contato) {
  const body = document.querySelector("body");
  const modal = document.createElement("div");
  modal.classList.add("modal");
  body.appendChild(modal);

  const modalDeleteContainer = document.createElement("div");
  modalDeleteContainer.classList.add("modal-delete-container");
  modal.appendChild(modalDeleteContainer);

  const modalDeleteText = document.createElement("p");
  modalDeleteText.classList.add("modal-delete-text");
  modalDeleteText.textContent = `Tem certeza que deseja excluir o contato de ${contato.nome}?`;
  modalDeleteContainer.appendChild(modalDeleteText);

  const modalButtonsDiv = document.createElement("div");
  modalButtonsDiv.classList.add("modal-buttons-container");
  modalDeleteContainer.appendChild(modalButtonsDiv);

  const modalDeleteConfirmButton = document.createElement("button");
  modalDeleteConfirmButton.classList.add("modal-button", "modal-delete-button");
  modalDeleteConfirmButton.textContent = "Excluir";
  modalDeleteConfirmButton.addEventListener("click", () => {
    deleteContatos(contato.id).then(() => {
      window.location.reload();
    });
  });
  modalButtonsDiv.appendChild(modalDeleteConfirmButton);

  const modalDeleteCancelButton = document.createElement("button");
  modalDeleteCancelButton.classList.add("modal-button", "modal-cancel-button");
  modalDeleteCancelButton.textContent = "Cancelar";
  modalDeleteCancelButton.addEventListener("click", () => {
    modal.remove();
  });
  modalButtonsDiv.appendChild(modalDeleteCancelButton);
};

const criarCardContato = function (contato) {
  const main = document.querySelector("main");

  const card = document.createElement("div");
  card.setAttribute("contact-id", contato.id);
  card.setAttribute("contact-name", contato.nome);
  card.setAttribute("contact-email", contato.email);
  card.setAttribute("contact-telephone", contato.telefone);
  card.setAttribute("contact-image", contato.image);
  card.classList.add("card");
  main.append(card);

  const cardImg = document.createElement("img");
  cardImg.classList.add("card-image");
  cardImg.setAttribute("src", contato.image);
  cardImg.setAttribute("alt", `Foto de ${contato.nome}`);

  cardImg.addEventListener("error", (event) => {
    event.preventDefault();
    cardImg.setAttribute("src", "../assets/images/icon/person-fill.svg");
  });
  card.appendChild(cardImg);

  const divCardInfo = document.createElement("div");
  divCardInfo.classList.add("card-info");
  card.appendChild(divCardInfo);

  const pCardName = document.createElement("p");
  pCardName.classList.add("card-name");

  pCardName.textContent = contato.nome;
  divCardInfo.appendChild(pCardName);

  const divInfoEmail = document.createElement("div");
  divInfoEmail.classList.add("info-container");
  divCardInfo.appendChild(divInfoEmail);

  const iconCardEmail = document.createElement("i");
  iconCardEmail.classList.add("bi", "bi-envelope-fill");
  divInfoEmail.appendChild(iconCardEmail);

  const pCardEmail = document.createElement("p");
  pCardEmail.classList.add("card-email");
  pCardEmail.textContent = contato.email;
  divInfoEmail.appendChild(pCardEmail);

  const divInfoTelephone = document.createElement("div");
  divInfoTelephone.classList.add("info-container");
  divCardInfo.appendChild(divInfoTelephone);

  const iconCardTelephone = document.createElement("i");
  iconCardTelephone.classList.add("bi", "bi-phone-fill");
  divInfoTelephone.appendChild(iconCardTelephone);

  const pCardTelephone = document.createElement("p");
  pCardTelephone.classList.add("card-telephone");
  pCardTelephone.textContent = contato.telefone;
  divInfoTelephone.appendChild(pCardTelephone);

  const divButtons = document.createElement("div");
  divButtons.classList.add("card-buttons");
  card.appendChild(divButtons);

  const buttonEdit = document.createElement("button");
  buttonEdit.addEventListener("click", () => {
    createEditModal(contato);
  });
  divButtons.appendChild(buttonEdit);

  const buttonEditIcon = document.createElement("i");
  buttonEditIcon.classList.add("bi", "bi-pencil-square");
  buttonEdit.appendChild(buttonEditIcon);

  const buttonDelete = document.createElement("button");
  buttonDelete.addEventListener("click", () => {
    createDeleteModal(contato);
  });
  divButtons.appendChild(buttonDelete);

  const buttonDeleteIcon = document.createElement("i");
  buttonDeleteIcon.classList.add("bi", "bi-trash-fill");
  buttonDelete.appendChild(buttonDeleteIcon);
};

const createEditModal = function (contato) {
  const body = document.querySelector("body");
  const modal = document.createElement("div");
  modal.classList.add("modal");
  body.appendChild(modal);

  const modalEditContainer = document.createElement("div");
  modalEditContainer.classList.add("modal-edit-container");
  modal.appendChild(modalEditContainer);

  const modalEditTitle = document.createElement("h2");
  modalEditTitle.classList.add("modal-edit-title");
  modalEditTitle.textContent = "Editar contato";
  modalEditContainer.appendChild(modalEditTitle);

  const editNameContainer = document.createElement("div");
  editNameContainer.classList.add("edit-input-container");

  modalEditContainer.appendChild(editNameContainer);

  const editNameSpan = document.createElement("span");
  editNameSpan.classList.add("edit-input-span");
  editNameSpan.textContent = "Nome";
  editNameContainer.appendChild(editNameSpan);

  const editNameInput = document.createElement("input");
  editNameInput.classList.add("edit-input");
  editNameInput.setAttribute("type", "text");
  editNameInput.value = contato.nome;
  editNameContainer.appendChild(editNameInput);
  //
  const editEmailContainer = document.createElement("div");
  editEmailContainer.classList.add("edit-input-container");
  modalEditContainer.appendChild(editEmailContainer);

  const editEmailSpan = document.createElement("span");
  editEmailSpan.classList.add("edit-input-span");
  editEmailSpan.textContent = "E-mail";
  editEmailContainer.appendChild(editEmailSpan);

  const editEmailInput = document.createElement("input");
  editEmailInput.classList.add("edit-input");
  editEmailInput.setAttribute("type", "email");
  editEmailInput.value = contato.email;
  editEmailContainer.appendChild(editEmailInput);

  const editTelephoneContainer = document.createElement("div");
  editTelephoneContainer.classList.add("edit-input-container");
  modalEditContainer.appendChild(editTelephoneContainer);

  const editTelephoneSpan = document.createElement("span");
  editTelephoneSpan.classList.add("edit-input-span");
  editTelephoneSpan.textContent = "Celular";
  editTelephoneContainer.appendChild(editTelephoneSpan);

  const editTelephoneInput = document.createElement("input");
  editTelephoneInput.classList.add("edit-input");
  editTelephoneInput.setAttribute("type", "phone");
  editTelephoneInput.value = contato.telefone;
  editTelephoneContainer.appendChild(editTelephoneInput);

  const editImageContainer = document.createElement("div");
  editImageContainer.classList.add("edit-input-container");
  modalEditContainer.appendChild(editImageContainer);

  const editImageSpan = document.createElement("span");
  editImageSpan.classList.add("edit-input-span");
  editImageSpan.textContent = "Endereço da imagem";
  editImageContainer.appendChild(editImageSpan);

  const editImageInput = document.createElement("input");
  editImageInput.classList.add("edit-input");
  editImageInput.setAttribute("type", "text");
  editImageInput.value = contato.image;
  editImageContainer.appendChild(editImageInput);

  const modalButtonsDiv = document.createElement("div");
  modalButtonsDiv.classList.add("modal-buttons-container");
  modalEditContainer.appendChild(modalButtonsDiv);

  const modalSaveButton = document.createElement("button");
  modalSaveButton.classList.add("modal-button", "modal-save-button");
  modalSaveButton.textContent = "Salvar";
  modalSaveButton.addEventListener("click", () => {
    editContatos({
      id: contato.id,
      nome: editNameInput.value,
      email: editEmailInput.value,
      telefone: editTelephoneInput.value,
      image: editImageInput.value,
    }).then(() => {
      window.location.reload();
    });
  });

  modalButtonsDiv.appendChild(modalSaveButton);

  const modalEditCancelButton = document.createElement("button");
  modalEditCancelButton.classList.add("modal-button", "modal-cancel-button");
  modalEditCancelButton.textContent = "Cancelar";
  modalEditCancelButton.addEventListener("click", () => {
    modal.remove();
  });
  modalButtonsDiv.appendChild(modalEditCancelButton);
};

const editContatos = async function (contatoEditado) {
  let url = `https://projeto-integrado-avaliacao.azurewebsites.net/projeto2/fecaf/atualizar/contato/${contatoEditado.id}`;
  console.log(contatoEditado);
  const request = await fetch(url, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(contatoEditado),
  });

  const response = await request.json();
  console.log(response);
};

const createCreateModal = function (contato) {
  const body = document.querySelector("body");
  const modal = document.createElement("div");
  modal.classList.add("modal");
  body.appendChild(modal);

  const modalCreateContainer = document.createElement("div");
  modalCreateContainer.classList.add("modal-edit-container");
  modal.appendChild(modalCreateContainer);

  const modalCreateTitle = document.createElement("h2");
  modalCreateTitle.classList.add("modal-edit-title");
  modalCreateTitle.textContent = "Criar novo contato";
  modalCreateContainer.appendChild(modalCreateTitle);

  const createNameContainer = document.createElement("div");
  createNameContainer.classList.add("edit-input-container");

  modalCreateContainer.appendChild(createNameContainer);

  const createNameSpan = document.createElement("span");
  createNameSpan.classList.add("edit-input-span");
  createNameSpan.textContent = "Nome";
  createNameContainer.appendChild(createNameSpan);

  const createNameInput = document.createElement("input");
  createNameInput.classList.add("edit-input");
  createNameInput.id = "create-name-input";
  createNameInput.setAttribute("type", "text");

  createNameContainer.appendChild(createNameInput);
  //
  const createEmailContainer = document.createElement("div");
  createEmailContainer.classList.add("edit-input-container");
  modalCreateContainer.appendChild(createEmailContainer);

  const createEmailSpan = document.createElement("span");
  createEmailSpan.classList.add("edit-input-span");
  createEmailSpan.textContent = "E-mail";
  createEmailContainer.appendChild(createEmailSpan);

  const createEmailInput = document.createElement("input");
  createEmailInput.id = "create-email-input";
  createEmailInput.classList.add("edit-input");
  createEmailInput.setAttribute("type", "email");

  createEmailContainer.appendChild(createEmailInput);

  const editTelephoneContainer = document.createElement("div");
  editTelephoneContainer.classList.add("edit-input-container");
  modalCreateContainer.appendChild(editTelephoneContainer);

  const createTelephoneSpan = document.createElement("span");
  createTelephoneSpan.classList.add("edit-input-span");
  createTelephoneSpan.textContent = "Celular";
  editTelephoneContainer.appendChild(createTelephoneSpan);

  const createTelephoneInput = document.createElement("input");
  createTelephoneInput.id = "create-telephone-input";
  createTelephoneInput.classList.add("edit-input");
  createTelephoneInput.setAttribute("type", "phone");

  editTelephoneContainer.appendChild(createTelephoneInput);

  const createImageContainer = document.createElement("div");
  createImageContainer.classList.add("edit-input-container");
  modalCreateContainer.appendChild(createImageContainer);

  const createImageSpan = document.createElement("span");
  createImageSpan.classList.add("edit-input-span");
  createImageSpan.textContent = "Endereço da imagem";
  createImageContainer.appendChild(createImageSpan);

  const createImageInput = document.createElement("input");
  createImageInput.id = "create-image-input";
  createImageInput.classList.add("edit-input");
  createImageInput.setAttribute("type", "text");

  createImageContainer.appendChild(createImageInput);

  const modalButtonsDiv = document.createElement("div");
  modalButtonsDiv.classList.add("modal-buttons-container");
  modalCreateContainer.appendChild(modalButtonsDiv);

  const modalSaveButton = document.createElement("button");
  modalSaveButton.classList.add("modal-button", "modal-save-button");
  modalSaveButton.textContent = "Salvar";
  modalSaveButton.addEventListener("click", () => {
    createContatos({
      nome: createNameInput.value,
      email: createEmailInput.value,
      telefone: createTelephoneInput.value,
      image: createImageInput.value,
    }).then(() => {
      window.location.reload();
    });
  });

  modalButtonsDiv.appendChild(modalSaveButton);

  const modalCreateCancelButton = document.createElement("button");
  modalCreateCancelButton.classList.add("modal-button", "modal-cancel-button");
  modalCreateCancelButton.textContent = "Cancelar";
  modalCreateCancelButton.addEventListener("click", () => {
    modal.remove();
  });
  modalButtonsDiv.appendChild(modalCreateCancelButton);
};

const createContatos = async function () {
  let url =
    await "https://projeto-integrado-avaliacao.azurewebsites.net/projeto2/fecaf/novo/contato";

  const nome = document.querySelector("#create-name-input");
  const telefone = document.querySelector("#create-telephone-input");
  const imagem = document.querySelector("#create-image-input");
  const email = document.querySelector("#create-email-input");
  const request = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      nome: nome.value,
      telefone: telefone.value,
      image: imagem.value || "null",
      email: email.value,
    }),
  });
  const response = await request.json();
  console.log(response);
};

const createButton = document.querySelector("#novo-contato");
createButton.addEventListener("click", (event) => {
  event.preventDefault();
  createCreateModal().then(() => {
    window.location.reload();
  });
});

window.addEventListener("load", getContatos);

const footer = document.querySelector("footer");
footer.textContent = new Date().getFullYear() + footer.textContent;
