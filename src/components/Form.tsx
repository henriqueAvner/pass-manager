import { useState } from 'react';

export default function Form() {
  type Typeform = {
    serviceName: string;
    login: string;
    thisPassword: string;
    address: string;
  };
  const [ocultForm, setOcultForm] = useState(true);
  const [serviceName, setServiceName] = useState('');
  const [login, setLogin] = useState('');
  const [thisPassword, setThisPassword] = useState('');
  const [address, setAddress] = useState('');
  const [disableButton, setdisabbleButton] = useState(true);
  const [serviceList, setServiceList] = useState<Typeform[]>([]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }
  function handleSubmitButton() {
    const thisService = {
      serviceName,
      login,
      thisPassword,
      address,
    };
    setServiceList([...serviceList, thisService]);
    setServiceName('');
    setLogin('');
    setThisPassword('');
    setAddress('');
    setdisabbleButton(true);
    setOcultForm(true);
  }
  function clearButton(index: any) {
    const clearService = serviceList.filter((idx) => idx.serviceName !== index);

    return clearService.length === 0 ? setServiceList([])
      : setServiceList(clearService);
  }

  function handleForm() {
    if (serviceName !== ''
    && login !== ''
    && thisPassword !== ''
    && thisPassword.length >= 8 && thisPassword.length <= 16
    && address !== ''
    && testPassword()) {
      setdisabbleButton(false);
    }
  }
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
              value={ address }
              onChange={ ({ target }) => setAddress(target.value) }
            />

            <button disabled={ disableButton } onClick={ handleSubmitButton }>
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
      {serviceList.length === 0 ? (<p>nenhuma senha cadastrada</p>) : (
        <ul>
          {serviceList.map((service, index) => (
            <div key={ index }>
              <li>
                <a href={ service.address }>{service.serviceName}</a>
              </li>
              <li>
                {service.login}
              </li>
              <li>
                {service.thisPassword}
              </li>
              <button
                data-testid="remove-btn"
                onClick={ () => clearButton(service.serviceName) }
              >
                Limpar

              </button>
            </div>
          ))}
        </ul>
      )}
      {ocultForm && (
        <button onClick={ () => setOcultForm(!ocultForm) }>cadastrar nova senha</button>
      )}

    </div>
  );
}
