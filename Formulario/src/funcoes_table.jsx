window.onload = async function () {
  let url = "http://localhost:7000/user/all";
  async function getUsers() {
    try {
      let res = await fetch(url);
      return await res.json();
    } catch (error) {
      console.log(error);
    }
  }

  async function renderUsers() {
    let users = await getUsers();
    return users;
  }

  const dados = await renderUsers();

  const divUsers = document.querySelector("#tdb");

  dados.data.map((value, index) => {
    const divUser = document.createElement("tr");
    divUser.className = `userClass-${index}`;

    const userId = document.createElement("td");
    userId.innerHTML = value._id;

    const userName = document.createElement("td");
    userName.innerHTML = value.nome;

    const userSobrenome = document.createElement("td");
    userEmail.innerHTML = value.sobrenome;

    const userCPF = document.createElement("td");
    userEmail.innerHTML = value.cpf;

    const userEmail = document.createElement("td");
    userEmail.innerHTML = value.email;

    const userDN = document.createElement("td");
    userEmail.innerHTML = value.date;

    const buttonEdit = document.createElement("i");
    buttonEdit.className = `bi bi-pencil-square`;
    buttonEdit.onclick = () => {
      var editModal = new bootstrap.Modal(
        document.getElementById("updateBackdrop")
      );
      editModal.show();

      var inputID = document.querySelector("#inputID");
      var inputName = document.querySelector("#inputName");
      var inputSobrenome = document.querySelector("#inputSobrenome");
      var inputCPF = document.querySelector("#inputCPF");
      var inputGenero = document.querySelector("#inputGen");
      var inputTel = document.querySelector("#inputTel");
      var inputCEP = document.querySelector("#inputCEP");
      var inputRua = document.querySelector("#inputmail");
      var inputBairro = document.querySelector("#inputBairro");
      var inputCidade = document.querySelector("#inputCidade");
      var inputNum = document.querySelector("#inputNum");
      var inputEmail = document.querySelector("#inputMail");
      var inputSenha = document.querySelector("#inputSenha");
      var inputDN = document.querySelector("#inputDate");

      inputID.value = value._id;
      inputName.value = value.nome;
      inputSobrenome.value = value.sobrenome;
      inputCPF.value = value.cpf;
      inputGenero.value = value.genero;
      inputTel.value = value.telefone;
      inputCEP.value = value.cep;
      inputRua.value = value.rua;
      inputBairro.value = value.bairro;
      inputCidade.value = value.cidade;
      inputNum.value = value.numero;
      inputEmail.value = value.email;
      inputSenha.value = value.senha;
      inputDN.value = value.date;
    };

    const buttonRemove = document.createElement("i");
    buttonRemove.className = `bi bi-trash3-fill`;
    buttonRemove.onclick = () => {
      var removeModal = new bootstrap.Modal(
        document.getElementById("removeBackdrop")
      );
      removeModal.show();

      var inputIDRemove = document.querySelector("#inputIDRemove");
      var inputNameRemove = document.querySelector("#inputNameRemove");
      var inputSobrenomeRemove = document.querySelector("#inputSobrenomeRemove");
      var inputCPFRemove = document.querySelector("#inputCPFRemove");
      var inputGeneroRemove = document.querySelector("#inputGenRemove");
      var inputTelRemove = document.querySelector("#inputTelRemove");
      var inputCEPRemove = document.querySelector("#inputCEPRemove");
      var inputRuaRemove = document.querySelector("#inputmailRemove");
      var inputBairroRemove = document.querySelector("#inputBairroRemove");
      var inputCidadeRemove = document.querySelector("#inputCidadeRemove");
      var inputNumRemove = document.querySelector("#inputNumRemove");
      var inputEmailRemove = document.querySelector("#inputEmailRemove");
      var inputSenhaRemove = document.querySelector("#inputSenhaRemove");
      var inputDNRemove = document.querySelector("#inputDateRemove");

      inputIDRemove.value = value._id;
      inputNameRemove.value = value.nome;
      inputSobrenomeRemove.value = value.sobrenome;
      inputCPFRemove.value = value.cpf;
      inputGeneroRemove.value = value.genero;
      inputTelRemove.value = value.telefone;
      inputCEPRemove.value = value.cep;
      inputRuaRemove.value = value.rua;
      inputBairroRemove.value = value.bairro;
      inputCidadeRemove.value = value.cidade;
      inputNumRemove.value = value.numero;
      inputEmailRemove.value = value.email;
      inputSenhaRemove.value = value.senha;
      inputDNRemove.value = value.date;
      
    };

    divUser.appendChild(userId);
    divUser.appendChild(userName);
    divUser.appendChild(userSobrenome);
    divUser.appendChild(userCPF);
    divUser.appendChild(userEmail);
    divUser.appendChild(userDN);
    divUsers.appendChild(divUser);
  });
};
