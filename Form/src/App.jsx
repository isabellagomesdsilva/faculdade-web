import axios from "axios";
import { useEffect, useState } from "react";
import { Form } from "./formCad";

export default function App() {
  const [clients, setClients] = useState();
  const [clientUpdate, setClientUpdate] = useState();
  const [deleteClient, setDeleteClient] = useState();

  useEffect(() => {
    async function clientGet() {
      const { data } = await axios.get("http://localhost:5000/client/all");
      setClients(data);
    }

    clientGet();
  }, []);

  const clientGetUpdate = async function (id) {
    const { data } = await axios.get(`http://localhost:5000/client/${id}`);
    setClientUpdate(data);

    var editModal = new bootstrap.Modal(
      document.getElementById("updateBackdrop")
    );
    editModal.show();
  };

  const putClient = async function () {
    let url = `http://localhost:5000/client/${clientUpdate._id}`;
    try {
      const response = await fetch(url, {
        method: "PUT",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(clientUpdate),
      });

      return { data: await response.json(), status: response.status };
    } catch (error) {
      console.log(error);
    }
  };

  const atualizarCep = async function (cep) {
    var xhr;
    if (window.XMLHttpRequest) {
      xhr = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
      xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
        const dadosCep = JSON.parse(xhr.responseText);

        clientUpdate.rua = dadosCep.logradouro;
        clientUpdate.bairro = dadosCep.bairro;
        clientUpdate.cidade = dadosCep.localidade;
      }
    };
    xhr.open("GET", `https://viacep.com.br/ws/${cep}/json/`, true);
    xhr.setRequestHeader("Accept", "*/*");
    xhr.send(null);
  };

  const clientDelete = async function (id) {
    const { data } = await axios.get(`http://localhost:5000/client/${id}`);
    setDeleteClient(data);

    var removeModal = new bootstrap.Modal(
      document.getElementById("removeBackdrop")
    );
    removeModal.show();
  };

  const remove = async function () {
    let url = `http://localhost:5000/client/${deleteClient._id}`;
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
  return (
    <div>
      <div className='Cadastro'>
        <div
          id='buttonCad'
          style={{
            display: "flex",
            flexDirection: "row-reverse",
            marginRight: "0.5em",
            marginBottom: "0.2em",
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
                <Form />
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

      <div
        className='modal fade'
        id='updateBackdrop'
        data-bs-backdrop='static'
        data-bs-keyboard='false'
        tabIndex='-1'
        aria-labelledby='staticBackdropLabel'
        aria-hidden='true'
      >
        {clientUpdate && (
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
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <div
                      className='col-md-9'
                      style={{
                        borderColor: "#D2D2D2",
                        borderStyle: "solid",
                        borderWidth: "1.5px",
                        margin: "1%",
                        padding: "2%",
                        borderRadius: "2%",
                      }}
                    >
                      <h4>DADOS PESSOAIS:</h4>
                      <label htmlFor='name'>Nome completo:</label>
                      <input
                        type='text'
                        id='nameAt'
                        className='form-control'
                        value={clientUpdate.nome}
                        onChange={(e) => (clientUpdate.nome = e.target.value)}
                        placeholder='Nome Sobrenome'
                        style={{ marginBottom: 8 }}
                      />
                      <label for='date'>Data de Nascimento:</label>
                      <input
                        id='date'
                        className='form-control'
                        type='date'
                        value={clientUpdate.date}
                        onChange={(e) => (clientUpdate.date = e.target.value)}
                      />
                      <label htmlFor='CPF'>CPF:</label>
                      <input
                        type='number'
                        id='CPFAt'
                        pattern='\d{11}'
                        className='form-control'
                        placeholder='000.000.000-00'
                        value={clientUpdate.cpf}
                        onChange={(e) => (clientUpdate.cpf = e.target.value)}
                        style={{ marginBottom: 8 }}
                      />
                      <label htmlFor='tel'>Celular:</label>
                      <input
                        type='tel'
                        id='cel'
                        className='form-control'
                        value={clientUpdate.celular}
                        onChange={(e) =>
                          (clientUpdate.celular = e.target.value)
                        }
                        placeholder='(00) 00000-0000'
                        style={{ marginBottom: 8 }}
                      />
                      <label htmlFor='mail'>E-mail:</label>
                      <input
                        type='email'
                        id='mail'
                        className='form-control'
                        value={clientUpdate.email}
                        onChange={(e) => (clientUpdate.email = e.target.value)}
                        placeholder='email@email.com'
                        style={{ marginBottom: 8 }}
                      />
                    </div>

                    <div
                      className='col-md-9'
                      style={{
                        borderColor: "#D2D2D2",
                        borderStyle: "solid",
                        borderWidth: "1.5px",
                        margin: "1%",
                        padding: "2%",
                        borderRadius: "2%",
                      }}
                    >
                      <h4>ENDEREÇO DE ENTREGA:</h4>
                      <label htmlFor='CEP'>CEP:</label>
                      <input
                        type='text'
                        id='CEP'
                        pattern='\d{8}'
                        className='form-control'
                        placeholder='00000-000'
                        style={{ marginBottom: 8 }}
                        value={clientUpdate.cep}
                        onChange={(e) => (clientUpdate.cep = e.target.value)}
                        onBlur={() => atualizarCep(clientUpdate.cep)}
                      />
                      <label htmlFor='Rua'>Rua:</label>
                      <input
                        type='text'
                        id='Rua'
                        placeholder='Rua'
                        value={clientUpdate.rua}
                        className='form-control'
                        style={{ marginBottom: 8 }}
                      />
                      <label htmlFor='Bairro'>Bairro:</label>
                      <input
                        type='text'
                        id='Bairro'
                        placeholder='Bairro'
                        value={clientUpdate.bairro}
                        className='form-control'
                        style={{ marginBottom: 8 }}
                      />
                      <label htmlFor='Cidade'>Cidade:</label>
                      <input
                        type='text'
                        id='Cidade'
                        placeholder='Cidade'
                        value={clientUpdate.cidade}
                        className='form-control'
                        style={{ marginBottom: 8 }}
                      />
                      <label htmlFor='Num'>Número:</label>
                      <input
                        type='number'
                        id='numero'
                        className='form-control'
                        value={clientUpdate.numero}
                        onChange={(e) => (clientUpdate.numero = e.target.value)}
                        placeholder='Número'
                        style={{ marginBottom: 8 }}
                      />
                    </div>

                    <div
                      className='col-md-9'
                      style={{
                        borderColor: "#D2D2D2",
                        borderStyle: "solid",
                        borderWidth: "1.5px",
                        margin: "1%",
                        padding: "2%",
                        borderRadius: "2%",
                      }}
                    >
                      <h4>FORMA DE PAGAMENTO:</h4>
                      <label htmlFor='NumCart'>Número do Cartão:</label>
                      <input
                        type='number'
                        id='cartao'
                        pattern='\d{16}'
                        className='form-control'
                        value={clientUpdate.numCart}
                        onChange={(e) => (clientUpdate.email = e.target.value)}
                        placeholder='0000 0000 0000 0000'
                        style={{ marginBottom: 8 }}
                      />
                      <div>
                        <label htmlFor='name'>Bandeira:</label>
                        <select
                          id='band'
                          className='form-select'
                          style={{ marginBottom: 8 }}
                          value={clientUpdate.bandeira}
                          onChange={(e) =>
                            (clientUpdate.bandeira = e.target.value)
                          }
                        >
                          <option selected>Escolha sua Bandeira</option>
                          <option
                            selected={
                              clientUpdate.bandeira == "Visa" ? "selected" : ""
                            }
                          >
                            Visa
                          </option>
                          <option
                            selected={
                              clientUpdate.bandeira == "Mastercard"
                                ? "selected"
                                : ""
                            }
                          >
                            Mastercard
                          </option>
                          <option
                            selected={
                              clientUpdate.bandeira == "Elo" ? "selected" : ""
                            }
                          >
                            Elo
                          </option>
                        </select>
                      </div>
                      <label htmlFor='name'>Nome (como está no cartão):</label>
                      <input
                        type='text'
                        id='nameCart'
                        className='form-control'
                        placeholder='Nome do cartão'
                        value={clientUpdate.nomeCart}
                        onChange={(e) =>
                          (clientUpdate.nomeCart = e.target.value)
                        }
                        style={{ marginBottom: 8 }}
                      />
                      <label htmlFor='CPFprop'>
                        CPF (proprietário do cartão):
                      </label>
                      <input
                        type='number'
                        id='CPFpropUpdate'
                        pattern='\d{11}'
                        className='form-control'
                        placeholder='000.000.000-00'
                        value={clientUpdate.CPFprop}
                        onChange={(e) =>
                          (clientUpdate.CPFprop = e.target.value)
                        }
                        style={{ marginBottom: 8 }}
                      />
                      <label htmlFor='CVV'>CVV:</label>
                      <input
                        type='number'
                        id='CVVUpdate'
                        pattern='\d{3}'
                        className='form-control'
                        value={clientUpdate.cvv}
                        onChange={(e) => (clientUpdate.cvv = e.target.value)}
                        placeholder='000'
                        style={{ marginBottom: 8 }}
                      />
                    </div>
                    <div
                      className='button'
                      style={{ marginBottom: 10, marginTop: 10 }}
                    >
                      <button
                        onClick={async () => {
                          (await putClient()) == "200";
                        }}
                        type='submit'
                        className='btn btn-primary'
                        style={{ marginRight: 4 }}
                      >
                        Enviar
                      </button>
                      <button type='reset' className='btn btn-danger'>
                        Reset
                      </button>
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

      <div
        className='modal fade'
        id='removeBackdrop'
        data-bs-backdrop='static'
        data-bs-keyboard='false'
        tabIndex='-1'
        aria-labelledby='staticBackdropLabel'
        aria-hidden='true'
      > {deleteClient && (
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h3 className='modal-title' id='staticBackdropLabel'>
                Excluir
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
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <div
                    className='col-md-9'
                    style={{
                      borderColor: "#D2D2D2",
                      borderStyle: "solid",
                      borderWidth: "1.5px",
                      margin: "1%",
                      padding: "2%",
                      borderRadius: "2%",
                    }}
                  >
                    <h4>DADOS PESSOAIS:</h4>
                    <label htmlFor='name'>Nome completo:</label>
                    <input
                      type='text'
                      id='nameAt'
                      className='form-control'
                      value={deleteClient.nome}
                      readOnly
                      placeholder='Nome Sobrenome'
                      style={{ marginBottom: 8 }}
                    />
                    <label htmlFor='date'>Data de Nascimento:</label>
                    <input
                      id='date'
                      className='form-control'
                      type='date'
                      value={deleteClient.date}
                      readOnly
                    />
                    <label htmlFor='CPF'>CPF:</label>
                    <input
                      type='number'
                      id='CPFAt'
                      pattern='\d{11}'
                      readOnly
                      className='form-control'
                      placeholder='000.000.000-00'
                      value={deleteClient.cpf}
                      style={{ marginBottom: 8 }}
                    />
                    <label htmlFor='tel'>Celular:</label>
                    <input
                      type='tel'
                      id='cel'
                      className='form-control'
                      value={deleteClient.celular}      
                      readOnly                
                      placeholder='(00) 00000-0000'
                      style={{ marginBottom: 8 }}
                    />
                    <label htmlFor='mail'>E-mail:</label>
                    <input
                      type='email'
                      id='mail'
                      className='form-control'
                      value={deleteClient.email}
                      readOnly
                      placeholder='email@email.com'
                      style={{ marginBottom: 8 }}
                    />
                  </div>

                  <div
                    className='col-md-9'
                    style={{
                      borderColor: "#D2D2D2",
                      borderStyle: "solid",
                      borderWidth: "1.5px",
                      margin: "1%",
                      padding: "2%",
                      borderRadius: "2%",
                    }}
                  >
                    <h4>ENDEREÇO DE ENTREGA:</h4>
                    <label htmlFor='CEP'>CEP:</label>
                    <input
                      type='text'
                      id='CEP'
                      pattern='\d{8}'
                      className='form-control'
                      placeholder='00000-000'
                      readOnly
                      style={{ marginBottom: 8 }}
                      value={deleteClient.cep}
                    />
                    <label htmlFor='Rua'>Rua:</label>
                    <input
                      type='text'
                      id='Rua'
                      readOnly
                      placeholder='Rua'
                      value={deleteClient.rua}
                      className='form-control'
                      style={{ marginBottom: 8 }}
                    />
                    <label htmlFor='Bairro'>Bairro:</label>
                    <input
                      type='text'
                      id='Bairro'
                      placeholder='Bairro'
                      readOnly
                      value={deleteClient.bairro}
                      className='form-control'
                      style={{ marginBottom: 8 }}
                    />
                    <label htmlFor='Cidade'>Cidade:</label>
                    <input
                      type='text'
                      id='Cidade'
                      placeholder='Cidade'
                      readOnly
                      value={deleteClient.cidade}
                      className='form-control'
                      style={{ marginBottom: 8 }}
                    />
                    <label htmlFor='Num'>Número:</label>
                    <input
                      type='number'
                      id='numero'
                      className='form-control'
                      readOnly
                      value={deleteClient.numero}
                      placeholder='Número'
                      style={{ marginBottom: 8 }}
                    />
                  </div>

                  <div
                    className='col-md-9'
                    style={{
                      borderColor: "#D2D2D2",
                      borderStyle: "solid",
                      borderWidth: "1.5px",
                      margin: "1%",
                      padding: "2%",
                      borderRadius: "2%",
                    }}
                  >
                    <h4>FORMA DE PAGAMENTO:</h4>
                    <label htmlFor='NumCart'>Número do Cartão:</label>
                    <input
                      type='number'
                      id='cartao'
                      pattern='\d{16}'
                      readOnly
                      className='form-control'
                      value={deleteClient.numCart}
                      placeholder='0000 0000 0000 0000'
                      style={{ marginBottom: 8 }}
                    />
                    <div>
                      <label htmlFor='name'>Bandeira:</label>
                      <select
                        id='band'
                        readOnly
                        className='form-select'
                        style={{
                          marginBottom: 8,
                          pointerEvents: "none",
                          touchAction: "none",
                          background: "#E9ECEF",
                        }}
                        value={deleteClient.bandeira}
                      >
                        <option selected>Escolha sua Bandeira</option>
                        <option>
                          Visa
                        </option>
                        <option>
                          Mastercard
                        </option>
                        <option>
                          Elo
                        </option>
                      </select>
                    </div>
                    <label htmlFor='name'>Nome (como está no cartão):</label>
                    <input
                      type='text'
                      id='nameCart'
                      readOnly
                      className='form-control'
                      placeholder='Nome do cartão'
                      value={deleteClient.nomeCart}
                      style={{ marginBottom: 8 }}
                    />
                    <label htmlFor='CPFprop'>
                      CPF (proprietário do cartão):
                    </label>
                    <input
                      type='number'
                      id='CPFpropUpdate'
                      pattern='\d{11}'
                      readOnly
                      className='form-control'
                      placeholder='000.000.000-00'
                      value={deleteClient.CPFprop}
                      style={{ marginBottom: 8 }}
                    />
                    <label htmlFor='CVV'>CVV:</label>
                    <input
                      type='number'
                      id='CVVUpdate'
                      pattern='\d{3}'
                      className='form-control'
                      readOnly
                      value={deleteClient.cvv}
                      placeholder='000'
                      style={{ marginBottom: 8 }}
                    />
                  </div>
                  <div
                    className='button'
                    style={{ marginBottom: 10, marginTop: 10 }}
                  >
                    <button
                      onClick={async () => {
                        (await remove()) == "200";
                      }}
                      type='submit'
                      className='btn btn-danger'
                      style={{ marginRight: 4 }}
                    >
                      Excluir
                    </button>
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
        <table className='table table-dark table-striped'>
          <thead>
            <tr>
              <th id='CSS' scope='col'>
                ID
              </th>
              <th id='CSS' scope='col'>
                Nome
              </th>
              <th id='CSS' scope='col'>
                Data de Nascimento
              </th>
              <th id='CSS' scope='col'>
                CPF
              </th>
              <th id='CSS' scope='col'>
                Celular
              </th>
              <th id='CSS' scope='col'>
                E-mail
              </th>
              <th id='CSS' scope='col'>
                Cidade
              </th>
              <th id='CSS' scope='col'>
                Ações
              </th>
            </tr>
          </thead>
          <tbody id='tdb'>
            {clients &&
              clients.map((clients, index) => (
                <tr key={index}>
                  <td>{clients._id}</td>
                  <td>{clients.nome}</td>
                  <td>{clients.date}</td>
                  <td>{clients.cpf}</td>
                  <td>{clients.celular}</td>
                  <td>{clients.email}</td>
                  <td>{clients.cidade}</td>
                  <td>
                    <button
                      type='button'
                      className='btn btn-warning'
                      onClick={() => clientGetUpdate(clients._id)}
                      style={{ margin: "2px" }}
                    >
                      Editar
                    </button>
                    <button
                      type='button'
                      className='btn btn-danger'
                      onClick={() => clientDelete(clients._id)}
                      style={{ margin: "2px" }}
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
