import { Registration } from "components/Registration/Registration";
import { useAuth } from "hooks/useAuth";
import { Layout } from "layout/Layout";
import { useRouter } from "next/router";

export const Register = () => {
  const { user } = useAuth();
  const { pathname, replace } = useRouter();
  if (user) replace("/personal");

  return (
    <Layout title="Register">
      <Registration />
    </Layout>
  );
};
