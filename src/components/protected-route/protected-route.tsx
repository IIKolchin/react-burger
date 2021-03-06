import { Route, RouteProps } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "../../services/types/index";
import { getUser } from "../../services/actions/user";

export const ProtectedRoute: FC<RouteProps> = ({
  children,
  ...rest
}) => {
  const dispatch = useDispatch();
  const isUser = useSelector((store) => store.user.isUser);
  const [isUserLoaded, setUserLoaded] = useState(false);

  const init = async () => {
    await dispatch(getUser());
    setUserLoaded(true);
  };

  useEffect(() => {
    init();
  }, []);

  if (!isUserLoaded) {
    return null;
  }

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isUser ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};
