import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import { getUserEmail } from "../utils/auth";

function Cart() {

  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchCart();
  }, []);

  
  const fetchCart = async () => {
    try {
      const email = getUserEmail();

      const cartRes = await axios.get(
        `http://localhost:5234/api/Cart/${email}`
      );

      const cartItems = cartRes.data;

      let grandTotal = 0;

      const itemsWithProducts = await Promise.all(
        cartItems.map(async (item) => {
          const productRes = await axios.get(
            `http://localhost:5234/api/Product/${item.productId}`
          );

          grandTotal +=
            productRes.data.price * item.quantity;

          return {
            ...item,
            product: productRes.data
          };
        })
      );

      setItems(itemsWithProducts);
      setTotal(grandTotal);
    } catch (err) {
      console.log(err);
    }
  };

  const removeFromCart = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5234/api/Cart/${id}`
      );

      await fetchCart();

      alert("Item Removed Successfully");
    } catch (err) {
      console.log(err);
    }
  };

  const placeOrder = async () => {
  try {
    // Check whether the user has saved any address
    const addressRes = await axios.get(
      `http://localhost:5234/api/Address/${getUserEmail()}`
    );

    if (addressRes.data.length === 0) {
      alert("Please add your delivery address before placing an order.");
      window.location.href = "/profile";
      return;
    }

    localStorage.setItem("totalAmount", total);
    localStorage.setItem("userEmail", getUserEmail());

    navigate("/payment");
  } catch (err) {
    console.log(err);
    alert("Something went wrong");
  }
};

    

   

  const moveToWishlist = async (item) => {
  try {
    await axios.post(
      "http://localhost:5234/api/Wishlist/add",
      {
        userEmail: getUserEmail(),
        productId: item.productId
      }
    );

    await removeFromCart(item.id);

    alert("Moved To Wishlist ❤️");
  } catch (err) {
    console.log(err);
  }
};

  return (
    <>
      <Navbar />

      <div className="bg-gray-100 min-h-screen p-6">
        <h1 className="text-4xl font-bold mb-6">
          Shopping Cart 🛒
        </h1>

        {items.length === 0 ? (
          <div className="bg-white p-10 rounded-xl shadow text-center">
            <h2 className="text-2xl font-bold">
              Your Cart is Empty 😔
            </h2>

            <p className="text-gray-500 mt-3">
              Add some products and come back.
            </p>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-6">

            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">

              {items.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl shadow p-5 flex gap-5"
                >
                  <img
  src={item.product.imageUrl}
  alt={item.product.name}
  className="w-36 h-36 object-cover rounded-lg"
/>

                  <div className="flex-1">
                    <h3 className="text-2xl font-bold">
                      {item.product.name}
                    </h3>
                  <p className="text-gray-500">
  {item.product.brand}
</p>

<div className="mt-2">
  <span className="bg-green-600 text-white px-2 py-1 rounded text-sm">
    ⭐ {item.product.rating || 4.5}
  </span>
</div>

                    <p className="text-gray-600 mt-2">
                      {item.product.description}
                    </p>

                    <p className="text-green-600 text-2xl font-bold mt-3">
                      ₹{item.product.price}
                    </p>

                    <div className="mt-3 inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
  Qty: {item.quantity}
</div>

                    <p className="font-semibold mt-2">
                      Subtotal: ₹
                      {item.product.price *
                        item.quantity}
                    </p>

                    <button
                      onClick={() =>
                        removeFromCart(item.id)
                      }
                      className="mt-4 bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600"
                    >
                      Remove
                    </button>


                    <button
  onClick={() =>
    moveToWishlist(item)
  }
  className="ml-3 bg-pink-500 text-white px-5 py-2 rounded-lg"
>
  ❤️ Move To Wishlist
</button>
                  </div>
                </div>
              ))}

            </div>

            {/* Order Summary */}
            <div>
              <div className="bg-white rounded-xl shadow p-6 sticky top-5">
                <h2 className="text-2xl font-bold mb-4">
                  Order Summary
                </h2>

                <div className="flex justify-between mb-3">
  <span>Products</span>
  <span>{items.length}</span>
</div>

<div className="flex justify-between mb-3">
  <span>Discount</span>
  <span className="text-green-600">
    -₹500
  </span>
</div>

<div className="flex justify-between mb-3">
  <span>Delivery</span>
  <span className="text-green-600">
    FREE
  </span>
</div>

                <div className="flex justify-between mb-3">
                  <span>Delivery</span>
                  <span className="text-green-600">
                    FREE
                  </span>
                </div>

                <hr className="my-4" />

                <div className="flex justify-between text-2xl font-bold">
                  <span>Total</span>
                  <span>₹{total}</span>
                </div>

                <div className="bg-green-100 text-green-700 p-3 rounded-lg text-center font-medium">
  🔒 100% Secure Checkout
</div>

                <button
                  onClick={placeOrder}
                  className="w-full mt-6 bg-green-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-green-700"
                >
                  Place Order
                </button>
              </div>
            </div>

          </div>
        )}
      </div>
    </>
  );
}

export default Cart;