import React, { FC, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { addData } from './store/actions';

interface AppItem {
  title: string;
  description: string;
}

const App: FC = () => {
  const [data, setData] = useState<AppItem[]>([]);
  const dispatch = useDispatch();
  const dataList = useSelector((state: any) => state.dataList);

  useEffect(() => {
    setData(dataList);
  }, [dataList]);

  const { register, handleSubmit, reset } = useForm();

  const addToList = (formData: Record<string, string>) => {
    dispatch(addData(formData));
    reset();
  };

  return (
    <>
      <form onSubmit={handleSubmit(addToList)}>
        <input {...register("title")} placeholder="Название" />
        <input {...register("description")} placeholder="Описание" />
        <button type="submit">Добавить в список</button>
      </form>

      <ul>
        {data.map((item: AppItem, index: number) => (
          <li key={index}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </li>
        ))}
      </ul>
    </>
  );
};

export default App;
