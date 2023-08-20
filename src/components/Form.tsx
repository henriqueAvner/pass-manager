import { useState } from 'react';

export default function Form() {
  const [ocultForm, setOcultForm] = useState(true);
  const [serviceName, setServiceName] = useState('');
  const [login, setLogin] = useState('');
  const [thisPassword, setThisPassword] = useState('');
  const [link, setLink] = useState('');
  const [disableButton, setdisabbleButton] = useState(true);
  const passwordValidation = [
    {
      check: (password: string) => password.length >= 8,
      message: 'Possuir 8 ou mais caracteres',
    },
    {
      check: (password: string) => password.length <= 16,
      message: 'Possuir até 16 caracteres',
    },
    {
      check: (password: string) => /^(?=.*[a-zA-Z])(?=.*\d).*$/.test(password),
      message: 'Possuir letras e números',
    },
    {
      check: (password: string) => /[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]/.test(password),
      message: 'Possuir algum caractere especial',
    },
  ];
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

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
  const testPassword = () => {
    const regex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,16}$/;
    return regex.test(thisPassword);
  };

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
          <div>
            {passwordValidation.map((validation, index) => (
              <p
                key={ index }
                className={ validation
                  .check(thisPassword) ? 'valid-password-check'
                  : 'invalid-password-check' }
              >
                {validation.message}
              </p>
            ))}
          </div>
        </form>

      )}
      {ocultForm && (
        <button onClick={ () => setOcultForm(!ocultForm) }>Cadastrar nova Senha</button>
      )}

    </div>
  );
}
