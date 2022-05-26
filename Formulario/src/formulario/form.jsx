import { useState } from "react";
import axios from "axios";
import { obterDadosCep } from "./funcoes_form";

export function Formulario() {
  async function cadastrar(){
    let nome = document.querySelector("#name").value
    let sobrenome = document.querySelector("#sobrenome").value
    let cpf = document.querySelector("#CPF").value
    let genero = document.querySelector("#genero").value
    let telefone = document.querySelector("#tel").value
    let cep = document.querySelector("#CEP").value
    let rua = document.querySelector("#Rua").value
    let bairro = document.querySelector("#Bairro").value
    let cidade = document.querySelector("#Cidade").value
    let numero= document.querySelector("#numero").value
    let email = document.querySelector('#mail').value
    let senha = document.querySelector('#Senha').value
    let date= document.querySelector("#date").value
    
    const user = {nome, sobrenome, cpf, genero, telefone, cep, rua, bairro, cidade, numero, email, senha, date}
    const response = await axios.post("http://localhost:7000/user", user)
    if (response.status==201){
      return response.status
    }else{
      return null
    }
  }

  const [valorInputCEP, setValorInputCEP] = useState();
  function mudancaChange(event) {
    setValorInputCEP(event.target.value);
  }
  return (
    <form>
      <div
        className='container-fluid'
        style={{
          justifyContent: "center",
          display: "flex",          
        }}
      >
        <div className='col-md-6'>
          <h1 style={{ textAlign: "center" }}>Formulário de Cadastro</h1>
          <label htmlFor='name'>Nome:</label>
          <input
            type='text'
            id='name'
            className='form-control'
            placeholder='Nome'
            style={{ marginBottom: 8, marginTop: -5 }}
          />
          <label htmlFor='name'>Sobrenome:</label>
          <input
            type='text'
            id='sobrenome'
            className='form-control'
            placeholder='Sobrenome'
            style={{ marginBottom: 8, marginTop: -5 }}
          />
          <label htmlFor='CPF'>CPF:</label>
          <input
            type='text'
            id='CPF'
            pattern='\d{11}'
            className='form-control'
            placeholder='CPF'
            style={{ marginBottom: 8, marginTop: -5 }}
          />
          <div>
            <label htmlFor='name'>Gênero:</label>
            <select
              id='genero'
              className='form-control'
              style={{ marginBottom: 8, marginTop: -5 }}
            >
              <option>Escolha uma opção</option>
              <option>Feminino</option>
              <option>Masculino</option>
            </select>
          </div>
          <label htmlFor='tel'>Telefone:</label>
          <input
            type='tel'
            id='tel'
            className='form-control'
            placeholder='Telefone'
            style={{ marginBottom: 8, marginTop: -5 }}
          />
          <label htmlFor='CEP'>CEP:</label>
          <input
            type='text'
            id='CEP'
            pattern='\d{8}'
            className='form-control'
            placeholder='CEP'
            style={{ marginBottom: 8, marginTop: -5 }}
            onChange={mudancaChange}
            onBlur={() => obterDadosCep(valorInputCEP)}
          />
          <label htmlFor='Rua'>Rua:</label>
          <input
            type='text'
            id='Rua'
            placeholder='Rua'
            className='form-control'
            style={{ marginBottom: 8, marginTop: -5 }}
          />
          <label htmlFor='Bairro'>Bairro:</label>
          <input
            type='text'
            id='Bairro'
            placeholder='Bairro'
            className='form-control'
            style={{ marginBottom: 8, marginTop: -5 }}
          />
          <label htmlFor='Cidade'>Cidade:</label>
          <input
            type='text'
            id='Cidade'
            placeholder='Cidade'
            className='form-control'
            style={{ marginBottom: 8, marginTop: -5 }}
          />
          <label htmlFor='Num'>Número:</label>
          <input
            type='number'
            id='numero'
            className='form-control'
            placeholder='Número'
            style={{ marginBottom: 8, marginTop: -5 }}
          />
          <label htmlFor='mail'>E-mail:</label>
          <input
            type='email'
            id='mail'
            className='form-control'
            placeholder='E-mail'
            style={{ marginBottom: 8, marginTop: -5 }}
          />
          <label htmlFor='Senha'>Senha:</label>
          <input
            type='password'
            id='Senha'
            className='form-control'
            placeholder='Senha'
            style={{ marginBottom: 8, marginTop: -5 }}
          />
          <label style={{ marginTop: 13, marginBottom: 12 }} htmlFor='date'>
            Data de nascimento:
          </label>
          <input type='date' id='date' /> <br />
          <div className='button' style={{ marginBottom: 10 }}>
            <button  onClick={async() => {await cadastrar()=="201"}} type='submit' className='btn btn-primary'>
              Enviar Formulário
            </button>
            <button type='reset' className='btn btn-danger'>
              Reset
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
