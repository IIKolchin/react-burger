import React, { useMemo, useCallback } from "react";
import update from "immutability-helper";
import { v4 as uuidv4 } from "uuid";
import OrderDetails from "../order-details/order-details";
import styles from "./burger-constructor.module.css";
import {
  ConstructorElement,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import { useDrop } from "react-dnd";
import { useSelector, useDispatch } from "../../services/types/index";
import Item from "../item/item";
import {
  SHOW_ORDER,
  CLOSE_ORDER,
  getOrder,
} from "../../services/actions/order";
import { DELETE_ITEM } from "../../services/actions/constructor";
import {
  ADD_ITEM,
  ADD_BUN,
  GENERATE_ID,
  UPDATE_POSITION_ITEM,
  RESET_CONSTRUCTOR,
} from "../../services/actions/constructor";
import { useHistory } from "react-router-dom";
import { Loader } from "../loader/loader";
import { TIngredients } from "../../services/types/data";

function BurgerConstructor() {
  const data = useSelector((store) => store.items.data);
  const constructor = useSelector((store) => store.element.constructor);
  const bun = useSelector((store) => store.element.bun);
  const generateId = useSelector((store) => store.element.generateId);
  const showOrder = useSelector((store) => store.orderDetails.showOrder);
  const order = useSelector((store) => store.orderDetails.order);
  const ingredients = ["sauce", "main"];
  const items = [bun, bun, ...constructor];
  const id = items.map((item) => item?._id);
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((store) => store.user.isUser);
  const orderRequest = useSelector((store) => store.orderDetails.orderRequest);

  const [{ ingredientHover }, dropTarget] = useDrop({
    accept: ingredients,
    drop(item: TIngredients) {
      dispatch({
        type: GENERATE_ID,
        payload: uuidv4(),
      });
      dispatch({
        type: ADD_ITEM,
        payload: data.find((el) => el._id === item.id),
      });
    },
    collect: (monitor) => ({
      ingredientHover: monitor.isOver(),
    }),
  });

  const [{ bunHover }, drop] = useDrop({
    accept: "bun",
    drop(item: TIngredients) {
      dispatch({
        type: ADD_BUN,
        payload: data.find((el) => el._id === item.id),
      });
    },
    collect: (monitor) => ({
      bunHover: monitor.isOver(),
    }),
  });

  const borderColor = bunHover || ingredientHover ? "#4C4CFF" : "transparent";

  const updateItem = useCallback(
    (dragIndex, hoverIndex) => {
      dispatch({
        type: UPDATE_POSITION_ITEM,
        payload: update([...constructor], {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, constructor[dragIndex]],
          ],
        }),
      });
    },
    [constructor, dispatch]
  );

  function handleShow() {
    if (user) {
      dispatch(getOrder(id));
      dispatch({ type: SHOW_ORDER });
    } else {
      history.replace({ pathname: "/login" });
    }
  }

  function handleHide() {
    dispatch({ type: CLOSE_ORDER });
    dispatch({ type: RESET_CONSTRUCTOR });
  }

  const totalPrice = useMemo(() => {
    let total = 0;

    items.map((item) => (total += item?.price || 0));

    return total ? total : 0;
  }, [items]);

  if (orderRequest) {
    return <Loader />;
  }

  const onDelete = (index: number) => {
    dispatch({
      type: DELETE_ITEM,
      index,
    });
  };

  return (
    <section className={styles.section + " mt-25 ml-10"}>
      <div className={styles.component} ref={drop} style={{ borderColor }}>
        {bun?.type && (
          <div className="ml-8">
            <ConstructorElement
              type="top"
              isLocked={true}
              text={bun.name + " (верх)"}
              price={bun.price}
              thumbnail={bun.image}
            />
          </div>
        )}

        <div className={styles.el} ref={dropTarget}>
          {constructor.map((data, index) => {
            return (
              <Item
                key={generateId[index]}
                index={index}
                data={data}
                updateItem={updateItem}
                deleteItem={() => onDelete(index)}
              />
            );
          })}
        </div>

        {bun?.type && (
          <div className="ml-8">
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={bun.name + " (низ)"}
              price={bun.price}
              thumbnail={bun.image}
            />
          </div>
        )}
      </div>

      <div className={styles.order + " mt-10 mr-4"}>
        <p className="text text_type_digits-medium mr-2">{totalPrice}</p>
        <div className={styles.icon}></div>
        <Button onClick={handleShow} type="primary" size="large">
          Оформить заказ
        </Button>
      </div>

      {showOrder && order && bun?.type && user && (
        <Modal handleHide={handleHide}>
          <OrderDetails order={order} />
        </Modal>
      )}
    </section>
  );
}

export default BurgerConstructor;
