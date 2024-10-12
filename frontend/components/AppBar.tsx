"use client";

import { useRouter } from "next/navigation";
import { LinkButton } from "./buttons/LinkButton";
import { PrimaryButton } from "./buttons/PrimaryButton";

export const AppBar = () => {
  const router = useRouter();
  return (
    <div className="flex justify-between items-center px-8 h-14">
      <div className="text-3xl cursor-pointer font-extrabold font-sans">
        <span className="text-orange-600">_</span>zapier
      </div>

      <div className="flex h-8 gap-4 items-center justify-center">
        <LinkButton onClick={() => {}}>Contact Sales </LinkButton>
        <LinkButton
          onClick={() => {
            router.push("/login");
          }}
        >
          Login{" "}
        </LinkButton>
        <PrimaryButton
          onClick={() => {
            router.push("/signup");
          }}
          size="sm"
        >
          Sign Up
        </PrimaryButton>
      </div>
    </div>
  );
};
