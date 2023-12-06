'use client'
import { Disclosure } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { usePathname } from 'next/navigation'


const authenticatedNavigationItems = [
  { name: 'Home', href: '/', },
  { name: 'Water Types', href: '/waterTypes'},
  { name: 'Water Refilling Station Information', href: 'water_station'},
];

const notAuthenticatedNavigationItems = [
  { name: 'Home', href: '/', },
  {name: 'Login', href: '/login'},
  {name: 'View all Water Stations', href: '/water-station-list'} ,
];

export default function NavbarComponent({ session} : {session: any}) {
    const pathname = usePathname();

      
  const navigationItems = session ? authenticatedNavigationItems : notAuthenticatedNavigationItems

  console.log(session, "session")

  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
  }

  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                    alt="Your Company"
                  />
                </div>
                   <div className="hidden sm:ml-6 sm:block">
                   <div className="flex space-x-4">
                     {navigationItems.map((item) => (
                       <Link
                         key={item.name}
                         href={item.href}
                         className={
                            item.href === pathname
                              ? 'bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium'
                              : 'text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium'
                          }
                          aria-current={item.href === pathname ? 'page' : undefined}
                       >
                         {item.name}
                       </Link>
                     ))}
                   </div>
                 </div>
              </div>


              {session && 
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  <form action="/auth/signout" method="post">
                      <button type="submit"
                      className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                      >
                        Sign out
                      </button>
                    </form>
                    
                   </div>
              }


              
            
            </div>
          </div>
          

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigationItems.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                    className={classNames(
                    item.href === pathname ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium'
                  )}
                  aria-current={item.href === pathname ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
