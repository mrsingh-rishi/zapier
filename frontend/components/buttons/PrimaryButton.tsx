import { ReactNode } from "react";

export const PrimaryButton = ({
  children,
  onClick,
  size = "sm",
}: {
  children: ReactNode;
  onClick: () => void;
  size?: "sm" | "md" | "lg";
}) => {
  return (
    <div
      onClick={onClick}
      className={`${size === "sm" ? "text-sm" : "text-xl"} ${
        size === "sm" ? "px-4 py-2" : "px-8 py-10"
      } pointer bg-[#ff4f00] text-white rounded-2xl w-[100px] flex cursor-pointer items-center justify-center font-extrabold`}
    >
      {children}
    </div>
  );
};
