"use client";

import { useRouter } from "next/navigation";
import { FC, useEffect } from "react";

interface NavigateProps {
  to: string;
}

const Navigate: FC<NavigateProps> = ({ to }) => {
  const router = useRouter();
  useEffect(() => {
    router.push(to);
  }, []);
  return <></>;
};

export default Navigate;
