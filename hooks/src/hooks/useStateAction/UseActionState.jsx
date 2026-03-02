import { startTransition, useActionState, useOptimistic } from "react";

/**
 * startTransition tells React:
 * “Hey… this update is NOT urgent.
 * If something more important happens (like typing), handle that first.”
 * It marks a state update as low priority.
 */

/**
 * Use startTransition when:
 * Updating large lists
 * Filtering / sorting big datasets
 * Triggering heavy UI updates
 * Navigations that cause big renders
 * Expensive state changes
 */

/**
 * useOptimistic lets you update the UI immediately before the server confirms the change.
 * In simple words:
 * “Pretend the server succeeded… update UI now.”
 */


// If you’re calling dispatchAction manually (not through an Action prop), make sure you wrap the call in startTransition

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'INR',
  minimumFractionDigits: 0
})

function Total({ quantity, isPending }) {
  return (
    <div className="row total">
      <span>Total: </span>
      <span>{isPending ? 'Calcuating fare...' : formatter.format(quantity * 200)}</span>
    </div>
  )
}

  async function addToCart(count) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return count + 1;
  }

  async function removeFromCart(count) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return Math.max(0, count - 1);
  }

function UseActionState() {
  const [count, actionPayload, isPending] = useActionState(updateActionState, 0);
  const [optimisticCount, setOptimisticCount] = useOptimistic(count);

  function handleAdd() {
    startTransition(() => {
      setOptimisticCount(c => c + 1);
      actionPayload({ type: 'ADD' })
    })
  }

  function handleRemove() {
    startTransition(() => {
      setOptimisticCount(c => c - 1);
      actionPayload({ type: 'REMOVE' })
    })
  }
  return (
    <div>
      <div>Booking</div>
      <div>
        <span>Book the ticket</span> {" "}
        <span>Quantity: {optimisticCount}</span>
      </div>
      <div>
        <button onClick={handleAdd}>Add ticket</button> {" "}
        <button onClick={handleRemove}>Remove ticket</button>
        <div>
          {isPending ? 'Loading...' : ''}
        </div>
      </div>
      <div>
        <Total quantity={optimisticCount} isPending={isPending} />
      </div>
    </div>
  )
}

async function updateActionState(prevCount, actionPayload) {
  switch (actionPayload.type) {
    case 'ADD':
      return await addToCart(prevCount);
    case 'REMOVE':
      return await removeFromCart(prevCount);
  }
}

export default UseActionState;