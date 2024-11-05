import { AppProps } from "next/app";
import { AuthProvider } from "@/context/AuthContext";
import { FavoritesProvider } from "@/context/FavoritesContext";
import { BooksProvider } from "@/context/BooksContext";
import { withTRPC } from "@trpc/next";
import { AppRouter } from "@/server/appRouter";
import { httpBatchLink } from "@trpc/client";
import superjson from "superjson";
import "../app/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <FavoritesProvider>
        <BooksProvider>
          <Component {...pageProps} />
        </BooksProvider>
      </FavoritesProvider>
    </AuthProvider>
  );
}

export default withTRPC<AppRouter>({
  config() {
    return {
      links: [
        httpBatchLink({
          url: "/api/trpc",
        }),
      ],
      transformer: superjson,
    };
  },
  ssr: false,
})(MyApp);
