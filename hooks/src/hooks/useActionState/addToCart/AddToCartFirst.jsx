import { useActionState } from "react";
import { addToCart } from "./firstAction";

function AddToCartFirst({ itemId, itemTitle }) {
  const [message, formAction, isPending] = useActionState(addToCart, null);
  return (
    <form action={formAction}>
      <h2>{itemTitle}</h2>
      <input type="hidden" name="itemId" value={itemId} />
      <button type="submit">Add to cart</button>
      {isPending ? 'Loading...' : message}
    </form>
  )
}

export default function AddToCartOne() {
  return (
    <>
      <AddToCartFirst itemId={"1"} itemTitle={"JavaScript: The Guide"} />
      <AddToCartFirst itemId={"2"} itemTitle={"JavaScript: The good part"} />
    </>
  )
}
