/** @format */

import { FC } from "react";
import { useLocalstorage } from "rooks";

export const Auth: FC = ({ children }) => {
  //
  const [token] = useLocalstorage("token");

  if (token) return <>{children}</>;

  return <></>;
};

export const NoAuth: FC = ({ children }) => {
  //
  const [token] = useLocalstorage("token");

  if (!token) return <>{children}</>;

  return <></>;
};
