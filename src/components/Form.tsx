import { useState } from 'react';

export default function Form() {
  const [ocultForm, setOcultForm] = useState(true);
  const [serviceName, setServiceName] = useState('');
  const [login, setLogin] = useState('');
  const [thisPassword, setThisPassword] = useState('');
  const [link, setLink] = useState('');
  const [disableButton, setdisabbleButton] = useState(true);
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }
  const testPassword = () => {
    const regex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,16}$/;
    return regex.test(thisPassword);
  };

  function handleForm() {
    if (serviceName !== ''
    && login !== ''
    && thisPassword !== ''
    && thisPassword.length >= 8 && thisPassword.length <= 16
    && link !== ''
    && testPassword()) {
      setdisabbleButton(false);
    } else {
      setdisabbleButton(true);
    }
  }

  return (
    <div>
      {!ocultForm && (
        <form onSubmit={ handleSubmit } onChange={ handleForm }>
          <label>
            Nome do serviço
            <input
              type="text"
              value={ serviceName }
              onChange={ (event) => setServiceName(event.target.value) }
            />
          </label>
          <label>
            Login
            <input
              type="text"
              value={ login }
              onChange={ (event) => setLogin(event.target.value) }
            />
          </label>
          <label>
            Senha
            <input
              type="password"
              value={ thisPassword }
              onChange={ (event) => setThisPassword(event.target.value) }
            />
          </label>
          <label>
            URL
            <input
              type="text"
              value={ link }
              onChange={ ({ target }) => setLink(target.value) }
            />
            <button disabled={ disableButton }>
              Cadastrar
            </button>
            <button onClick={ () => { setOcultForm(!ocultForm); } }>Cancelar</button>
          </label>

        </form>
      )}
      {ocultForm && (
        <button onClick={ () => setOcultForm(!ocultForm) }>Cadastrar nova Senha</button>
      )}
    </div>
  );
}
