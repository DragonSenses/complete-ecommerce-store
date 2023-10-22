import React from 'react';

// Define type and shape of props
interface MainNavProps {
  data: any
}

const MainNav: React.FC<MainNavProps> = ({
  data
}) => {
  return (
    <nav>
      MainNav
    </nav>
  )
}

export default MainNav