"use client";

import { ReactNode, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { Spinner } from "@/components/Loader";
import { useAuth } from "@/hooks/useAuth";
import { useAppSelector } from "@/store";
import { useRouter } from "next/navigation";

export function AuthProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const userData = useAppSelector((state) => state.storeData.user);

  const router = useRouter();

  useEffect(() => {
    if (!userData && !user.isPending) router.push("/login");
  }, [userData, user.isPending, router]);

  if (user.isPending) return <Spinner />;
  if (!userData) return <Spinner />;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-4 py-8">{children}</div>
    </div>
  );
}
