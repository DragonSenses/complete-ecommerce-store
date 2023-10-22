import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

// Define type and shape of props
interface MainNavProps {
  data: any
}

const MainNav: React.FC<MainNavProps> = ({
  data
}) => {
  // Hook that reads current URL pathname from a client component
  // URL pathname comes after domain name and before query string
  const pathname = usePathname();

  // Map the data to usable route objects
  const routes = data.map((route) => ({
    href: `/category/${route.id}`,
    label: route.name,
    active: pathname === `/category/${route.id}`
  }));


  return (
    <nav
      className="mx-6 flex items-center space-x-4 lg:space-x-6"
    >
      {routes.map((route) => {
        <Link
          key={route.href}
          href={route.href}
          className={}
        >
          {route.label}
        </Link>
      })}
    </nav>
  )
}

export default MainNav