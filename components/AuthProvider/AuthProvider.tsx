"use client";

import { checkSession, getMe } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import { useEffect } from "react";

type Props = {
  children: React.ReactNode;
};

// const AuthProvider = ({ children }: Props) => {
//   const setUser = useAuthStore((state) => state.setUser);
//   const clearIsAuthenticated = useAuthStore(
//     (state) => state.clearIsAuthenticated
//   );

//   useEffect(() => {
//       const fetchUser = async () => {
//         const isAuthenticated = await checkSession();
//         if (isAuthenticated) {
//           const user = await getMe();
//           if (user) setUser(user);
//         } else {
//           clearIsAuthenticated();
//         }
//       };
//       fetchUser();
//     }, [setUser, clearIsAuthenticated]);

//   return children;
// };

// export default AuthProvider;
const AuthProvider = ({ children }: Props) => {
  const setUser = useAuthStore((state) => state.setUser);
  const clearIsAuthenticated = useAuthStore(
    (state) => state.clearIsAuthenticated
  );

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const session = await checkSession();

        if (session.success) {
          if (session.user) {
            setUser({
              username: session.user.username,
              email: session.user.email || "",
              avatar: "",
            });
          } else {
            const user = await getMe();
            if (user) setUser(user);
          }
        } else {
          clearIsAuthenticated();
        }
      } catch (error) {
        console.error("AuthProvider error:", error);
        clearIsAuthenticated();
      }
    };

    fetchUser();
  }, [setUser, clearIsAuthenticated]);

  return children;
};

export default AuthProvider;
