const categories = [
  "Dresses",
  "Sarees",
  "Kurtis",
  "Tops",
  "Jeans",
  "Handbags",
  "Footwear",
  "Beauty",
];

function Categories() {
  return (
    <div className="py-16 bg-white">
      <h2
        className="text-4xl text-center font-bold mb-12"
        style={{
          fontFamily: "Playfair Display",
        }}
      >
        Shop By Category
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {categories.map((item) => (
          <div
            key={item}
            className="bg-[#F8F4EC] rounded-2xl p-10 text-center shadow hover:shadow-xl hover:-translate-y-2 transition cursor-pointer"
          >
            <h3 className="font-semibold text-xl">
              {item}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Categories;