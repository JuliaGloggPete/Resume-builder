
import * as Type from "../../types";


const itemReducer = <T extends Type.Item, Key extends keyof T>(
  state: T[],
  action: Type.ActionAll<T>,
  identifierKey: Key
) => {
  const { type, payload } = action;
  switch (type) {
    case "ADD":
      return [...state, payload as T];
    case "DELETE":
      const deleteIdentifier =
        typeof payload === "string" ? payload : payload[identifierKey];
      return state.filter((item) => item[identifierKey] !== deleteIdentifier);
    default:
      return state;
  }
};

const generateReducer =
  <T extends Type.Item, Key extends keyof T>(
    initialState: T[],
    identifierKey: Key
  ) =>
  (state: T[] = initialState, action: Type.ActionAll<T>) => {
    return itemReducer(state, action, identifierKey);
  };

export default generateReducer;
