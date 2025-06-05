// app/admin/layout.tsx
import React from 'react';
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <header className="p-4 sticky top-0">
          <h1 className="text-3xl font-bold">Admin Panel</h1>
        </header>
        <main className="flex-1">{children}</main>
      </div >
    </>
  );
}
