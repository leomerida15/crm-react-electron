import { useEffect, useState } from "react";
import { RemotEvent, useRemote } from "./hooks/useElectron";

export const useRoles = () => {
  const { Resp, refresh } = useRemote({
    path: `./Api/functions/Rols.js`,
    method: "ALL",
  });

  return Resp;
};

export const useRegister = () => {
  const { Resp, refresh } = useRemote({
    path: `./Api/functions/Auth.js`,
    method: "register",
  });

  return Resp;
};

export const handleRegister = async (data: any) => {
  console.log("data", data);
  const auth = RemotEvent(`./Api/functions/Auth.js`);
  console.log("auth", auth);
  const resp = await auth.register(data);
  console.log("resp", resp);

  return resp.info;
};
