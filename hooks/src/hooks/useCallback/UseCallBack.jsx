/**
 * useCallback is a React Hook that lets you cache a function definition between re-renders.
 * const cachedFn = useCallback(fn, dependencies)
 */

/**
 * Returns:-
 * On the initial render, useCallback returns the fn function you have passed.
 * During subsequent renders, it will either return an already stored fn function from the last render (if the dependencies haven’t changed), or return the fn function you have passed during this render.
 */

// Skipping re-rendering of components 

// Skipping re-rendering with useCallback and memo

/**
 * Make sure you’ve specified the dependency array as a second argument
 * If you forget the dependency array, useCallback will return a new function every time
 * 
 *  you can’t call useCallback in a loop
 * Instead, extract a component for an individual item, and put useCallback there
 */

import { memo, useCallback, useState } from "react";

const ShippingForm = memo(function ShippingForm({ onSubmit }) {

  const [count, setCount] = useState(1);

  // Emulate slow render in effect, not during render
  console.log('[ARTIFICIALLY SLOW] Rendering <ShippingForm />');
  let startTime = new Date()
  while (new Date() - startTime < 500) {
    // Do nothing for 500 ms to emulate extremely slow code
  }

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const orderDetails = {
      ...Object.fromEntries(formData),
      count
    };
    onSubmit(orderDetails);
  }

  return (
    <form onSubmit={handleSubmit}>
      <p><b>Note: <code>ShippingForm</code> is artificially slowed down!</b></p>
      <label>
        Number of items:
        <button type="button" onClick={() => setCount(count + 1)}>Add</button>
        {" "} {count} {" "}
        <button type="button" onClick={() => setCount(count - 1)}>Remove</button>
      </label>
      <label>
        Street:
        <input name="street" />
      </label>
      <label>
        City:
        <input name="city" />
      </label>
      <label>
        Postal code:
        <input name="zipCode" />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
});

function ProductPage({ productId, referrer, theme }) {
  const handleSubmit = useCallback(async (orderDetails) => {
    post('/product' + productId + '/buy', {
      referrer,
      orderDetails
    })
  }, [referrer, productId])

  return (
    <div className={theme}>
      <ShippingForm onSubmit={handleSubmit} />
    </div>
  )
}

export default function UseCallback() {
  const [isDark, setIsDark] = useState(false);
  const pageStyle = {
    backgroundColor: isDark ? "#18181b" : "#fafafa",
    color: isDark ? "#fafafa" : "#18181b",
    minHeight: "100vh",
    padding: "1rem"
  };
  return (
    <div style={pageStyle}>
      <label>
        <input type="checkbox" checked={isDark} onChange={(e) => setIsDark(e.target.checked)} />
        Dark Mode
      </label>
      <hr />
      <ProductPage productId={123} theme={isDark ? 'dark' : 'light'} referrer={'wizard_of_oz'} />
    </div>
  )

}

function post(url, data) {
  console.log('POST' + url);
  console.log(data);
}