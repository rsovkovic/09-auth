"use client";

import { User } from "@/types/user";
import { nextServer } from "./api";
import { Note, NoteTag } from "@/types/note";

export type RegisterRequest = {
  email: string;
  password: string;
};

export interface CheckSessionResponse {
  success: boolean;
  user?: {
    username: string;
    email?: string;
    avatar: string;
  };
}

export interface UpdateUserRequest {
  username?: string;
}

export interface FetchNotesParams {
  page: number;
  perPage: number;
  search?: string;
  tag?: NoteTag | "All";
}
export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface CreateNoteProps {
  title: string;
  content: string;
  tag: string;
}
// const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
export const fetchNotes = async ({
  page,
  perPage,
  search,
  tag,
}: FetchNotesParams): Promise<FetchNotesResponse> => {
  const response = await nextServer.get<FetchNotesResponse>("/notes", {
    params: {
      page,
      perPage,
      ...(search ? { search } : {}),
      ...(tag && tag !== "All" ? { tag } : {}),
    },
  });
  return response.data;
};

export const createNote = async (newNote: CreateNoteProps): Promise<Note> => {
  const response = await nextServer.post<Note>("/notes", newNote, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const response = await nextServer.delete<Note>(`/notes/${id}`);
  return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const response = await nextServer.get<Note>(`/notes/${id}`);
  return response.data;
};

export const register = async (payload: RegisterRequest): Promise<User> => {
  const res = await nextServer.post<User>("/auth/register", payload);
  return res.data;
};

export const login = async (payload: RegisterRequest) => {
  const res = await nextServer.post<User>(`/auth/login`, payload);
  return res.data;
};

export const checkSession = async (): Promise<CheckSessionResponse> => {
  const res = await nextServer.get<CheckSessionResponse>("/auth/session");
  return res.data;
};

export const getMe = async (): Promise<User> => {
  const { data } = await nextServer.get<User>("/users/me");
  return data;
};

export const logout = async (): Promise<void> => {
  await nextServer.post("/auth/logout");
};

export const updateMe = async (payload: UpdateUserRequest): Promise<User> => {
  const res = await nextServer.patch<User>("/users/me", payload);
  return res.data;
};
