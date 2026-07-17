import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

function Payment() {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("UPI");

  const totalAmount = localStorage.getItem("totalAmount") || 0;

  const handlePayment = async () => {
  try {
    const email = localStorage.getItem("userEmail");
    const totalAmount = Number(localStorage.getItem("totalAmount"));

    // Place Order
    await axios.post(
      "https://enterprise-ecommerce-backend.onrender.com/api/Order/place",
      {
        userEmail: email,
        totalAmount: totalAmount,
        status: "Pending",
      }
    );

    // Clear Cart
    await axios.delete(
      `https://enterprise-ecommerce-backend.onrender.com/api/Cart/user/${email}`
    );

    alert(`Payment Successful using ${paymentMethod} ✅`);

    // Clear temporary storage
    localStorage.removeItem("totalAmount");
    localStorage.removeItem("userEmail");

    navigate("/orders");
  } catch (err) {
    console.log(err);
    alert("Payment Failed");
  }
};
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-b from-blue-50 via-purple-50 to-pink-50 flex justify-center items-center p-6">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">

          <h1 className="text-3xl font-bold text-center mb-6">
            💳 Checkout
          </h1>

          <div className="bg-gray-100 rounded-xl p-4 mb-6">
            <p className="text-gray-500">Total Amount</p>

            <h2 className="text-3xl font-bold text-green-600">
              ₹{totalAmount}
            </h2>
          </div>

          <h3 className="font-semibold mb-4">
            Select Payment Method
          </h3>

          <div className="space-y-4">

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                value="UPI"
                checked={paymentMethod === "UPI"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              📱 UPI
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                value="Card"
                checked={paymentMethod === "Card"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              💳 Credit / Debit Card
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                value="Cash On Delivery"
                checked={paymentMethod === "Cash On Delivery"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              💵 Cash On Delivery
            </label>

          </div>

          <button
            onClick={handlePayment}
            className="w-full mt-8 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-bold"
          >
            Confirm Payment ✅
          </button>

        </div>
      </div>
    </>
  );
}

export default Payment;
