// src/layouts/RootClientLayout.tsx
"use client";

import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


const queryClient = new QueryClient();

export default function RootClientLayout({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-screen">
     {/* add nav bar here  */}
                 <div className="flex-1 flex flex-col">

          <main className="flex-1 p-6">{children}</main>
        </div>
      </div>
    </QueryClientProvider>
  );
}
