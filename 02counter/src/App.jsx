import { useState } from 'react'
import './App.css'

function App() {

  let [counter, setCounter] = useState(15)

  const addValue = () => {
    console.log("clicked", counter)
    if(counter < 20){
      setCounter(counter + 1)
    }else{
      alert('Cannot exceed than 20')
    }
  }

  const removeValue = () => {
    if(counter > 0){
      setCounter(counter - 1)
    }else{
      alert('Negative number not allowed')
    }
  }

  return (
    <>
      <h1>Chai aur code</h1>
      <h2>Counter button: {counter}</h2>

      <button onClick={addValue}>Add value</button>
      <br />
      <button onClick={removeValue}>Decrease value</button>
    </>
  )
}

export default App
