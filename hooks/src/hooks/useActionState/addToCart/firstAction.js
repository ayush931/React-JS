'use server';

export async function addToCart(prevData, queryData) {
  const itemId = queryData.get('itemId');

  if (itemId === "1") {
    return "Added to cart"
  }
  else {
    await new Promise(resolve => {
      setTimeout(resolve, 2000);
    });

    return "Could add the product: Item already sold"
  }
}
