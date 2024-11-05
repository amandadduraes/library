import { createContext, useContext, useState, ReactNode } from "react";
import { useRouter } from "next/router";
import { trpc } from "@/app/utils/trpc";

interface AuthContextProps {
  isLoggedIn: boolean;
  user: { id: number; username: string } | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  register: (username: string, password: string) => Promise<void>;
  errorMessage: string | null; 
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<{ id: number; username: string } | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null); 
  const isLoggedIn = !!user;
  const router = useRouter();

  const loginMutation = trpc.auth.login.useMutation({
    onSuccess: (data) => {
      setUser({ id: data.userId, username: data.username });
      setErrorMessage(null); 
      router.push("/books");
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onError: (error) => {
      setErrorMessage("Usuário ou senha incorretos."); 
    },
  });

  const registerMutation = trpc.auth.register.useMutation({
    onSuccess: (data, variables) => {
      setUser({ id: data.userId, username: variables.username });
      router.push("/books");
    },
  });

  const login = async (username: string, password: string) => {
    try {
      await loginMutation.mutateAsync({ username, password });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
    }
  };

  const register = async (username: string, password: string) => {
    try {
      await registerMutation.mutateAsync({ username, password });
    } catch (error) {
      console.error("Erro ao fazer registro:", error);
    }
  };

  const logout = () => {
    setUser(null);
    router.push("/auth");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout, register, errorMessage }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("Não autenticado!");
  return context;
};
