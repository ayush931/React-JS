/* eslint-disable no-unused-vars */
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import React from 'react'

function MyApp(){
  return(
    <>
      <h2>Custom App</h2>
    </>
  )
}

// const ReactElement = {
//   type: 'a',
//   props: {
//       href: 'https://google.com',
//       target: '_blank'
//   },
//   children: 'Click me to visit google'
// }

const anotherElement = (
  <a href='https://www.google.com' target='_blank'>Visit google</a>
)

const anotherUser = "Code"

const reactElement = React.createElement(
  'a',
  {href: 'https://google.com', target: "_blank"},
  "click me to visit google",
  anotherUser
)

createRoot(document.getElementById('root')).render(
  reactElement
)
