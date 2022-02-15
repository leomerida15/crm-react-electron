import { useCounter } from "rooks";
import { Remote } from "electron";
import { useEffect, useState } from "react";
const { remote }: { remote: Remote } = window.require("electron");

export const RemotEvent = (path: string) => remote.require(path);

interface useRemoteProps {
  path: string;
  data?: any;
  method: string;
}

interface useRemoteResp {
  refresh: () => void;
  Resp?: any;
  RemoteState: null | boolean;
}

type useRemoteType = (props: useRemoteProps) => useRemoteResp | any;

export const useRemote: useRemoteType = ({ path, method, data }) => {
  const [Resp, setResp] = useState<any>(null);
  const [RemoteState, setRemoteState] = useState<null | boolean>(null);

  const { value, increment } = useCounter(0);

  const refresh = () => {
    increment();
    setRemoteState(null);
  };

  const ok = (data: any) => {
    setResp(data.info);
    setRemoteState(true);
  };

  const Err = (err: any) => {
    setResp(err);
    setRemoteState(false);
  };

  useEffect(() => {
    const funct = remote.require(`./Api/functions/Rols.js`)[method];

    if (!data) funct().then(ok).catch(Err);
    //
    funct(data).then(ok).catch(Err);
    //
  }, [value]);

  return { Resp, refresh, RemoteState };
};

type useUploadType = (pathFile: string | string[]) => useRemoteResp | any;

export const useUpload: useUploadType = (pathFile) => {
  remote.require(`./Api/functions/Upload.js`)["inputPath"](pathFile);
};
