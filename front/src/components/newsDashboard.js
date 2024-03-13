import React, { useState } from 'react';
import { Link } from "react-router-dom";
import useGetAllNews from '../hooks/useGetAllNews';
import useDeleteNews from '../hooks/useDeleteNews';

function NewsDashboard() {
  const { news, loading, error, refetch } = useGetAllNews();
  const { deleteNews, loading: deleteLoading, error: deleteError } = useDeleteNews();

  const handleDelete = async (id) => {
    await deleteNews(id);
    refetch();
  };

 

  if (loading || deleteLoading) {
    return <div>Loading...</div>;
  }

  if (error || deleteError) {
    return <div>Error: {error ? error.message : deleteError.message}</div>;
  }

  return (
    <div className="bg-white py-24 sm:py-48">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-gray-900">Actualités</h1>
            <p className="mt-2 text-sm text-gray-700">
              Liste de toutes les actualités avec la possibilité de les modifier ou de les supprimer.
            </p>
          </div>
          <Link to={`/add-news`}
            className="text-white mr-3 bg-green-950 p-3 rounded-lg font-bold">
              Ajouter une Actu
          </Link>
        </div>
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle">
              <table className="min-w-full border-separate border-spacing-0">
                <thead>
                  <tr>
                    <th className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8">
                      Titre
                    </th>
                    <th className="sticky top-0 z-10 hidden border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:table-cell">
                      Auteur
                    </th>
                    <th className="sticky top-0 z-10 hidden border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter lg:table-cell">
                      Date de Publication
                    </th>
                    <th className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {news.map((item) => (
                    <tr key={item.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8">
                        {item.title}
                      </td>
                      <td className="whitespace-nowrap hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                        {item.author}
                      </td>
                      <td className="whitespace-nowrap hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
                        {item.date}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <Link to={`/modif-actus/${item.id}`}>Modifier</Link>

                        <span className="mx-2">|</span>
                        <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-900">Supprimer</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default NewsDashboard;
