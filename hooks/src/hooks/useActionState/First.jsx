// useActionState is a Hook that allows you to update state based on the result of a form action.
// useActionState(action, initialState, permalink?)

// it returns a new action that you use in your form, along with the latest form state and whether the Action is still pending. The latest form state is also passed to the function that you provided.

// The form state is the value returned by the action when the form was last submitted. If the form has not yet been submitted, it is the initial state that you pass.
// use only through the form tag.

import { useActionState } from "react";

function increment(prev) {
  return prev + 1
}

function decrement(prev) {
  return prev - 1;
}

function FirstUseActionHook() {
  const [state, formAction] = useActionState(increment, 0);
  const [decState, decFormAction] = useActionState(decrement, 10);

  return (
    <form>
      {state}
      <button formAction={formAction}>increment</button>

      {decState}
      <button formAction={decFormAction}>decrement</button>
    </form>
  )
}

export default FirstUseActionHook;
