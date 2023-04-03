import React, { ChangeEvent, useState } from "react";
import "./navbar.css";
import { NavLink } from "react-router-dom";
import { useCurrentUser, useIsAuth } from "../../store/user/hook";
import { useAppDispatch } from "../../store";
import { logout } from "../../store/user/actions";
import { setFiles } from "../../store/file/actions";
import agent, { API_URL } from "../../api/agent";
import { useCurrentDir } from "../../store/file/hooks";
//@ts-ignore
import Logo from "../../assets/img/logo.svg";
//@ts-ignore
import defaultAvatarLogo from "../../assets/img/avatar.svg";

const Navbar = () => {
  const { searchFile, getFiles } = agent.files;
  const isAuth = useIsAuth();
  const currentDir = useCurrentDir();
  const curruntUser = useCurrentUser();
  const dispatch = useAppDispatch();
  const [searchName, setSearchName] = useState("");
  const [searchTimeout, setSearchTimeout] = useState<any>(false);
  const avatar = curruntUser?.avatar
    ? `${API_URL}/${curruntUser.avatar}`
    : defaultAvatarLogo;

  const searchChangeHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    setSearchName(e.target.value);

    if (searchTimeout) {
      clearTimeout(Number(searchTimeout));
    }

    if (!e.target.value) {
      return getFiles(currentDir).then((res) => dispatch(setFiles(res)));
    }

    setSearchTimeout(
      setTimeout(
        async (value: string) => {
          const res = await searchFile(value);
          dispatch(setFiles(res));
        },
        500,
        e.target.value
      )
    );
  };

  return (
    <div className="navbar">
      <div className="container">
        <img src={Logo} alt="" className="navbar__logo" />
        <div className="navbar__header">MERN CLOUD</div>
        {isAuth && (
          <input
            value={searchName}
            onChange={searchChangeHandler}
            className="navbar__search"
            type="text"
            placeholder="Название файла..."
          />
        )}
        {isAuth ? (
          <>
            <div className="navbar__login" onClick={() => dispatch(logout())}>
              Logout
            </div>
            <NavLink to="/profile">
              <img className="navbar__avatar" src={avatar} alt="avatar-logo" />
            </NavLink>
          </>
        ) : (
          <>
            <div className="navbar__login">
              <NavLink to="/auth/sign-in">Sign in</NavLink>
            </div>
            <div className="navbar__registration">
              <NavLink to="/auth/sign-up">Sign up</NavLink>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
