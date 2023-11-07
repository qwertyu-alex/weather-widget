"use client";

import { useTheme } from "next-themes";
import { useParams, useSearchParams } from "next/navigation";

export const ThemeWrapper = (props: { children: JSX.Element }) => {
  const params = useSearchParams();
  const { setTheme } = useTheme();
  const theme = params.get("theme");

  if (theme) {
    if (theme === "dark") {
      setTheme("dark");
    }

    if (theme === "light") {
      setTheme("light");
    }
  }

  return props.children;
};
