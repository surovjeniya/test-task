import dynamic from "next/dynamic";
import { FC, PropsWithChildren } from "react";
import { TypeComponentAuthFileds } from "./private-route.interface";

const DynamincCheckRole = dynamic(() => import("./check-role"), {
  ssr: false,
});

const AuthProvider: FC<PropsWithChildren<TypeComponentAuthFileds>> = ({
  Component: { isOnlyUser },
  children,
}) => {
  return !isOnlyUser ? (
    <>{children}</>
  ) : (
    <DynamincCheckRole Component={{ isOnlyUser }}>{children}</DynamincCheckRole>
  );
};

export default AuthProvider;
