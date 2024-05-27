
import * as Type from "../../types";

const clientReducer = (state: Type.Client[], action: Type.ClientAction): Type.Client[] => {
  switch (action.type) {
    case 'ADD_CLIENT':
      return [...state, action.payload];

    case 'DELETE_CLIENT':

    //this is not super as clients can be the same name on different dates
      return state.filter(client => client.client !== action.payload.client);

    case 'PATCH_CLIENT':
      return state.map(client =>
        client.client === action.payload.client
          ? { ...client, ...action.payload.updates }
          : client
      );

    default:
      return state;
  }
}
export default clientReducer;