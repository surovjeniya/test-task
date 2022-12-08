import { useAuth } from "hooks/useAuth";
import { Layout } from "layout/Layout";
import { FC, PropsWithChildren, useEffect, useState } from "react";
import { userService } from "services/user.service";
import { IUser } from "types/user.interface";

export const Personal = () => {
  const [user, setUser] = useState<IUser>();

  useEffect(() => {
    const userData = async () => {
      return await userService.getPersonalInfo();
    };
    userData().then((r) => setUser(r.data));
  }, []);
  return (
    <Layout title={user?.email}>
      <div>
        {user?._id} || {user?.email} || {user?.firstName} || {user?.lastName}
      </div>
    </Layout>
  );
};
