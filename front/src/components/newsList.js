import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useGetAllNews from "../hooks/useGetAllNews";

export default function NewsList() {
  const { news, loading, error } = useGetAllNews();
  const [sortByDate, setSortByDate] = useState('desc');
  const [searchTerm, setSearchTerm] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const toggleSort = () => {
    setSortByDate(sortByDate === 'desc' ? 'asc' : 'desc');
  };

  const sortedNews = [...news].sort((a, b) => {
    if (sortByDate === 'asc') {
      return new Date(a.date) - new Date(b.date);
    } else {
      return new Date(b.date) - new Date(a.date);
    }
  });

  const filteredNews = sortedNews.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );


  // Pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredNews.slice(indexOfFirstPost, indexOfLastPost);

  // Changer de page
  const paginate = pageNumber => setCurrentPage(pageNumber);
  
  return (
    <div className="bg-white py-24 sm:py-2">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 mt-12">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Les actus du moments</h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Passionnés, restez synchronisés avec l'univers du Football grâce à SyncSport
          </p>
        </div>
        <div className="flex lg:flex-row md:flex-row flex-col text-center mt-8 gap-4">
          <input
            type="text"
            placeholder="Rechercher par titre..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full h-16 border-2 border-gray-300 rounded-md focus:ring-gray-500 focus:border-gray-500"
          />

          <button
            className="bg-gray-900 text-white px-4 py-2 rounded-md"
            onClick={toggleSort}
          >
            {sortByDate === 'desc' ? 'Voir les plus récents' : 'Voir les plus anciens'}
          </button>
        </div>

        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {currentPosts.map((post, index) => (
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
                  <Link className="bg-green-700 hover:bg-green-900 p-1 rounded-lg font-bold mt-4 text-white text-center text-bold" to={`/news/${index}`}>Voir les détails</Link>

                </div>
                <div className="relative mt-8 flex items-center gap-x-4">
                <span className="inline-block h-6 w-6 overflow-hidden rounded-full bg-gray-100">
                  <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </span>                  
                  <div className="text-sm leading-6">
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

        <div className="flex justify-center mt-8">
          {Array.from({ length: Math.ceil(filteredNews.length / postsPerPage) }, (_, i) => (
            <button
              key={i}
              onClick={() => paginate(i + 1)}
              className={`bg-gray-900 text-white px-4 py-2 rounded-md mr-2 ${
                currentPage === i + 1 && 'bg-gray-700'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>

      </div>
    </div>
  );
}
