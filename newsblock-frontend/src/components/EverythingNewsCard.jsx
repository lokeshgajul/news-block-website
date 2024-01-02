import NewsHook from "../Context/NewsContext";
/* eslint-disable react/prop-types */

function EverythingNewsCard({ item }) {
  const { theme } = NewsHook();
  return (
    <div className="flex justify-center items-center">
      <div
        className={`overflow-hidden rounded shadow-md cursor-pointer  ${
          theme === "dark" ? "bg-gray-800" : "bg-gray-200"
        }`}
      >
        <img
          className="rounded w-full h-40 object-cover"
          src={
            !item.urlToImage
              ? "https://images.moneycontrol.com/static-mcnews/2023/07/Feat-9-654x435.jpg"
              : item.urlToImage
          }
          alt="Sunset in the mountains"
        />
        <div className="flex justify-between items-center pt-4 px-3">
          <section>{item.publishedAt.substring(0, 10)}</section>
          <section>
            {item.author == null ? "Unknown" : item.author.substring(0, 25)}
          </section>
        </div>
        <div className="p-3">
          <h1 className="text-darkprimary font-bold">{item.title}</h1>
          <br />
          <section className="line-clamp-4">{item.description} ...more</section>
          <section className="m-2 flex justify-end">
            <a
              href={item.url}
              target="_blank"
              className="inline-flex justify-end items-end right-1 font-bold hover:border-b-2 hover:border-green-500 text-green-500"
              rel="noreferrer"
            >
              Full Article
            </a>
          </section>
        </div>
      </div>
    </div>
  );
}

export default EverythingNewsCard;
