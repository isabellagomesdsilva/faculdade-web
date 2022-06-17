import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import Lupa from "./assets/Lupa.png";
import { Formulario } from "./formulario/form";

function App() {
  const [users, setUsers] = useState();
  const [usuarios, setUsuarios] = useState("empty");
  const [search, setSearch] = useState();
  const [userDetails, setUserDetails] = useState();
  const [deleteDetails, setDeleteDetails] = useState();

  useEffect(async () => {
    async function usersGet() {
      const { data } = await axios.get("http://localhost:7000/user/all");
      setUsers(data.data);
    }

    await usersGet();
  });

  const onSearch = async (nome, response) => {
    await axios
      .get(`http://localhost:7000/user/?nome=${nome}`)
      .then((response) => {
        console.log("Response",response)
        setUsuarios([response.data]);
      })
      .catch(function erro(error) {
        if (error.response.data == null) {
          console.log("PESQUISA INVÁLIDA");
          setUsuarios("notFound");
        }
      });
  };

  async function inputSearch(e) {
    setSearch(e.target.value);
    if (e.target.value.length == 0 ) {
      setUsuarios("empty");
    }
    }

  const pesquisa = async () => {
    await onSearch(search);
  };

  const userGetDetails = async function (id) {
    const { data } = await axios.get(`http://localhost:7000/user/${id}`);
    setUserDetails(data);

    var editModal = new bootstrap.Modal(
      document.getElementById("updateBackdrop")
    );
    editModal.show();
  };

  const userDeleteDetails = async function (id) {
    const { data } = await axios.get(`http://localhost:7000/user/${id}`);
    setDeleteDetails(data);

    var removeModal = new bootstrap.Modal(
      document.getElementById("removeBackdrop")
    );
    removeModal.show();
  };

  const putUser = async function () {
    let url = `http://localhost:7000/user/${userDetails._id}`;
    try {
      const response = await fetch(url, {
        method: "PUT",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userDetails),
      });
      return { data: await response.json(), status: response.status };
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUsers = async function () {
    let url = `http://localhost:7000/user/${deleteDetails._id}`;
    try {
      const response = await fetch(url, {
        method: "DELETE",
        mode: "cors",
      });
      return response.json();
    } catch (error) {
      console.log(error);
    }
  };

  const atualizarDadosCep = async function (cep) {
    console.log(cep);
    var xhr;
    if (window.XMLHttpRequest) {
      xhr = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
      xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
        const dadosCep = JSON.parse(xhr.responseText);

        userDetails.rua = dadosCep.logradouro;
        userDetails.bairro = dadosCep.bairro;
        userDetails.cidade = dadosCep.localidade;
      }
    };
    xhr.open("GET", `https://viacep.com.br/ws/${cep}/json/`, true);
    xhr.setRequestHeader("Accept", "*/*");
    xhr.send(null);
  };

  return (
    <div>
      <img
        src='https://d3pwz8qrais8b7.cloudfront.net/portal-wyden/public/custom-uploads/fn-0006-18_-_logo_wyden_unimetrocamp-01.png'
        alt='Logotipo Unimetrocamp'
        id='logo'
        style={{ width: "30%" }}
      />

      <div className='barraPesquisa' style={{ width: "91%", margin: "2%" }}>
        <label
          className='labelSearch'
          style={{ display: "flex", width: "100%" }}
        >
          <img
            src={Lupa}
            alt=''
            className='iconLupa'
            style={{ margin: "0.8%", position: "absolute" }}
          />
          <input
            type='text'
            name='name'
            className='inputSearch'
            style={{
              width: "75%",
              borderStyle: "none",
              backgroundColor: "#f4f4f4",
              height: "7vh",
              marginRight: "3%",
              boxShadow: "0px 6px 8px rgb(0 0 0 / 7%)",
              borderRadius: "27px",
              paddingLeft: "8%",
            }}
            placeholder='Buscar o nome de um usuário'
            onChange={inputSearch}
          />
          <button
            className='buttonSearch'
            onClick={pesquisa}
            style={{
              width: "13%",
              borderRadius: "25px",
              borderStyle: "none",
              backgroundColor: "#4F87C7",
              color: "white",
              cursor: "pointer",
            }}
          >
            Buscar
          </button>
        </label>
      </div>

      {/* EDITAR */}
      <div
        className='modal fade'
        id='updateBackdrop'
        data-bs-backdrop='static'
        data-bs-keyboard='false'
        tabIndex='-1'
        aria-labelledby='staticBackdropLabel'
        aria-hidden='true'
      >
        {userDetails && (
          <div className='modal-dialog'>
            <div className='modal-content'>
              <div className='modal-header'>
                <h3 className='modal-title' id='staticBackdropLabel'>
                  Editar
                </h3>
                <button
                  type='button'
                  className='btn-close'
                  data-bs-dismiss='modal'
                  aria-label='Close'
                ></button>
              </div>
              <div className='modal-body'>
                <form>
                  <div
                    className='container-fluid'
                    style={{
                      justifyContent: "center",
                      display: "flex",
                    }}
                  >
                    <div className='col-md-9'>
                      <label htmlFor='inputID' className='form-label'>
                        ID
                      </label>
                      <input
                        type='text'
                        className='form-control'
                        id='inputID'
                        value={userDetails._id}
                        readOnly
                      />
                      <label htmlFor="validationCustom01" className="form-label">Nome:</label>
                      <input
                        type='text'
                        id="validationCustom01"
                        className='form-control'
                        placeholder='Nome'
                        value={userDetails.nome}
                        onChange={(e) => (userDetails.nome = e.target.value)}
                        style={{ marginBottom: 8 }}
                        required
                      />
                      <label htmlFor='name'>Sobrenome:</label>
                      <input
                        type='text'
                        id='inputSobrenome'
                        className='form-control'
                        placeholder='Sobrenome'
                        value={userDetails.sobrenome}
                        onChange={(e) =>
                          (userDetails.sobrenome = e.target.value)
                        }
                        style={{ marginBottom: 8 }}
                        required
                      />
                      <label htmlFor='CPF'>CPF:</label>
                      <input
                        type='text'
                        id='inputCPF'
                        pattern='\d{11}'
                        className='form-control'
                        placeholder='CPF'
                        value={userDetails.cpf}
                        onChange={(e) => (userDetails.cpf = e.target.value)}
                        style={{ marginBottom: 8 }}
                        required
                      />
                      <div>
                        <label htmlFor='name'>Gênero:</label>
                        <select
                          id='inputGen'
                          required
                          className='form-select'
                          style={{ marginBottom: 8 }}
                          value={userDetails.genero}
                          onChange={(e) =>
                            (userDetails.genero = e.target.value)
                          }
                        >
                          <option>Escolha uma opção</option>
                          <option
                            selected={
                              userDetails.genero == "Feminino" ? "selected" : ""
                            }
                          >
                            Feminino
                          </option>
                          <option
                            selected={
                              userDetails.genero == "Masculino"
                                ? "selected"
                                : ""
                            }
                          >
                            Masculino
                          </option>
                        </select>
                      </div>
                      <label htmlFor='tel'>Telefone:</label>
                      <input
                        type='tel'
                        id='inputTel'
                        className='form-control'
                        required
                        placeholder='Telefone'
                        value={userDetails.telefone}
                        onChange={(e) =>
                          (userDetails.telefone = e.target.value)
                        }
                        style={{ marginBottom: 8 }}
                      />
                      <label htmlFor='CEP'>CEP:</label>
                      <input
                        type='text'
                        id='inputCEP'
                        pattern='\d{8}'
                        required
                        className='form-control'
                        placeholder='CEP'
                        style={{ marginBottom: 8 }}
                        value={userDetails.cep}
                        onChange={(e) => (userDetails.cep = e.target.value)}
                        onBlur={() => atualizarDadosCep(userDetails.cep)}
                      />
                      <label htmlFor='Rua'>Rua:</label>
                      <input
                        type='text'
                        id='inputRua'
                        placeholder='Rua'
                        className='form-control'
                        value={userDetails.rua}
                        style={{ marginBottom: 8 }}
                      />
                      <label htmlFor='Bairro'>Bairro:</label>
                      <input
                        type='text'
                        id='inputBairro'
                        placeholder='Bairro'
                        className='form-control'
                        style={{ marginBottom: 8 }}
                        value={userDetails.bairro}
                      />
                      <label htmlFor='Cidade'>Cidade:</label>
                      <input
                        type='text'
                        id='inputCidade'
                        placeholder='Cidade'
                        className='form-control'
                        style={{ marginBottom: 8 }}
                        value={userDetails.cidade}
                      />
                      <label htmlFor='Num'>Número:</label>
                      <input
                        type='number'
                        id='inputNum'
                        required
                        className='form-control'
                        placeholder='Número'
                        value={userDetails.numero}
                        onChange={(e) => (userDetails.numero = e.target.value)}
                        style={{ marginBottom: 8 }}
                      />
                      <label htmlFor='mail'>E-mail:</label>
                      <input
                        type='email'
                        id='inputMail'
                        required
                        className='form-control'
                        placeholder='E-mail'
                        value={userDetails.email}
                        onChange={(e) => (userDetails.email = e.target.value)}
                        style={{ marginBottom: 8 }}
                      />
                      <label
                        style={{
                          marginBottom: 8,
                        }}
                        htmlFor='date'
                      >
                        Data de nascimento:
                      </label>
                      <input
                        type='date'
                        required
                        id='inputDate'
                        className='form-control'
                        value={userDetails.date}
                        onChange={(e) => (userDetails.date = e.target.value)}
                      />
                      <div
                        className='button'
                        style={{ marginBottom: 10, marginTop: 10 }}
                      >
                        <button
                          onClick={async () => {
                            (await putUser()) == "200";
                          }}
                          type='submit'
                          className='btn btn-primary'
                          style={{ marginRight: 4 }}
                          id='buttonUpdate'
                        >
                          Editar
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              <div className='modal-footer'>
                <button
                  type='button'
                  className='btn btn-secondary'
                  data-bs-dismiss='modal'
                >
                  Sair
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* DELETAR */}
      <div
        className='modal fade'
        id='removeBackdrop'
        data-bs-backdrop='static'
        data-bs-keyboard='false'
        tabIndex='-1'
        aria-labelledby='staticBackdropLabel'
        aria-hidden='true'
      >
        {deleteDetails && (
          <div className='modal-dialog'>
            <div className='modal-content'>
              <div className='modal-header'>
                <h3 className='modal-title' id='staticBackdropLabel'>
                  Deletar
                </h3>
                <button
                  type='button'
                  className='btn-close'
                  data-bs-dismiss='modal'
                  aria-label='Close'
                ></button>
              </div>
              <div className='modal-body'>
                <form>
                  <div
                    className='container-fluid'
                    style={{
                      justifyContent: "center",
                      display: "flex",
                    }}
                  >
                    <div className='col-md-9'>
                      <label htmlFor='inputID' className='form-label'>
                        ID
                      </label>
                      <input
                        type='text'
                        className='form-control'
                        id='inputIDRemove'
                        value={deleteDetails._id}
                        readOnly
                      />
                      <label htmlFor='name'>Nome:</label>
                      <input
                        type='text'
                        id='inputNameRemove'
                        className='form-control'
                        placeholder='Nome'
                        style={{ marginBottom: 8 }}
                        value={deleteDetails.nome}
                        readOnly
                      />
                      <label htmlFor='name'>Sobrenome:</label>
                      <input
                        type='text'
                        id='inputSobrenomeRemove'
                        className='form-control'
                        placeholder='Sobrenome'
                        style={{ marginBottom: 8 }}
                        value={deleteDetails.sobrenome}
                        readOnly
                      />
                      <label htmlFor='CPF'>CPF:</label>
                      <input
                        type='text'
                        id='inputCPFRemove'
                        pattern='\d{11}'
                        className='form-control'
                        placeholder='CPF'
                        style={{ marginBottom: 8 }}
                        value={deleteDetails.cpf}
                        readOnly
                      />
                      <div>
                        <label htmlFor='name'>Gênero:</label>
                        <select
                          id='inputGeneroRemove'
                          className='form-select'
                          style={{
                            marginBottom: 8,
                            pointerEvents: "none",
                            touchAction: "none",
                            background: "#E9ECEF",
                          }}
                          value={deleteDetails.genero}
                          tabIndex='-1'
                          aria-disabled='true'
                        >
                          <option>Escolha uma opção</option>
                          <option>Feminino</option>
                          <option>Masculino</option>
                        </select>
                      </div>
                      <label htmlFor='tel'>Telefone:</label>
                      <input
                        type='tel'
                        id='inputTelRemove'
                        className='form-control'
                        placeholder='Telefone'
                        style={{ marginBottom: 8 }}
                        value={deleteDetails.telefone}
                        readOnly
                      />
                      <label htmlFor='CEP'>CEP:</label>
                      <input
                        type='text'
                        id='inputCEPRemove'
                        pattern='\d{8}'
                        className='form-control'
                        placeholder='CEP'
                        value={deleteDetails.cep}
                        readOnly
                      />
                      <label htmlFor='Rua'>Rua:</label>
                      <input
                        type='text'
                        id='inputRuaRemove'
                        placeholder='Rua'
                        className='form-control'
                        style={{ marginBottom: 8 }}
                        value={deleteDetails.rua}
                        readOnly
                      />
                      <label htmlFor='Bairro'>Bairro:</label>
                      <input
                        type='text'
                        id='inputBairroRemove'
                        placeholder='Bairro'
                        className='form-control'
                        style={{ marginBottom: 8 }}
                        value={deleteDetails.bairro}
                        readOnly
                      />
                      <label htmlFor='Cidade'>Cidade:</label>
                      <input
                        type='text'
                        id='inputCidadeRemove'
                        placeholder='Cidade'
                        className='form-control'
                        style={{ marginBottom: 8 }}
                        value={deleteDetails.cidade}
                        readOnly
                      />
                      <label htmlFor='Num'>Número:</label>
                      <input
                        type='number'
                        id='inputNumeroRemove'
                        className='form-control'
                        placeholder='Número'
                        style={{ marginBottom: 8 }}
                        value={deleteDetails.numero}
                        readOnly
                      />
                      <label htmlFor='mail'>E-mail:</label>
                      <input
                        type='email'
                        id='inputEmailRemove'
                        className='form-control'
                        placeholder='E-mail'
                        value={deleteDetails.email}
                        style={{ marginBottom: 8 }}
                        readOnly
                      />
                      <label
                        style={{
                          marginBottom: 8,
                        }}
                        htmlFor='date'
                      >
                        Data de nascimento:
                      </label>
                      <input
                        type='date'
                        className='form-control'
                        id='inputDateRemove'
                        value={deleteDetails.date}
                        style={{ pointerEvents: "none", touchAction: "none" }}
                        readOnly
                      />{" "}
                      <br />
                      <div
                        className='button'
                        style={{ marginBottom: 10, marginTop: 10 }}
                      >
                        <button
                          onClick={async () => {
                            (await deleteUsers()) == "200";
                          }}
                          type='submit'
                          className='btn btn-danger'
                          style={{ marginRight: 4 }}
                          id='buttonDelete'
                        >
                          Excluir
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              <div className='modal-footer'>
                <button
                  type='button'
                  className='btn btn-secondary'
                  data-bs-dismiss='modal'
                >
                  Sair
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div id='tabela'>
        <table className='table'>
          <thead>
            <tr>
              <th id='CSS' scope='col'>
                ID
              </th>
              <th id='CSS' scope='col'>
                Nome
              </th>
              <th id='CSS' scope='col'>
                Sobrenome
              </th>
              <th id='CSS' scope='col'>
                CPF
              </th>
              <th id='CSS' scope='col'>
                E-mail
              </th>
              <th id='CSS' scope='col'>
                Data de Nascimento
              </th>
              <th id='CSS' scope='col'>
                Ações
              </th>
            </tr>
          </thead>
          <tbody id='tdb'>
            {usuarios == "notFound" ? (
              <div>
                <h4 className='notFound'>Usuário não encontrado</h4>
              </div>
            ) : usuarios != "empty" ? (
              usuarios.map((usuarios, index) => {
                return (
                  <tr key={index}>
                    <td>{usuarios._id}</td>
                    <td>{usuarios.nome}</td>
                    <td>{usuarios.sobrenome}</td>
                    <td>{usuarios.cpf}</td>
                    <td>{usuarios.email}</td>
                    <td>{usuarios.date}</td>
                    <td>
                      <button
                        type='button'
                        className='bi bi-pencil-square'
                        onClick={() => userGetDetails(usuarios._id)}
                        style={{ border: "none", background: "transparent" }}
                      ></button>
                      <button
                        type='button'
                        className='bi bi-trash3-fill'
                        onClick={() => userDeleteDetails(usuarios._id)}
                        style={{ border: "none", background: "transparent" }}
                      ></button>
                    </td>
                  </tr>
                );
              })
            ) : (
              users?.map((usuarios, index) => {
                return (
                  <tr key={index}>
                    <td>{usuarios._id}</td>
                    <td>{usuarios.nome}</td>
                    <td>{usuarios.sobrenome}</td>
                    <td>{usuarios.cpf}</td>
                    <td>{usuarios.email}</td>
                    <td>{usuarios.date}</td>
                    <td>
                      <button
                        type='button'
                        className='bi bi-pencil-square'
                        onClick={() => userGetDetails(usuarios._id)}
                        style={{ border: "none", background: "transparent" }}
                      ></button>
                      <button
                        type='button'
                        className='bi bi-trash3-fill'
                        onClick={() => userDeleteDetails(usuarios._id)}
                        style={{ border: "none", background: "transparent" }}
                      ></button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/*CADASTRO*/}
      <div
        id='buttonCad'
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <button
          type='button'
          className='btn btn-success'
          data-bs-toggle='modal'
          data-bs-target='#staticBackdrop'
        >
          Cadastrar
        </button>
      </div>
      <div
        className='modal fade'
        id='staticBackdrop'
        data-bs-backdrop='static'
        data-bs-keyboard='false'
        tabIndex='-1'
        aria-labelledby='staticBackdropLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h3 className='modal-title' id='staticBackdropLabel'>
                Cadastro
              </h3>
              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'
              ></button>
            </div>
            <div className='modal-body'>
              <Formulario />
            </div>
            <div className='modal-footer'>
              <button
                type='button'
                className='btn btn-secondary'
                data-bs-dismiss='modal'
              >
                Sair
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default App;
