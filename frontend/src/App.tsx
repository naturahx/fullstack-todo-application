import React, { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "./App.css";

interface AppItem {
  title: string;
  description: string;
}

const App: FC = () => {
  const [data, setData] = useState<AppItem[]>([]);
  const { register, handleSubmit, formState: { errors } } = useForm<AppItem>();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch("http://localhost:3000")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data:", error));
  };

  const addPost = (newPost: AppItem) => {
    fetch("http://localhost:3000", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPost),
    })
      .then((response) => response.json())
      .then(() => {
        fetchData(); // Обновление данных с сервера после успешного добавления поста
      })
      .catch((error) => console.error("Error adding post:", error));
  };

  const onSubmit = (formData: AppItem) => {
    addPost(formData);
  };

  return (
    <>
      <h1>FullStack ToDo</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          placeholder="Название"
          {...register("title", { required: 'Название обязательно', minLength: { value: 3, message: 'Название должно содержать не менее 3 символов' } })}
        />
        {errors.title && <p>{errors.title.message}</p>}

        <input
          placeholder="Описание"
          {...register("description", { required: 'Описание обязательно', minLength: { value: 5, message: 'Описание должно содержать не менее 5 символов' } })}
        />
        {errors.description && <p>{errors.description.message}</p>}

        <button type="submit">Добавить</button>
      </form>

      <div className="block">
        <ul>
          {data.map((item: AppItem, index) => (
            <li key={index}>
              <h3>Название: {item.title}</h3>
              <p>Описание: {item.description}</p>
              <button>Удалить</button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default App;
