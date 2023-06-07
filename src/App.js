import { useEffect, useState } from 'react'
import { DivContainer, InputsContainer, ListaDeTarefas, Tarefa } from './style';



function App() {
  const [tarefas, setTarefas] = useState([]);
  const [valorDoInput, setValorDoInput] = useState("");
  const [filtro, setFiltro] = useState("")

  useEffect(() => {
    if (tarefas.length > 0) {
      localStorage.setItem("tarefas", JSON.stringify(tarefas));
    }
  }, [tarefas]);


  useEffect(() => {
    const listaSalva = localStorage.getItem("tarefas");
    if (listaSalva) {
      setTarefas(JSON.parse(listaSalva));
    }
  }, []);




  const pegarValorDoInput = (event) => {
    setValorDoInput(event.target.value);
  }

  const criarTarefa = () => {
    const novatarefa = {
      id: Date.now(), 
      texto: valorDoInput,
      completa: false ,
    };

    const novaListaTarefas = [...tarefas, novatarefa]
    setTarefas(novaListaTarefas)
    console.log(novaListaTarefas);
  }

  const selecionarTarefa = (id) => {

    listaFiltrada.map(tarefa => {
      if (id === tarefa.id){
        return tarefa.completa = true
      }
    })
    
  }

  const pegarValorDoSelect = (event) => {
    setFiltro(event.target.value)
    
  }


  const listaFiltrada = tarefas.filter(tarefa => {
    switch (filtro) {
      case 'pendentes':
        return !tarefa.completa
      case 'completas':
        return tarefa.completa
      default:
        return true
    }
  });


  return (
    <DivContainer>
      <h1>Lista de tarefas</h1>
      <InputsContainer>
        <input value={valorDoInput} onChange={pegarValorDoInput} />
        <button onClick={criarTarefa}>Adicionar</button>
      </InputsContainer>
      <br />

      <InputsContainer>
        <label>Filtro</label>
        <select value={filtro} onChange={pegarValorDoSelect}>
          <option value="">Nenhum</option>
          <option value="pendentes">Pendentes</option>
          <option value="completas">Completas</option>
        </select>
      </InputsContainer>
      <ListaDeTarefas>
        {listaFiltrada.map(tarefa => {
          return (
            <Tarefa
              completa={tarefa.completa}
              onClick={() => selecionarTarefa(tarefa.id)}
            >
              {tarefa.texto}
            </Tarefa>
          )
        })}
      </ListaDeTarefas>
    </DivContainer>
  )
}


export default App
