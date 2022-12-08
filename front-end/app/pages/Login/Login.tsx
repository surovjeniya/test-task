import { SignIn } from "components/SignIn/SignIn";
import { useAuth } from "hooks/useAuth";
import { Layout } from "layout/Layout";
import { useRouter } from "next/router";

export const Login = () => {
  const { user } = useAuth();
  const { pathname, replace } = useRouter();
  if (user) replace("/personal");

  return (
    <Layout title="Login">
      <SignIn />
    </Layout>
  );
};
