import React, { useState } from "react";
import "./auth.css";
import agent from "../../api/agent";
import Input from "../../components/common/input/Input";
import { useParams } from "react-router-dom";
import { ISignIn } from "../../api/user.interfaces";
import { useAppDispatch } from "../../store";
import { setUser } from "../../store/user/actions";

const Auth = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const { signUp, signIn } = agent.user;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const isSignIn = params.method === "sign-in";

  const signInHandler = async (data: ISignIn) => {
    const res = await signIn(data);
    dispatch(setUser(res));
  };

  const authMethodData = {
    title: isSignIn ? "Authorization" : "Registration",
    buttonText: isSignIn ? "Sign in" : "Sign up",
    func: isSignIn ? signInHandler : signUp,
  };

  return (
    <div className="registration">
      <div className="registration__header">{authMethodData.title}</div>
      <Input
        value={email}
        setValue={setEmail}
        type="text"
        placeholder="Введите email..."
      />
      <Input
        value={password}
        setValue={setPassword}
        type="password"
        placeholder="Введите пароль..."
      />
      <button
        className="registration__btn"
        onClick={() => authMethodData.func({ email, password })}
      >
        {authMethodData.buttonText}
      </button>
    </div>
  );
};

export default Auth;
