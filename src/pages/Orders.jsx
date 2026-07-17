import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { getUserEmail } from "../utils/auth";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const getImage = (category) => {
    switch (category) {
      case "Mobiles":
        return "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9";

      case "Laptops":
        return "https://images.unsplash.com/photo-1496181133206-80ce9b88a853";

      case "Shoes":
        return "https://images.unsplash.com/photo-1542291026-7eec264c27ff";

      case "Men":
        return "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f";

      case "Women":
        return "https://images.unsplash.com/photo-1483985988355-763728e1935b";

      case "Beauty":
        return "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9";

      case "Electronics":
        return "https://images.unsplash.com/photo-1505740420928-5e560c06d30e";

      case "Watches":
        return "https://images.unsplash.com/photo-1523275335684-37898b6baf30";

      default:
        return "https://via.placeholder.com/300";
    }
  };

  const fetchOrders = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5234/api/Order/user/${getUserEmail()}`
      );

      setOrders(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const cancelOrder = async (id) => {
  try {
    await axios.put(
      `http://localhost:5234/api/Order/cancel/${id}`
    );

    alert("Order Cancelled ❌");

    fetchOrders();
  } catch (err) {
    console.log(err);
    alert("Failed To Cancel Order");
  }
};

  const buyAgain = async (order) => {
  try {
    for (const item of order.items) {
      await axios.post(
        "http://localhost:5234/api/Cart/add",
        {
          userEmail: getUserEmail(),
          productId: item.productId,
          quantity: item.quantity,
        }
      );
    }

    alert("Products added to Cart ❤️");
    window.location.href = "/cart";
  } catch (err) {
    console.log(err);
    alert("Failed to add products");
  }
};



  return (
    <>
      <Navbar />

      <div className="bg-gradient-to-b from-blue-50 via-purple-50 to-pink-50 min-h-screen p-6">
        <h1 className="text-4xl font-bold mb-8 text-center">
          📦 My Orders
        </h1>

        {orders.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-10 text-center max-w-xl mx-auto">
            <div className="text-7xl mb-4">📦</div>

            <h2 className="text-3xl font-bold">
              No Orders Yet
            </h2>

            <p className="text-gray-500 mt-3">
              Start shopping and place your first order.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition"
              >
                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
                  <div>
                    <h2 className="text-2xl font-bold">
                      Order #{order.id?.slice(-6)}
                    </h2>

                    <p className="text-gray-500 mt-2">
                      Ordered On
                    </p>

                    <p className="font-medium">
                      {new Date(
                        order.orderDate
                      ).toLocaleDateString()}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-500">
                      Total Amount
                    </p>

                    <p className="text-3xl font-bold text-green-600">
                      ₹{order.totalAmount}
                    </p>
                  </div>

                  <div>
                    <span
                      className={`px-4 py-2 rounded-full text-white font-semibold ${
                        order.status?.toLowerCase() === "delivered"
  ? "bg-green-600"
  : order.status?.toLowerCase() === "shipped"
  ? "bg-blue-600"
  : order.status?.toLowerCase() === "cancelled"
  ? "bg-red-600"
  : "bg-yellow-500"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>

                <div className="mt-6 border-t pt-4 flex flex-wrap gap-3">
                  <button
  onClick={() => setSelectedOrder(order)}
  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
>
  Track Order 🚚
</button>

                  

                  <button
  onClick={() => buyAgain(order)}
  className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600"
>
  Buy Again ❤️
</button>

                   {order.status !== "Cancelled" &&
   order.status !== "Delivered" && (
    <button
      onClick={() => cancelOrder(order.id)}
      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
    >
      Cancel Order ❌
    </button>
  )}

  

  
                </div>

                <div className="mt-5 border-t pt-4">
                  <h3 className="font-bold text-lg mb-4">
                    Ordered Items
                  </h3>

                  {order.items?.length > 0 ? (
                    order.items.map((item, index) => (
                      <div
                        key={index}
                        className="flex gap-4 bg-gray-50 p-4 rounded-lg mb-3"
                      >
                        <img
  src={item.imageUrl}
  alt={item.productName}
  className="w-24 h-24 object-cover rounded-lg"
/>

                        <div className="flex-1">
                          <h4 className="font-bold text-lg">
                            {item.productName}
                          </h4>

                          <p className="text-gray-500">
                            Category: {item.category}
                          </p>

                          <p>
                            Quantity: {item.quantity}
                          </p>

                          <p className="font-bold text-green-600 text-lg">
                            ₹{item.price}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500">
                      No item details available for this order.
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedOrder && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div className="bg-white rounded-2xl p-8 w-[400px]">
      <h2 className="text-2xl font-bold mb-6">📦 Order Tracking</h2>

      <div className="space-y-3 text-lg">
        <p>✅ Order Placed</p>

        <p>
          {selectedOrder.status === "Pending"
            ? "🟡 Packed"
            : "✅ Packed"}
        </p>

        <p>
          {selectedOrder.status === "Shipped"
            ? "🚚 Shipped"
            : selectedOrder.status === "Delivered"
            ? "✅ Shipped"
            : "⬜ Shipped"}
        </p>

        <p>
          {selectedOrder.status === "Delivered"
            ? "🏠 Delivered"
            : "⬜ Delivered"}
        </p>
      </div>

      <button
        onClick={() => setSelectedOrder(null)}
        className="mt-6 w-full bg-red-500 text-white py-3 rounded-xl"
      >
        Close
      </button>
    </div>
  </div>
)}
    </>
  );
}

export default Orders;