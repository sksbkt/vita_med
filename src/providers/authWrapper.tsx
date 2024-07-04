"use client";
import { AUTHED_ROUTES } from "@/constants/authedRoutes";
import { useAppDispatch, useAppSelector } from "@/hooks/useStore";
import { getValidAuthToken } from "@/lib/cookies";
import { useGetAuthDataQuery } from "@/lib/features/authSlice/authApiSlice";
import { logOut } from "@/lib/features/authSlice/authSlice";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

function AuthWrapper({ children }: { children: React.ReactNode }) {
  const { push } = useRouter();
  const dispatch = useAppDispatch();
  const pathName = usePathname();
  const isAuthedRoute = isAuthed(pathName);
  const { token } = getValidAuthToken();
  const { userName } = useAppSelector((state) => state.authSlice);

  const { error, isLoading } = useGetAuthDataQuery(
    // ? this query will only execute if the token is valid and the user email is not already in the redux store
    { token: token || "" },
    // ? The useGetAuthDataQuery hook will not execute the query at all if these values are faulty
    { skip: !!userName || !token }
  );
  console.log(
    pathName.substring(pathName.lastIndexOf("/", pathName.length)),
    isAuthedRoute
  );

  useEffect(() => {
    if (isAuthedRoute && !token) {
      push("/user/login");
      dispatch(logOut());
    }
  }, [token, push]);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return children;
}

export default AuthWrapper;

function isAuthed(pathName: string) {
  return AUTHED_ROUTES.includes(
    pathName.substring(pathName.lastIndexOf("/", pathName.length))
  );
}
