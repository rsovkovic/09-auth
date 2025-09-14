"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getMe, updateMe } from "@/lib/api/clientApi";
import css from "./EditPage.module.css";
import Image from "next/image";
import { useAuthStore } from "@/lib/store/authStore";

export default function EditProfile() {
  const { user, setUser } = useAuthStore();
  const [username, setUsername] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getMe();
        setUsername(userData.username ?? "");
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };
    fetchUser();
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleSaveUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const updatedProfile = await updateMe({ username });
      setUser(updatedProfile);
      router.push("/profile");
    } catch (error) {
      console.error("User profile update failed:", error);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        <Image
          src="https://ac.goit.global/fullstack/react/default-avatar.jpg"
          alt="User Avatar"
          width={120}
          height={120}
          className={css.avatar}
        />

        <form onSubmit={handleSaveUser} className={css.profileInfo}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              type="text"
              className={css.input}
              value={username}
              onChange={handleChange}
            />
          </div>

          <p>Email: {user?.email}</p>

          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save
            </button>
            <button
              onClick={handleCancel}
              type="button"
              className={css.cancelButton}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
