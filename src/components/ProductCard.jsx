export default function ProductCard() {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-xl transition">
      <img
        src="https://via.placeholder.com/250"
        alt="product"
        className="w-full rounded-md"
      />

      <h2 className="text-lg font-semibold mt-3">
        Product Name
      </h2>

      <p className="text-green-600 font-bold mt-2">
        ₹999
      </p>

      <button className="mt-3 bg-blue-600 text-white px-4 py-2 rounded">
        Add to Cart
      </button>
    </div>
  );
}