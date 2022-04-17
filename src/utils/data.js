import PropTypes from "prop-types";
import { getCookie } from "../utils/cookie";

const URL = "https://norma.nomoreparties.space/api/";

const dataPropTypes = PropTypes.shape({
  _id: PropTypes.string,
  type: PropTypes.string,
  image: PropTypes.string,
  price: PropTypes.number,
  name: PropTypes.string,
  image_large: PropTypes.string,
  calories: PropTypes.number,
  proteins: PropTypes.number,
  fat: PropTypes.number,
  carbohydrates: PropTypes.number,
});

const dataOrderPropTypes = PropTypes.shape({
  createdAt: PropTypes.string,
  ingredients: PropTypes.array,
  name: PropTypes.string,
  number: PropTypes.number,
  status: PropTypes.string,
  updatedAt: PropTypes.string,
  _id: PropTypes.string,
});

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

const getUserRequest = async (token) => {
  const res = await fetch(`${URL}auth/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: token,
    },
  });
  const data = await checkResponse(res);
  return data;
};

const patchUserRequest = async (form) => {
  const res = await fetch(`${URL}auth/user`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: getCookie("token"),
    },
    body: JSON.stringify(form),
  });
  const data = await checkResponse(res);
  return data;
};

const updateTokenRequest = async (token) => {
  const res = await fetch(`${URL}auth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token }),
  });
  const data = await checkResponse(res);
  return data;
};

const getDateOrder = (date) => {
  const dateNow = new Date().toLocaleString();
  const createdAt = new Date(date);
  const dateOrder = createdAt.toLocaleString();
  const timeZone = (createdAt.getTimezoneOffset() / 60) * -1;
  const dayNumber = dateNow.slice(0, 2) - dateOrder.slice(0, 2);
  const hours = dateOrder.slice(12, 17);
  const day =
    dayNumber === 0
      ? "Cегодня"
      : dayNumber === 1
      ? "Вчера"
      : `${dayNumber}  дня(-ей) назад`;
  return `${day}, ${hours} i-GMT+${timeZone}`;
};

export {
  URL,
  dataPropTypes,
  dataOrderPropTypes,
  checkResponse,
  getDateOrder,
  getUserRequest,
  updateTokenRequest,
  patchUserRequest,
};
