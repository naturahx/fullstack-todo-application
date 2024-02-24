import React, { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "./App.css";

interface AppItem {
  title: string;
  description: string;
}

const App: FC = () => {
  const [data, setData] = useState<AppItem[]>([]);
  const { register, handleSubmit } = useForm<AppItem>(); // Инициализация react-hook-form

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

  const onSubmit = (data: AppItem) => {
    addPost(data);
  };

  return (
    <>
      <h1>FullStack ToDo</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          name="title"
          placeholder="Название"
          ref={register({ required: 'Название обязательно', minLength: { value: 3, message: 'Название должно содержать не менее 3 символов' } }) as any}
        />

        <input
          name="description"
          placeholder="Описание"
          ref={register({ required: 'Описание обязательно', minLength: { value: 5, message: 'Описание должно содержать не менее 5 символов' } }) as any}
        />

        <button type="submit">Добавить</button>
      </form>

      <div className="block">
        <div>
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
      </div>
    </>
  );
};

export default App;
