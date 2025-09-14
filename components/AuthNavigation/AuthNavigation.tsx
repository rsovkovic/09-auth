"use client";

import { useRouter } from "next/navigation";
import css from "./AuthNavigation.module.css";
import Link from "next/link";
import { useAuthStore } from "@/lib/store/authStore";
import { logout } from "@/lib/api/clientApi";

export default function AuthNavigation() {
  const { isAuthenticated, user, clearIsAuthenticated } = useAuthStore();
  const router = useRouter();
  const userEmail = user?.email;
  const handleLogout = async () => {
    try {
      await logout();
      clearIsAuthenticated();
      router.replace("/sign-in");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <ul>
      {isAuthenticated ? (
        <>
          <li className={css.navigationItem}>
            <Link
              href="/profile"
              prefetch={false}
              className={css.navigationLink}
            >
              Profile
            </Link>
          </li>

          <li className={css.navigationItem}>
            <p className={css.userEmail}>{userEmail}</p>
            <button onClick={handleLogout} className={css.logoutButton}>
              Logout
            </button>
          </li>
        </>
      ) : (
        <>
          <li className={css.navigationItem}>
            <Link
              href="/sign-in"
              prefetch={false}
              className={css.navigationLink}
            >
              Login
            </Link>
          </li>
          <li className={css.navigationItem}>
            <Link
              href="/sign-up"
              prefetch={false}
              className={css.navigationLink}
            >
              Sign up
            </Link>
          </li>
        </>
      )}
    </ul>
  );
}
