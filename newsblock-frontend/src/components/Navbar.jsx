import NewsHook from "../Context/NewsContext";
import newsLogo from "../assets/newslogo2.png";
function Navbar() {
  const { theme } = NewsHook();

  return (
    <div>
      <nav>
        <ul
          className={` py-4 px-3 flex justify-between ${
            theme === "dark" ? "bg-[#242526]" : "bg-blue-700"
          } `}
        >
          <li className="text-2xl font-serif text-white">NewsBlock</li>
          <li className="text-2xl ">
            <img
              className="w-[95px] absolute top-[-10px] right-[10px]"
              src={newsLogo}
              alt="NewsBlock Logo"
            />
          </li>
        </ul>
      </nav>
    </div>
  );
}
export default Navbar;
