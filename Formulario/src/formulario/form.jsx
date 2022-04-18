import { useState } from "react";
import { obterDadosCep } from "./funcoes_form";

export function Formulario() {
  const [valorInputCEP, setValorInputCEP] = useState();
  function mudancaChange(event) {
    setValorInputCEP(event.target.value);
  }
  return (
    <form action='www.google.com' method='post'>
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
          <input
            type='checkbox'
            id='Sim'
            value='1'
            style={{ marginBottom: 15, marginTop: -5 }}
          />
          Li e concordo com os termos de uso
          <div className='button' style={{ marginBottom: 10 }}>
            <button type='submit' className='btn btn-primary'>
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
