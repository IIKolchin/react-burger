import {
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "../login/login.module.css";
import { Link, useHistory } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "../../services/types/index";
import {
  forgotPassword,
  SET_FORGOT_PASSWORD,
} from "../../services/actions/user";

export function ForgotPasswordPage() {
  const isUser = useSelector((store) => store.user.isUser);
  const form = useSelector((store) => store.forgotPassword.form);
  const dispatch = useDispatch();
  const forgotPasswordSuccess = useSelector(
    (store) => store.forgotPassword.forgotPasswordSuccess
  );

  const change = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: SET_FORGOT_PASSWORD,
      payload: { ...form, [e.target.name]: e.target.value },
    });
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(forgotPassword(form.email));
  };

  if (isUser) {
    return (
      <Redirect
        to={{
          pathname: "/",
        }}
      />
    );
  }

  if (forgotPasswordSuccess) {
    return (
      <Redirect
        to={{
          pathname: "/reset-password",
        }}
      />
    );
  }

  return (
    <form onSubmit={submit} className={styles.container}>
      <h2 className={styles.heading}>Восстановление пароля</h2>
      <div className="mb-6">
        <EmailInput onChange={change} value={`${form.email}`} name={"email"} />
      </div>
      <Button type="primary" size="medium">
        Восстановить
      </Button>

      <p className={styles.p + " mt-20 mb-4"}>
        Вспомнили пароль?{" "}
        <Link to="/login" className={styles.a}>
          Войти
        </Link>
      </p>
    </form>
  );
}
