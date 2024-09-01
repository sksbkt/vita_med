"use client";
import { AUTHED_ROUTES } from "@/constants/authedRoutes";
import { useAppDispatch, useAppSelector } from "@/hooks/useStore";
import { getValidAuthToken } from "@/lib/cookies";
import { useGetAuthDataQuery } from "@/lib/features/authSlice/authApiSlice";
import { logOut } from "@/lib/features/authSlice/authSlice";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function AuthWrapper({ children }: { children: React.ReactNode }) {
  const { push } = useRouter();
  const dispatch = useAppDispatch();
  const pathName = usePathname();
  const [isLoading, setIsLoading] = useState(true);

  const isAuthedRoute = isAuthed(pathName);
  const { ACCESS_TOKEN } = useAppSelector((state) => state.authSlice);
  // const { token } = getValidAuthToken();
  const { userName } = useAppSelector((state) => state.authSlice);

  // const { error, isLoading } = useGetAuthDataQuery(
  //   // ? this query will only execute if the token is valid and the user email is not already in the redux store
  //   { token: token || "" },
  //   // ? The useGetAuthDataQuery hook will not execute the query at all if these values are faulty
  //   { skip: !!userName || !token }
  // );

  useEffect(() => {
    if (isAuthedRoute && !ACCESS_TOKEN) {
      push("/user/login");
      // dispatch(logOut());
    }
    setIsLoading(false);
  }, [dispatch, isAuthedRoute, push, ACCESS_TOKEN]);
  if (isLoading || (isAuthedRoute && !ACCESS_TOKEN)) {
    return <div>Loading...</div>;
  } else {
    return children;
  }
}

export default AuthWrapper;

function isAuthed(pathName: string): boolean {
  return AUTHED_ROUTES.includes(
    pathName.substring(pathName.lastIndexOf("/", pathName.length))
  );
}
