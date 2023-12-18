"use client";

import clsx from "clsx";

export default function Modal({
  children,
  isOpen,
  close,
}: {
  children: React.ReactNode;
  isOpen: boolean;
  close: () => void;
}) {
  return (
    <div className={clsx({ hidden: !isOpen })}>
      <div
        className="fixed top-0 left-0 w-screen h-screen backdrop-blur-sm"
        onClick={() => close()}
      />
      <div className="absolute top-[50%] left-[50%] max-h-[90vh] overflow-y-auto -translate-x-1/2 -translate-y-1/2">
        <div>{children}</div>
      </div>
    </div>
  );
}
