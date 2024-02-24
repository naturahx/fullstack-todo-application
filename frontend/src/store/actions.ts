import { Dispatch } from 'redux';

export const ADD_DATA = 'ADD_DATA';

export interface AppItem {
  title: string;
  description: string;
}

export interface AddDataAction {
  type: typeof ADD_DATA;
  payload: AppItem;
}

export const addData = (data: AppItem) => {
  return (dispatch: Dispatch<AddDataAction>) => {
    fetch('http://localhost:3000/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
    .then(response => response.text())
    .then(() => {
      dispatch({ type: ADD_DATA, payload: data });
    })
    .catch(error => console.error('Ошибка:', error));
  };
};