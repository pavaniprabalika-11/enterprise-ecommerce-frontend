import hero from "../assets/hero.png";

function HeroSection() {
  return (
    <div
      className="h-[650px] bg-cover bg-center flex items-center"
      style={{
        backgroundImage: `url(${hero})`,
      }}
    >
      <div className="bg-black/40 w-full h-full flex items-center">
        <div className="ml-20 text-white max-w-xl">
          <p className="uppercase tracking-[8px] text-lg">
            Ellora Collection
          </p>

          <h1
            className="text-7xl font-bold mt-4"
            style={{
              fontFamily: "Playfair Display",
            }}
          >
            Wear The Glow
          </h1>

          <p className="mt-6 text-xl leading-8">
            Discover timeless elegance with
            handcrafted collections designed
            for every woman.
          </p>

          <button className="mt-8 bg-[#C9A227] hover:bg-black px-8 py-4 rounded-full text-lg font-semibold transition">
            Shop Collection
          </button>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;