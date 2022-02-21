import {
  ADD_ITEM,
  DELETE_ITEM,
  ADD_BUN,
  UPDATE_POSITION_ITEM,
  GENERATE_ID,
} from "../actions/constructor";

const initialConstructorState = {
  constructor: [],
  generateId: [],
  bun: {},
  ingredient: {},
  countBun: [],
};

export const constructorReducer = (state = initialConstructorState, action) => {
  switch (action.type) {
    case ADD_ITEM: {
        return {
          ...state,
          constructor: [...state.constructor, action.payload],
        };
      }
      case GENERATE_ID: {
        return {
          ...state,
          generateId: [...state.generateId, action.payload],
        };
      }
      case DELETE_ITEM: {
        return {
          ...state,
          constructor: [...state.constructor].filter(
            (item, index) => index !== action.index
          ),
        };
      }
      case ADD_BUN: {
        return {
          ...state,
          bun: action.payload,
          countBun: action.id,
        };
      }
      case UPDATE_POSITION_ITEM: {
        return {
          ...state,
          constructor: action.constructor,
        };
      }
    default: {
      return state;
    }
  }
};
