import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useCallback, useState, useEffect } from "react";
import styles from "./profile.module.css";
import { Link, Redirect, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "../../services/types/index";
import { logout } from "../../services/actions/user";
import { patchUser, SET_PATCH_USER } from "../../services/actions/user";
import {
  wsConnectionStart,
  wsConnectionClosed,
} from "../../services/actions/wsActions";
import { getCookie } from "../../utils/cookie";

export function Profile() {
  const dispatch = useDispatch();
  const [showButton, setShowButton] = useState(false);
  const form = useSelector((store) => store.patchUser.form);
  const userForm = useSelector((store) => store.user.form);
  const isUser = useSelector((store) => store.user.isUser);
  const user = useSelector((store) => store.user.form);

  useEffect(() => {
    if (user.name && user.email) {
      const token = getCookie("token")?.split("Bearer ")[1];
      if (token) {
        dispatch(wsConnectionStart(token));

        return () => {
          dispatch(wsConnectionClosed());
        };
      }
    }
  }, [user]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: SET_PATCH_USER,
      payload: { [e.target.name]: e.target.value },
    });
    setShowButton(true);
  };

  const cancel = useCallback(() => {
    dispatch({
      type: SET_PATCH_USER,
      payload: { ...form, name: userForm.name, email: userForm.email },
    });
    setShowButton(false);
  }, [form]);

  const signOut = async () => {
    dispatch(logout());
  };

  const logoutUser = useCallback(() => {
    signOut();
  }, [signOut]);

  if (!isUser) {
    return (
      <Redirect
        to={{
          pathname: "/login",
        }}
      />
    );
  }

  const formSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(patchUser(form));
    setShowButton(false);
  };

  return (
    <div className={styles.container}>
      <div>
        <nav className={styles.nav}>
          <NavLink
            to={{ pathname: `/profile` }}
            exact
            className={styles.a + " mb-8"}
            activeClassName={styles.activeLink}
          >
            ??????????????
          </NavLink>
          <NavLink
            to={{ pathname: `/profile/orders` }}
            exact
            className={styles.a + " mb-8"}
          >
            ?????????????? ??????????????
          </NavLink>
          <button onClick={logoutUser} className={styles.exit}>
            ??????????
          </button>
        </nav>
        <p className={styles.p + " mt-20"}>
          ?? ???????? ?????????????? ???? ???????????? ???????????????? ???????? ???????????????????????? ????????????
        </p>
      </div>

      <form onSubmit={formSubmit} className={styles.input}>
        <div className="mb-6">
          <Input
            type={"text"}
            placeholder={"??????"}
            onChange={onChange}
            value={`${form.name}`}
            name={"name"}
            size={"default"}
            icon={"EditIcon"}
            error={false}
            errorText={"????????????"}
          />
        </div>

        <div className="mb-6">
          <Input
            type={"email"}
            placeholder={"??????????"}
            onChange={onChange}
            value={`${form.email}`}
            name={"email"}
            size={"default"}
            icon={"EditIcon"}
            error={false}
            errorText={"????????????"}
          />
        </div>

        <div>
          <Input
            type={"password"}
            placeholder={"????????????"}
            onChange={onChange}
            value={`${form.password}`}
            name={"password"}
            size={"default"}
            icon={"EditIcon"}
            error={false}
            errorText={"????????????"}
          />
        </div>
        {showButton && (
          <div className={styles.buttons + " mt-6 mr-2"}>
            <Button type="primary" size="medium">
              ??????????????????
            </Button>
            <Button onClick={cancel} type="primary" size="medium">
              ????????????
            </Button>
          </div>
        )}
      </form>
    </div>
  );
}
