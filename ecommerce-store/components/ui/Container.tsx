import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
}

export default function Container({ children }: ContainerProps): JSX.Element {
  return (
    <div className="mx-auto max-w-7xl">
      {children}
    </div>
  )
}
