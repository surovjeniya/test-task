import { useActions } from "hooks/useActions";
import { useAuth } from "hooks/useAuth";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "../ui/Button/Button";
import { Input } from "../ui/Input/Input";
import styles from "./SignIn.module.scss";
import { FaKey } from "react-icons/fa";

export const SignIn = () => {
  const [loginData, setLoginData] = useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });

  const onChangeLoginData = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const { login: loginAction } = useActions();
  const { isLoading } = useAuth();
  const onLogin = () => {
    loginAction({ ...loginData });
  };

  return (
    <div className={styles["sign-in"]}>
      <Button
        Icon={FaKey}
        disabled
        textColor="regular"
        backgroundcolor="white"
        borderRadius="l"
      >
        Sign in
      </Button>
      <Input
        placeholder="Email *"
        name="email"
        type={"email"}
        required
        value={loginData.email}
        onChange={e => onChangeLoginData(e)}
      />
      <Input
        placeholder="Password *"
        name="password"
        type={"password"}
        required
        value={loginData.password}
        onChange={e => onChangeLoginData(e)}
      />
      <Button
        backgroundcolor="default"
        textColor="white"
        boxShadow="one"
        borderRadius="m"
        fontWeight="bold"
        disabled={isLoading || !loginData.email.length}
        onClick={onLogin}
      >
        Sign In
      </Button>

      <Link href={"/register"}>
        <Button
          backgroundcolor="white"
          textColor="regular"
          boxShadow="one"
          borderRadius="m"
          fontWeight="bold"
        >
          Create a new account
        </Button>
      </Link>
    </div>
  );
};
