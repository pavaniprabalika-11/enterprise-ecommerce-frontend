import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { getUserEmail } from "../utils/auth";

function Wishlist() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchWishlist();
  }, []);

  

  const fetchWishlist = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5234/api/Wishlist/${getUserEmail()}`
      );

      const wishlistItems = res.data;

      const itemsWithProducts = await Promise.all(
        wishlistItems.map(async (item) => {
          const productRes = await axios.get(
            `http://localhost:5234/api/Product/${item.productId}`
          );

          return {
            ...item,
            product: productRes.data,
          };
        })
      );

      setItems(itemsWithProducts);
    } catch (err) {
      console.log(err);
    }
  };

  const removeWishlist = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5234/api/Wishlist/${id}`
      );

      fetchWishlist();

      alert("Removed From Wishlist");
    } catch (err) {
      console.log(err);
    }
  };

  const addToCart = async (productId) => {
    try {
      await axios.post(
        "http://localhost:5234/api/Cart/add",
        {
          userEmail: getUserEmail(),
          productId,
          quantity: 1,
        }
      );

      alert("Added To Cart 🛒");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Navbar />

      <div className="bg-gray-100 min-h-screen p-6">
        <h1 className="text-4xl font-bold mb-6">
          ❤️ My Wishlist
        </h1>

        {items.length === 0 ? (
          <div className="bg-white p-10 rounded-xl shadow text-center">
            <h2 className="text-2xl font-bold">
              Wishlist is Empty 😔
            </h2>

            <p className="text-gray-500 mt-3">
              Add products to your wishlist.
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow-lg p-5 flex gap-5"
              >
                <img
  src={item.product.imageUrl}
  alt={item.product.name}
  className="w-36 h-36 object-cover rounded-lg"
/>

                <div className="flex-1">
                  <h2 className="text-2xl font-bold">
                    {item.product.name}
                  </h2>

                  <p className="text-gray-600 mt-2">
                    {item.product.description}
                  </p>

                  <p className="text-green-600 text-2xl font-bold mt-3">
                    ₹{item.product.price}
                  </p>

                  <div className="mt-4 flex gap-3">
                    <button
                      onClick={() =>
                        addToCart(
                          item.product.id
                        )
                      }
                      className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
                    >
                      Add To Cart
                    </button>

                    <button
                      onClick={() =>
                        removeWishlist(item.id)
                      }
                      className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Wishlist;