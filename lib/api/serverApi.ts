import { cookies } from "next/headers";
import { nextServer } from "@/lib/api/api";
import type { User } from "@/types/user";
import { Note } from "@/types/note";
import { FetchNotesParams, FetchNotesResponse } from "./clientApi";

export const checkServerSession = async () => {
  const cookieStore = await cookies();
  const res = await nextServer.get("/auth/session", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res;
};

export const getServerMe = async (): Promise<User> => {
  const cookieStore = await cookies();
  const { data } = await nextServer.get("/users/me", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};

export const fetchNoteByIdServer = async (id: string): Promise<Note> => {
  const cookiesData = await cookies();
  const response = await nextServer.get<Note>(`/notes/${id}`, {
    headers: {
      Cookie: cookiesData.toString(),
    },
  });
  return response.data;
};

export const fetchNotesServer = async ({
  page,
  perPage,
  search,
  tag,
}: FetchNotesParams): Promise<FetchNotesResponse> => {
  const cookiesData = await cookies();
  const response = await nextServer.get<FetchNotesResponse>("/notes", {
    params: {
      page,
      perPage,
      ...(search ? { search } : {}),
      ...(tag && tag !== "All" ? { tag } : {}),
    },
    headers: {
      Cookie: cookiesData.toString(),
    },
  });
  return response.data;
};
