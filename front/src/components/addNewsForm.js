import React, { useState } from 'react';
import axios from 'axios';
import {  useHistory } from 'react-router-dom';

function AddNewsForm() {
  const history = useHistory();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: '',
    date: ''
  });
  const [file, setFile] = useState()

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formDataWithImage = new FormData(); 
    formDataWithImage.append('file', file);
    formDataWithImage.append('title', formData.title);
    formDataWithImage.append('content', formData.content);
    formDataWithImage.append('author', formData.author);
    axios.post(`https://sportsyncserver-git-main-mouhamadousoumares-projects.vercel.app/news/add-news`, formDataWithImage)
      .then(response => {
        console.log('News updated successfully:', response.data);
        history.push(`/allnews`);
      })
      .catch(error => {
        console.error('Error updating news:', error);
      });
  };

  return (
    <div className="bg-white py-24 sm:py-48">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="space-y-10 divide-y divide-gray-900/10">
          <div className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-3">
            <div className="px-4 sm:px-0">
              <h2 className="text-base font-semibold leading-7 text-gray-900">Ajouter</h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Ajouter un nouvel article
              </p>
            </div>

            <form onSubmit={handleSubmit} enctype="multipart/form-data"  method="POST"  className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
              <div className="px-4 py-6 sm:p-8">
                <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-4">
                    <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                      Titre
                    </label>
                    <input
                      type="text"
                      name="title"
                      id="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className="block w-full border-2 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>

                  <div className="col-span-full">
                    <label htmlFor="content" className="block text-sm font-medium leading-6 text-gray-900">
                      Contenu
                    </label>
                    <textarea
                      id="content"
                      name="content"
                      rows={3}
                      value={formData.content}
                      onChange={handleInputChange}
                      className="block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      required
                    />
                  </div>

                  <div className="col-span-full">
                    <label htmlFor="author" className="block text-sm font-medium leading-6 text-gray-900">
                      Auteur
                    </label>
                    <input
                      type="text"
                      name="author"
                      id="author"
                      value={formData.author}
                      onChange={handleInputChange}
                      className="block w-full border-2 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      required
                   />
                  </div>
                  <div className="col-span-full">

                  <div className="flex items-center justify-center w-full">
    <label htmlFor="image" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
            {file ? (
                <img src={URL.createObjectURL(file)} alt="Selected" className="w-3/4	h-3/4 rounded-999" />
            ) : (
              <div>
                <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                </svg>
                 <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                 <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
            </div>
            )}
           
        </div>
        <input
            type="file"
            id="image"
            name="image"
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
            required
        />
    </label>
    </div>
</div>

                 
                </div>
              </div>
              <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
                <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Add News
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddNewsForm;
