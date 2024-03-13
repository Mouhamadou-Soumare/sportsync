import { Link } from 'react-router-dom';
import useGetAllNews from "../hooks/useGetAllNews";

export default function NewsList() {
    const { news, loading, error } = useGetAllNews();
    if (loading) {
      return <div>Loading...</div>;
    }
  
    if (error) {
      return <div>Error: {error.message}</div>;
    }
  
    return (
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Les actus du moments</h2>
            <p className="mt-2 text-lg leading-8 text-gray-600">
              Passionnés, restez synchronisés avec l'univers du Football grâce à SyncSport
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {news.map((post, index) => (
              <article key={index} className="flex flex-col items-start justify-between">
                <div className="relative w-full">
                  <img
                    src={post.image}
                    alt=""
                    className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-contain sm:aspect-[2/1] lg:aspect-[3/2]"
                  />
                  <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
                </div>
                <div className="max-w-xl">
                  <div className="mt-8 flex items-center gap-x-4 text-xs">
                    <time dateTime={post.date} className="text-gray-500">
                      {post.date}
                    </time>
                    <a
                      href={post.categoryHref}
                      className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                    >
                      {post.categoryTitle}
                    </a>
                  </div>
                  <div className="group relative flex flex-col">
                    <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                      <a href={post.href}>
                        <span className=" inset-0" />
                        {post.title}
                      </a>
                    </h3>
                    <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{post.content}</p>
                    <Link className="bg-green-950 p-1 rounded-lg font-bold mt-4 text-white text-center text-bold" to={`/news/${index}`}>Voir les détails</Link>

                  </div>
                  <div className="relative mt-8 flex items-center gap-x-4">
                  <span className="inline-block h-6 w-6 overflow-hidden rounded-full bg-gray-100">
          <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        </span>                  <div className="text-sm leading-6">
                      <p className="font-semibold text-gray-900">
                        
                          <span className="absolute inset-0" />
                          {post.author}
                   
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    );
  }
  