// app/admin/layout.tsx
import React from 'react';
import { ToastContainer } from 'react-toastify';                  
import 'react-toastify/dist/ReactToastify.css';
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
    <ToastContainer />
      <div className="flex flex-col min-h-screen">
        <header className="p-4 sticky top-0">
          <h1 className="text-3xl font-bold">Admin Panel</h1>
        </header>
        <main className="flex-1">{children}</main>
      </div >
    </>
  );
}
