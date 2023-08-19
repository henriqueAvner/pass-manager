import { useState } from 'react';
import Form from './Form';
import Title from './Title';

export function Cadastro() {
  const [login, setLogin] = useState('Cadastrar nova senha');
  const ShowForm = () => {
    setLogin((()) => {<>
        <Title />
        <Form />
        </>});
  };

  return (
    <button>{login}</button>
  );
}
