
import './App.css';
import * as queries from './graphql/queries'

import * as mutations from './graphql/mutations'

import { Amplify } from 'aws-amplify';
import { generateClient } from 'aws-amplify/api';
import config from './amplifyconfiguration.json';
import { useEffect, useState } from 'react';
Amplify.configure(config);

const defaultState = { name: '', description: ''}

function App() {

  const [todos, setTodos] = useState([])
  const [formData, setFormData] = useState(defaultState)

const client = generateClient();

  useEffect(() => {
    fetchTodos()
  }, [])

  const fetchTodos = async () => {
   
    const result = await client.graphql({
      query: queries.listTodos
    })

    setTodos(result.data.listTodos.items)


    console.log("Fetching todos: ", result.data.listTodos.items)
  }

  const createTo = async () => {

    if (!formData.name) return 
    // let myTodo = {
    //   name: 'Todo 3',
    //   description: 'HELLO TODO 3'
    // }

    let res = await client.graphql({
      query: mutations.createTodo,
      variables: {
        input: formData
      }
    })

    setTodos([...todos, formData])

    console.log("CREATE TODO: ", res)
  }

  const deleteTodo = async (id) => {
    const newArr = todos.filter(item => item.id !== id)

    setTodos(newArr)

    await client.graphql({
      query: mutations.deleteTodo,
      variables: {
        input: { id }
      }
    })
  }

  return (
    <div className="App">

        <div className='todos'>
          <h1>Todos</h1>

          <div className='todos-input'>

            <input 
              onChange={(e) => setFormData({...formData, 'name': e.target.value})}
              placeholder='Todo name'
              value={formData.name}
            />

            <input 
              onChange={(e) => setFormData({...formData, 'description': e.target.value})}
              placeholder='Todo description'
              value={formData.description}
            />
          </div>

        </div>
      {/* Hello
      <button onClick={() => fetchTodos()}>fetchTodos</button> */}
      <button className='button-create' onClick={() => createTo()}>createTodo</button>
      <div className='container'>

        { todos && todos.length > 0 &&
          todos.map((item, index) => {
            return (
              <div className='todo-item' key={index}>
                <div>
                  <h2>{item.name}</h2>
                  <p>{item.description}</p>
                </div>
                <button className='button-delete' onClick={() => deleteTodo(item.id)}>Delete todo</button>
              </div>
            )
          })
        }
      </div>
    </div>
  );
}

export default App;
