import { useAuth } from "hooks/useAuth";
import { useRouter } from "next/router";

export default function HomePage() {
  const { user } = useAuth();
  const { replace } = useRouter();
  if (!user) replace("/register");
  return <>home</>;
}
