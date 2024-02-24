import React, { FC, useEffect, useState } from "react";
import "./App.css";

interface AppItem {
  title: string;
  description: string;
}

const App: FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000")
      .then((response) => response.json())
      .then((data) => setData(data));
  }, [title]);

  const handleButtonClick = () => {
    const data = { title: title, description: description };

    fetch("http://localhost:3000", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error("Error:", error));
    setDescription("");
    setTitle("");
  };

  return (
    <>
      <h1>FullStack ToDo</h1>
      <form>
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
        <button onClick={handleButtonClick}>Добавить</button>
      </form>

      <div className="block">
        <div>
          <ul>
            {data.map((item: AppItem) => (
              <li>
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
