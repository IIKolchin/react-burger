import styles from "./feed.module.css";
import { Link, Redirect, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import React, { useCallback, useEffect, useState } from "react";
import { OrderFeed } from "../../components/order-feed/order-feed";

export function FeedPage() {
  const dispatch = useDispatch();



  return (
    <div className={styles.container}>
<OrderFeed />
</div>
  );
}
