import { useAuth } from "hooks/useAuth";
import { useRouter } from "next/router";
import { FC, PropsWithChildren } from "react";
import { TypeComponentAuthFileds } from "./private-route.interface";

const CheckRole: FC<PropsWithChildren<TypeComponentAuthFileds>> = ({
  Component: { isOnlyUser },
  children,
}) => {
  const { isLoading, user } = useAuth();
  const { replace, pathname } = useRouter();

  const Children = () => {
    return <>{children}</>;
  };

  if (isLoading) return null;
  if (user) return <Children />;
  if (isOnlyUser) pathname !== "/register" && replace("/register");

  return null;
};

export default CheckRole;
