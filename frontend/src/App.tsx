import React, { FC, useEffect, useState } from "react";
import "./App.css";

interface AppItem {
  title: string;
  description: string;
}

const App: FC = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [data, setData] = useState<AppItem[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch("http://localhost:3000")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data:", error));
  };

  const addPost = (title: string, description: string) => {
    fetch("http://localhost:3000", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, description }),
    })
      .then((response) => response.json())
      .then(() => {
        fetchData(); // Обновление данных с сервера после успешного добавления поста
      })
      .catch((error) => console.error("Error adding post:", error));

    setDescription("");
    setTitle("");
  };

  return (
    <>
      <h1>FullStack ToDo</h1>
      <form onSubmit={(e) => { e.preventDefault(); addPost(title, description); }}>
        <input
          placeholder="Название"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          placeholder="Описание"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
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
