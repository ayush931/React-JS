import { useActionState } from "react";

function counterState(prevNumber, formData) {
  const type = formData.get('type');

  if (type === 'incr') return prevNumber + 1;
  if (type === 'dec') return prevNumber - 1
}

function OptimizedFirst() {
  const [state, formAction] = useActionState(counterState, 10)
  return (
    <form action={formAction}>
      <h2>{state}</h2>
      <button name="type" value="incr">increase</button>
      <button name="type" value="dec">Decrease</button>
    </form>
  )
}

export default OptimizedFirst;
