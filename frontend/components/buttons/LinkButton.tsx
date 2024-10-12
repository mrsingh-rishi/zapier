import { ReactNode } from "react";

export const LinkButton = ({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick: () => void;
}) => {
  return (
    <div onClick={onClick} className="px-2 py-4 cursor-pointer">
      {children}
    </div>
  );
};
