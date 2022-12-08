import { useActions } from "hooks/useActions";
import { useAuth } from "hooks/useAuth";
import React, { useState } from "react";
import { RegisterDto } from "../../types/auth.interface";
import { Button } from "../ui/Button/Button";
import { Input } from "../ui/Input/Input";
import styles from "./Registration.module.scss";
import { AiFillAccountBook } from "react-icons/ai";
import Link from "next/link";

export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
}

export const Registration = () => {
  const [step, setStep] = useState<1 | 2>(1);
  const [gender, setGender] = useState<Gender>(Gender.MALE);
  const [birthDate, setBirthDate] = useState("");
  const [registerData, setRegisterData] = useState({
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    email: "",
  });

  const onChangeGender = e => {
    setGender(e.target.value);
  };

  const onChangeRegisterData = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const onChangeBirthDate = e => {
    setBirthDate(e.target.value);
  };

  const { register: registerAction } = useActions();
  const { isLoading } = useAuth();

  const onRegister = () => {
    const data: RegisterDto = { gender, birthDate, ...registerData };
    registerAction(data);
  };

  return (
    <div>
      {step === 1 ? (
        <div className={styles.registration}>
          <Button
            disabled
            textColor="regular"
            backgroundcolor="white"
            borderRadius="l"
          >
            General Info
          </Button>
          <Input
            placeholder="Email*"
            name="email"
            type={"email"}
            required
            value={registerData.email}
            onChange={e => onChangeRegisterData(e)}
          />
          <Input
            placeholder="First name*"
            name="firstName"
            required
            type="text"
            value={registerData.firstName}
            onChange={e => onChangeRegisterData(e)}
          />
          <Input
            placeholder="Last name*"
            name="lastName"
            required
            type={"text"}
            value={registerData.lastName}
            onChange={e => onChangeRegisterData(e)}
          />
          <Input
            placeholder="Phone number*"
            name="phoneNumber"
            required
            type={"tel"}
            value={registerData.phoneNumber}
            onChange={e => onChangeRegisterData(e)}
          />
          <div className={styles.gender}>
            <p>Gender</p>
            <input
              className={styles.radio}
              onChange={e => onChangeGender(e)}
              type="radio"
              name="gender"
              id="male"
              value={Gender.MALE}
              checked={gender === Gender.MALE ? true : false}
            />
            <label htmlFor="male">Male</label>
            <input
              onChange={e => onChangeGender(e)}
              type="radio"
              name="gender"
              id="female"
              value={Gender.FEMALE}
              checked={gender === Gender.FEMALE ? true : false}
            />
            <label htmlFor="female">Female</label>
          </div>
          <div className={styles.birth}>
            <label htmlFor="birthDate">Date of birth</label>
            <input
              type="date"
              id="birthDate"
              name="birthDate"
              required
              value={birthDate}
              onChange={e => onChangeBirthDate(e)}
            />
          </div>
          <Link href={"/login"}>
            <Button
              backgroundcolor="white"
              textColor="regular"
              boxShadow="one"
              borderRadius="m"
              fontWeight="bold"
            >
              Sign In
            </Button>
          </Link>
          <Button
            backgroundcolor="default"
            textColor="white"
            boxShadow="one"
            borderRadius="m"
            fontWeight="bold"
            onClick={e => setStep(2)}
            disabled={
              !registerData.email.length ||
              !registerData.firstName.length ||
              !registerData.lastName.length ||
              !registerData.phoneNumber.length ||
              !birthDate.length
            }
          >
            Next
          </Button>
        </div>
      ) : (
        <div className={styles.registration}>
          <Button
            disabled
            textColor="regular"
            backgroundcolor="white"
            borderRadius="l"
          >
            Password
          </Button>
          <Input
            placeholder="Password *"
            name="password"
            type={"password"}
            required
            value={registerData.password}
            onChange={e => onChangeRegisterData(e)}
          />
          <Input
            placeholder="Confirm password *"
            name="confirmPassword"
            type={"password"}
            required
            value={registerData.confirmPassword}
            onChange={e => onChangeRegisterData(e)}
          />
          <Button onClick={() => setStep(1)}>Back</Button>
          <Button
            disabled={
              registerData.password !== registerData.confirmPassword ||
              !registerData.password ||
              isLoading
            }
            onClick={() => onRegister()}
          >
            Sign up
          </Button>
        </div>
      )}
    </div>
  );
};
