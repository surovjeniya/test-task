import { Button } from "components/ui/Button/Button";
import { useActions } from "hooks/useActions";
import { useAuth } from "hooks/useAuth";

export const Header = () => {
  const { user } = useAuth();
  const { logout } = useActions();

  return (
    <header>{user && <Button onClick={() => logout()}>Log out</Button>}</header>
  );
};
