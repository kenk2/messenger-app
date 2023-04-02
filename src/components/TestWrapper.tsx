/* eslint-disable no-console */
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";

type ITestWrapper = {
  children: React.ReactNode;
};

export default function TestWrapper(props: ITestWrapper) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  const { children } = props;
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
