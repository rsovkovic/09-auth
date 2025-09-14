import Link from "next/link";
import css from "./ProfilePage.module.css";
import Image from "next/image";
import { getServerMe } from "@/lib/api/serverApi";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const user = await getServerMe();
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
  const username = user?.username || "User";
  const avatarUrl =
    user?.avatar || "https://ac.goit.global/fullstack/react/default-avatar.jpg";

  return {
    title: `${username}'s Profile`,
    description: "Your personal profile page",
    openGraph: {
      title: `${username}'s Profile`,
      description: "Your personal profile page",
      url: `${BASE_URL}/profile`,
      images: [
        {
          url: avatarUrl,
          width: 1200,
          height: 630,
          alt: `${username} avatar`,
        },
      ],
      type: "profile",
      siteName: "NoteHub",
    },
    twitter: {
      card: "summary_large_image",
      title: `${username}'s Profile`,
      description: "Your personal profile page",
      images: [avatarUrl],
    },
  };
}

export default async function Profile() {
  const user = await getServerMe();
  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <Link href="/profile/edit" className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>
        <div className={css.avatarWrapper}>
          <Image
            src={user.avatar}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>
        <div className={css.profileInfo}>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
        </div>
      </div>
    </main>
  );
}
