import { useState } from 'react';

export default function Form() {
  const [ocultForm, setOcultForm] = useState(true);
  return (
    <div>
      {!ocultForm && (
        <form>
          <label>
            Nome do serviço
            <input type="text" />
          </label>
          <label>
            Login
            <input type="text" />
          </label>
          <label>
            Senha
            <input type="password" />
          </label>
          <label>
            URL
            <input type="text" />
            <button>Cadastrar</button>
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
