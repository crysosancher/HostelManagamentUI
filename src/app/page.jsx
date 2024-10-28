"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import SignInComponent from "@/components/Auth/SignIn/SignIn";

export default function test() {
  const auth = false;
  const router = useRouter();

  useEffect(() => {
    if (!auth) {
      router.push("/signin");
    }
  }, [auth, router]);

  return (
    <main>
      <SignInComponent />
    </main>
  );
}
