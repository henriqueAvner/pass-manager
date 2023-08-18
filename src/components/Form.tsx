export default function Form() {
  return (
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
        <button>Cancelar</button>
      </label>

    </form>
  );
}
