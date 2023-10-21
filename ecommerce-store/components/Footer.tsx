import React from 'react';

export default function Footer() {

  const date = new Date();

  return (
    <footer className="bg-white border-t">
      <div className="mx-auto py-10">
        <p className="text-center text-xs text-black">
          &copy; {date.getFullYear()} StoreName. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
