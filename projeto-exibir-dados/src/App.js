import './index.css';

const App = () => {

  const cliente1 = {
    nome: 'João da Silva',
    idade: 35,
    inscricoes: [
      { tipo: 'Musculação', preco: 'R$ 150' },
      { tipo: 'Aulas de Zumba', preco: 'R$ 100' },
    ],
    ativo: true,
  };

  const cliente2 = {
    nome: 'Maria Oliveira',
    idade: 28,
    inscricoes: [
      { tipo: 'Pilates', preco: 'R$ 200' },
      { tipo: 'Aulas de Natação', preco: 'R$ 180' },
    ],
    ativo: false,
  };

  const cliente3 = {
    nome: 'Lucas Almeida',
    idade: 22,
    inscricoes: [
      { tipo: 'Musculação', preco: 'R$ 150' },
      { tipo: 'Aulas de Natação', preco: 'R$ 180' },
      { tipo: 'Aulas de Zumba', preco: 'R$ 100' },
    ],
    ativo: true,
  };

  const cliente4 = {
    nome: 'Angela Carvalho',
    idade: 58,
    inscricoes: [
      { tipo: 'Pilates', preco: 'R$ 200' },
      { tipo: 'Aulas de Zumba', preco: 'R$ 100' },
    ],
    ativo: true,
  };

  const cliente5 = {
    nome: 'Rodrigo Santos',
    idade: 33,
    inscricoes: [
      { tipo: 'Aulas de Natação', preco: 'R$ 180' },
    ],
    ativo: false,
  };

  let cliente = cliente5;

  function mostrarInscricoes() {
    let inscricoes = cliente.inscricoes.map(inscricao => inscricao.tipo).join(", ")
    return inscricoes
  }

  function calcularPreco() {
    let precos = cliente.inscricoes.map(inscricao =>
      parseFloat(inscricao.preco.replace("R$ ", "")));
    
    let precosNum = precos.reduce((total, valor) => total + valor, 0);
    return precosNum.toFixed(2);
    
  }



  return (
    <>
      <div className='w-[80%] m-auto mt-36'>
        <div className="px-4 sm:px-0">
          <h1 className="text-3xl font-semibold leading-7 text-blue-900">Academia Dev</h1>
          <p className="mt-1 max-w-2xl text-md leading-6 text-gray-500">Desenvolvido por: <a href="https://portfolio-luiz-matheus-da-silva.netlify.app/" className='text-blue-900 hover:underline'>Luiz Matheus da Silva</a></p>
        </div>
        <div className="mt-6 border-t border-gray-100">
          <dl className="divide-y divide-gray-100">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-lg leading-6 text-gray-900 font-bold">Nome Completo:</dt>
              <dd className="mt-1 text-lg leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{cliente.nome}</dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-lg leading-6 text-gray-900 font-bold"> Idade: </dt>
              <dd className="mt-1 text-lg leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{cliente.idade}</dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-lg leading-6 text-gray-900 font-bold">Inscrições:</dt>
              <dd className="mt-1 text-lg leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{mostrarInscricoes()}</dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-lg leading-6 text-gray-900 font-bold">Valor Total:</dt>
              <dd className="mt-1 text-lg leading-6 text-gray-700 sm:col-span-2 sm:mt-0">R$ {calcularPreco()}</dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-lg leading-6 text-gray-900 font-bold">Status:</dt>
              <dd className="mt-1 text-lg leading-6 text-gray-700 sm:col-span-2 sm:mt-0"><p style={cliente.ativo ? {color: "green"} : {color: "red"}}>{cliente.ativo ? 'Ativo' : 'Inativo'}</p></dd>
            </div>
          </dl>
        </div>
      </div>
    </>
  );
}

export default App;
