"use client";

import { useAppDispatch } from "@/hooks/useStore";
import { setThemeMode } from "@/lib/features/themeSlice";
import Image from "next/image";

export default function Home() {
  const dispatch = useAppDispatch();
  return (
    <button
      onClick={() => {
        dispatch(setThemeMode({ darkMode: false, ltrMode: false }));
      }}
    >
      CLICK ME
    </button>
  );
}
