"use client";
import css from "./SignUp.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { register, RegisterRequest } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";

export default function SignUp() {
  const router = useRouter();

  const setUser = useAuthStore((state) => state.setUser);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (formData: FormData) => {
    setError(null);
    try {
      const data = Object.fromEntries(formData) as RegisterRequest;
      const user = await register(data);

      if (user) {
        setUser(user);
        router.push("/profile");
      }
    } catch (err) {
      console.error("Register error:", err);
      setError("Registration failed");
    }
  };

  return (
    <main className={css.mainContent}>
      <h1 className={css.formTitle}>Sign up</h1>
      <form action={handleSubmit} className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            className={css.input}
            required
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            className={css.input}
            required
          />
        </div>

        <div className={css.actions}>
          <button type="submit" className={css.submitButton}>
            Register
          </button>
        </div>

        {error && <p className={css.error}>{error}</p>}
      </form>
    </main>
  );
}
