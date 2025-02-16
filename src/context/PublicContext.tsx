"use client";

import { Spinner } from "@/components/Loader";
import { useAuth } from "@/hooks/useAuth";
import { useAppSelector } from "@/store";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

export function PublicContext({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const userData = useAppSelector((state) => state.storeData.user);
  const router = useRouter();

  useEffect(() => {
    if (userData && !user.isPending) router.push("/");
  }, [userData, user.isPending, router]);

  if (user.isPending) return <Spinner />;
  if (userData) return <Spinner />;

  return children;
}
