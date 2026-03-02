/**
 * useContext is a React Hook that lets you read and subscribe to context from your component.
 * const value = useContext(SomeContext)
 */

/**
 *  useContext() always looks for the closest provider above the component that calls it. It searches upwards and does not consider providers in the component from which you’re calling useContext().
 */

// creating task context

import { createContext, useContext, useReducer, useState } from "react";

const TasksContext = createContext(null);
const TasksDispatchContext = createContext(null);

function TasksProvider({ children }) {
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);

  return (
    <TasksContext value={tasks}>
      <TasksDispatchContext value={dispatch}>
        {children}
      </TasksDispatchContext>
    </TasksContext>
  )
}

function useTasks() {
  return useContext(TasksContext)
}

function useTasksDispatch() {
  return useContext(TasksDispatchContext)
}

function tasksReducer(tasks, action) {
  switch (action.type) {
    case 'added': {
      return [...tasks, {
        id: action.id,
        text: action.text,
        done: false
      }]
    }
    case 'changed': {
      return tasks.map(t => {
        if (t.id === action.task.id) {
          return action.task;
        }
        else {
          return t;
        }
      })
    }
    case 'deleted': {
      return tasks.filter(t => t.id !== action.id);
    }
    default: {
      throw new Error('Unknown action: ' + action.type)
    }
  }
}

const initialTasks = [
  { id: 0, text: 'Todo 1', done: true },
  { id: 1, text: 'Todo 2', done: false },
  { id: 2, text: 'Todo 3', done: false },
]

let nextId = 3;

function AddTask() {
  const [text, setText] = useState('');
  const dispatch = useTasksDispatch();

  return (
    <>
      <input
        placeholder="Add task"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={() => {
        setText('')
        dispatch({
          type: 'added',
          id: nextId++,
          text: text
        })
      }}>
        Add
      </button>
    </>
  )
}

function TaskList() {
  const tasks = useTasks();
  return (
    <ul>
      {tasks.map(task => (
        <li key={task.id}>
          <Task task={task} />
        </li>
      ))}
    </ul>
  )
}

export function Task({ task }) {
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useTasksDispatch();
  let taskContent;

  if (isEditing) {
    taskContent = (
      <>
        <input
          value={task.text}
          onChange={e => {
            dispatch({
              type: 'changed',
              task: {
                ...task,
                text: e.target.value
              }
            })
          }}
        />

        <button onClick={() => setIsEditing(false)}>Save</button>
      </>
    )
  }
  else {
    taskContent = (
      <>
        {task.text}
        <button onClick={() => setIsEditing(true)}>
          Edit
        </button>
      </>
    )
  }

  return (
    <label>
      <input
        type="checkbox"
        checked={task.done}
        onChange={(e) => {
          dispatch({
            type: 'changed',
            task: {
              ...task,
              done: e.target.checked
            }
          })
        }}
      />
      {taskContent}
      <button onClick={() => {
        dispatch({
          type: 'deleted',
          id: task.id
        })
      }}>
        Delete
      </button>
    </label>
  )
}

export default function UseContext() {
  return (
    <TasksProvider>
      <h1>Todo List</h1>
      <AddTask />
      <TaskList />
    </TasksProvider>
  )
}