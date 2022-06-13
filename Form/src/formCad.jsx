import { useState } from "react";
import axios from "axios";
import { consumirCep } from "./funcCEP";

export function Form() {
  async function cadastrar() {
    let nome = document.querySelector("#name").value;
    let date = document.querySelector("#date").value;
    let cpf = document.querySelector("#CPF").value;
    let celular = document.querySelector("#cel").value;
    let email = document.querySelector("#mail").value;
    let cep = document.querySelector("#CEP").value;
    let rua = document.querySelector("#Rua").value;
    let bairro = document.querySelector("#Bairro").value;
    let cidade = document.querySelector("#Cidade").value;
    let numero = document.querySelector("#numero").value;
    let numCart = document.querySelector("#cartao").value;
    let bandeira = document.querySelector("#band").value;
    let nomeCart = document.querySelector("#nameCart").value;
    let CPFprop = document.querySelector("#CPFprop").value;
    let cvv = document.querySelector("#CVV").value;

    const client = {
      nome,
      date,
      cpf,
      celular,
      cep,
      rua,
      bairro,
      cidade,
      numero,
      email,
      numCart,
      bandeira,
      nomeCart,
      CPFprop,
      cvv,
    };

    const response = await axios.post("http://localhost:5000/client", client);
    if (response.status == 201) {
      return response.status;
    } else {
      return null;
    }
  }

  const [valorCEP, setValorCEP] = useState();
  function alterarCEP(event) {
    setValorCEP(event.target.value);
  }

  return (
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
            borderRadius: "2%"
          }}
        >
          <h4>DADOS PESSOAIS:</h4>
          <label htmlFor='name'>Nome completo:</label>
          <input
            type='text'
            id='name'
            className='form-control'
            placeholder='Nome Sobrenome'
            style={{ marginBottom: 8 }}
          />
          <label for='date'>Data de Nascimento:</label>
          <input id='date' className='form-control' type='date' />
          <label htmlFor='CPF'>CPF:</label>
          <input
            type='number'
            id='CPF'
            pattern='\d{11}'
            className='form-control'
            placeholder='000.000.000-00'
            style={{ marginBottom: 8 }}
          />
          <label htmlFor='tel'>Celular:</label>
          <input
            type='tel'
            id='cel'
            className='form-control'
            placeholder='(00) 00000-0000'
            style={{ marginBottom: 8 }}
          />
          <label htmlFor='mail'>E-mail:</label>
          <input
            type='email'
            id='mail'
            className='form-control'
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
            borderRadius: "2%"
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
            onChange={alterarCEP}
            onBlur={() => consumirCep(valorCEP)}
          />
          <label htmlFor='Rua'>Rua:</label>
          <input
            type='text'
            id='Rua'
            placeholder='Rua'
            className='form-control'
            style={{ marginBottom: 8 }}
          />
          <label htmlFor='Bairro'>Bairro:</label>
          <input
            type='text'
            id='Bairro'
            placeholder='Bairro'
            className='form-control'
            style={{ marginBottom: 8 }}
          />
          <label htmlFor='Cidade'>Cidade:</label>
          <input
            type='text'
            id='Cidade'
            placeholder='Cidade'
            className='form-control'
            style={{ marginBottom: 8 }}
          />
          <label htmlFor='Num'>Número:</label>
          <input
            type='number'
            id='numero'
            className='form-control'
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
            borderRadius: "2%"
          }}
        >
          <h4>FORMA DE PAGAMENTO:</h4>
          <label htmlFor='NumCart'>Número do Cartão:</label>
          <input
            type='number'
            id='cartao'
            pattern='\d{16}'
            className='form-control'
            placeholder='0000 0000 0000 0000'
            style={{ marginBottom: 8 }}
          />
          <div>
            <label htmlFor='name'>Bandeira:</label>
            <select
              id='band'
              className='form-select'
              style={{ marginBottom: 8 }}
            >
              <option selected>Escolha sua Bandeira</option>
              <option>Visa</option>
              <option>Mastercard</option>
              <option>Elo</option>
            </select>
          </div>
          <label htmlFor='name'>Nome (como está no cartão):</label>
          <input
            type='text'
            id='nameCart'
            className='form-control'
            placeholder='Nome do cartão'
            style={{ marginBottom: 8 }}
          />
          <label htmlFor='CPFprop'>CPF (proprietário do cartão):</label>
          <input
            type='number'
            id='CPFprop'
            pattern='\d{11}'
            className='form-control'
            placeholder='000.000.000-00'
            style={{ marginBottom: 8 }}
          />
          <label htmlFor='CVV'>CVV:</label>
          <input
            type='number'
            id='CVV'
            pattern='\d{3}'
            className='form-control'
            placeholder='000'
            style={{ marginBottom: 8 }}
          />
        </div>
        <div className='button' style={{ marginBottom: 10, marginTop: 10 }}>
          <button
            onClick={async () => {
              (await cadastrar()) == "201";
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
  );
}
