"use client";

import { signIn, useSession } from "next-auth/react";
import { api } from "./api";

export const useRefreshToken = () => {
  const { data: session } = useSession();

  const refreshToken = async () => {
    const res = await api.post("/auth/refreshToken", {
      refreshToken: session?.user.refreshToken,
    });

    if (session) session.user.accessToken = res.data.tokens.accessToken;
    else signIn();
  };
  return refreshToken;
};
