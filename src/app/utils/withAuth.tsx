import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";
import {  useEffect } from "react";

export const withAuth = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
  const AuthWrapper: React.FC<P> = (props) => {
    const { isLoggedIn } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!isLoggedIn) {
        router.push("/auth"); 
      }
    }, [isLoggedIn, router]);

    if (!isLoggedIn) {
      return null; 
    }

    return <WrappedComponent {...props} />;
  };

  return AuthWrapper;
};
