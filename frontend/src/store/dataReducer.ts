import { ADD_DATA } from "./actions";

export interface AppItem {
  title: string;
  description: string;
}

const initialState: AppItem[] = [];

const dataReducer = (state = initialState, action: any): AppItem[] => {
  switch (action.type) {
    case ADD_DATA:
      return [...state, action.payload];
    default:
      return state;
  }
};

export default dataReducer;