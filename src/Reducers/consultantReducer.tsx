
import * as Type from "../../types";


const consultantReducer = (
  state: Type.ConsultantInfo,
  action: Type.Action
): Type.ConsultantInfo => {
  switch (action.type) {
    case "UPDATE":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default consultantReducer;