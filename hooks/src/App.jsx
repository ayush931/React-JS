import AddToCartOne from "./hooks/useActionState/addToCart/AddToCartFirst";
import FirstUseActionHook from "./hooks/useActionState/First";
import OptimizedFirst from "./hooks/useActionState/OptimizedFirst";

function App() {
  return (
    <div>
      <FirstUseActionHook />
      <OptimizedFirst />
      <AddToCartOne />
    </div>
  );
}

export default App;
