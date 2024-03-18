import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

function ContactForm() {
  const history = useHistory();
  const [formData, setFormData] = useState({
    from: '',
    to: 'choeurtis.tchounga@eemi.com',
    subject: '',
    html: ''
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`http://localhost:3000/contact`, formData)
      .then(response => {
        console.log('Contact send:', response.data);
        history.push(`/`);
      })
      .catch(error => {
        console.error('Error contact:', error);
      });
  };

  return (
    <div className="bg-white py-24 sm:py-48">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="space-y-10 divide-y divide-gray-900/10">
          <div className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-3">
            <div className="px-4 sm:px-0">
              <h2 className="text-base font-semibold leading-7 text-gray-900">Nous contacter</h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                vous voulez nous contacter ?
              </p>
            </div>

            <form onSubmit={handleSubmit} className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
              <div className="px-4 py-6 sm:p-8">
                <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-4">
                    <label htmlFor="from" className="block text-sm font-medium leading-6 text-gray-900">
                      mail
                    </label>
                    <input
                      type="email"
                      name="from"
                      id="from"
                      value={formData.title}
                      onChange={handleInputChange}
                      className="block w-full border-2 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>

                  <div className="col-span-full">
                    <label htmlFor="subject" className="block text-sm font-medium leading-6 text-gray-900">
                    subject
                    </label>
                    <input
                      type="subject"
                      name="subject"
                      id="subject"
                      value={formData.author}
                      onChange={handleInputChange}
                      className="block w-full border-2 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      required
                   />
                  </div>

                  <div className="col-span-full">
                    <label htmlFor="html" className="block text-sm font-medium leading-6 text-gray-900">
                    message
                    </label>
                    <textarea
                      id="html"
                      name="html"
                      rows={3}
                      value={formData.html}
                      onChange={handleInputChange}
                      className="block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
                <button
                  type="submit"
                  className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Envoyer
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactForm;
