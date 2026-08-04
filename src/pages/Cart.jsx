import { Link } from "react-router-dom";
const Cart = ({ cart, setCart }) => {
  const increaseQuantity = (id) => {
    const updatedCart = cart.map((item) =>
      item.id === id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );

    setCart(updatedCart);
  };

  const decreaseQuantity = (id) => {
    const updatedCart = cart
      .map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0);

    setCart(updatedCart);
  };
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-8">
        🛒 My Cart
      </h1>
      {cart.length === 0 ? (
        <p className="text-center text-gray-500">
          Your cart is empty.
        </p>
      ) : (
        <>
          {cart.map((food) => (
            <div
              key={food.id}
              className="border rounded-lg p-4 mb-4 flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <img
                  src={food.image}
                  alt={food.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />

                <div>
                  <h2 className="text-xl font-bold">
                    {food.name}
                  </h2>

                  <p className="text-gray-500">
                    ₦{food.price * food.quantity}
                  </p>

                  <div className="flex items-center gap-4 mt-3">
                    <button
                      onClick={() => decreaseQuantity(food.id)}
                      className="bg-red-600 text-white w-8 h-8 rounded"
                    >
                      -
                    </button>

                    <span className="font-bold text-lg">
                      {food.quantity}
                    </span>

                    <button
                      onClick={() => increaseQuantity(food.id)}
                      className="bg-green-600 text-white w-8 h-8 rounded"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className="mt-8 border-t pt-6">
            <h2 className="text-3xl font-bold">
              Grand Total: ₦{totalPrice.toLocaleString()}
            </h2>
          </div>
          <div className="mt-6">
            <Link
              to="/checkout"
              className="block w-full bg-green-600 hover:bg-green-700 text-white text-center py-3 rounded-lg text-xl font-bold"
            >
              Proceed to Checkout
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;