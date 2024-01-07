import NewsHook from "../Context/NewsContext";

function Footer() {
  const { theme } = NewsHook();
  return (
    <div
      className={` text-xl px-4 py-3 text-center ${
        theme === "dark" ? "text-white bg-gray-900" : "text-black "
      } `}
    >
      <h2> 2024 NewsBlock </h2>
    </div>
  );
}

export default Footer;
