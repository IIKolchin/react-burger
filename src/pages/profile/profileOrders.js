import styles from "./profile.module.css";
import { Link, Redirect, NavLink } from "react-router-dom";
import { logoutRequest } from "../../services/actions/logout";
import { useSelector, useDispatch } from "react-redux";
import React, { useCallback, useEffect, useState } from "react";
import { FeedItem } from "../../components/feed-item/feed-item";

export function ProfileOrders() {
  const dispatch = useDispatch();

  const signOut = async () => {
    dispatch(logoutRequest());
  };

  const logout = useCallback(() => {
    signOut();
  }, []);

  const status = "Выполнен";

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
            Профиль
          </NavLink>
          <NavLink
            to={{ pathname: `/profile/orders` }}
            exact
            className={styles.a + " mb-8"}
            activeClassName={styles.activeLink}
          >
            История заказов
          </NavLink>
          <button onClick={logout} className={styles.exit}>
            Выход
          </button>
        </nav>
        <p className={styles.p + " mt-20"}>
          В этом разделе вы можете просмотреть свою историю заказов
        </p>
      </div>

      <div className={styles.order}>
        <FeedItem status={status} />
      </div>
    </div>
  );
}