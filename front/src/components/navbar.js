import { useState } from 'react'
import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import logo from "../assets/sportSyncLogoBlack1.png"
import Cookies from 'js-cookie';

const navigation = [
  { name: 'Match en direct', href: '#' },
  { name: 'Meilleurs buteurs', href: '#' },
  { name: 'Actualités', href: '/allnews' },
  { name: 'Nous contacter', href: '#' },
]

export default function Navbar (){
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const isAuthenticated = !!Cookies.get('auth_token'); 

    return (
    <header className="absolute inset-x-0 top-0 z-50">
    <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
      <div className="flex lg:flex-1">
        <a href="/" className="-m-1.5 p-1.5">
          <span className="sr-only">Acceuil </span>
          <img
            className="h-16 w-auto"
            src={logo}
            alt=""
          />
        </a>
      </div>
      <div className="flex lg:hidden">
        <button
          type="button"
          className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          onClick={() => setMobileMenuOpen(true)}
        >
          <span className="sr-only">Open main menu</span>
          <Bars3Icon className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
      <div className="hidden lg:flex lg:gap-x-12">
        {navigation.map((item) => (
          <a key={item.name} href={item.href} className="text-sm font-semibold leading-6 text-gray-900">
            {item.name}
          </a>
        ))}
      </div>
      {isAuthenticated ? (
       <div className="hidden lg:flex lg:flex-1 lg:justify-end  items-center	">
        <a href="#" className="text-sm  leading-6 text-white mr-3 bg-green-700 hover:bg-green-900 p-3 rounded-lg font-bold 	">
          Profil Admin
        </a>
        <a href="/gestion-actus" className="text-sm font-semibold leading-6 text-gray-900">
          Gestion des actualités
        </a>
      </div> 
      ): (
       null
      )}
    </nav>
    <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
      <div className="fixed inset-0 z-50" />
      <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
        <div className="flex items-center justify-between">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img
              className="h-8 w-auto"
              src={logo}
              alt=""
            />
          </a>
          <button
            type="button"
            className="-m-2.5 rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(false)}
          >
            <span className="sr-only">Close menu</span>
            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="mt-6 flow-root">
          <div className="-my-6 divide-y divide-gray-500/10">
            <div className="space-y-2 py-6">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  {item.name}
                </a>
              ))}
            </div>
            <div className="py-6">
            {isAuthenticated ? (
                <div className="flex-column lg:flex lg:flex-1 lg:justify-end">
                    <a href="#" className="text-sm  leading-6 text-white mr-3 bg-green-700 hover:bg-green-900 p-3 rounded-lg font-bold	">
                    Profil Admin
                    </a>
                    <a href="/gestion-actus" className="text-sm font-semibold leading-6 text-gray-900">
                    Gestion des actualités
                    </a>
                </div> 
                ): (
                null
                )}
            </div>
          </div>
        </div>
      </Dialog.Panel>
    </Dialog>
  </header>
    );
}