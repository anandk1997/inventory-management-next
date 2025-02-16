"use client";

import { store } from "@/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { ReactNode, useState } from "react";
import { Provider } from "react-redux";

export const Providers = ({ children }: { children: ReactNode }) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </Provider>
  );
};
