/* eslint-disable react/prop-types */

function News({ item }) {
  return (
    <div className="flex justify-center items-center mt-3">
      <div className=" overflow-hidden rounded shadow-md  m-2 cursor-pointer bg-gray-200">
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
            {item.author ? item.author.substring(0, 25) : "Unknown"}
          </section>
        </div>
        <div className="p-3">
          <h1 className="text-darkprimary font-bold">{item.title}</h1>
          <br />
          <section className="">
            {item.description?.substring(0, 89)} ..more
          </section>
          <section className="m-2">
            <a
              href={item.url}
              target="_blank"
              className="bottom-2 right-1 font-bold hover:border-b-2 hover:border-green-500 text-green-500"
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

export default News;
