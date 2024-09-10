import './App.css'
import Card from './components/card'

function App() {

  let obj = {
    username: "ayush",
    age: 21
  }

  let newArr = [1, 2, 3, 4]

  return (
    <>
      <h1 className='bg-green-500 text-white p-4 rounded-xl'>Tailwind css testing</h1>
      <Card name="Ayush" myObj={obj}/>
      <Card myArr={newArr} name="aman" btnText="Click me"/>
    </>
  )
}

export default App
