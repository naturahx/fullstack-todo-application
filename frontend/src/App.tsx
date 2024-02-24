import { useState, useEffect, FC } from "react";
import { useForm } from "react-hook-form";

interface AppItem {
  title: string,
  description: string
}

const App:FC<AppItem> = () => {
  const [data, setData] = useState<AppItem[]>([]);

  useEffect(() => {
    fetch('http://localhost:3000/')
    .then(response => response.json())
    .then(data => setData(data))
  }, [])

  const { register, handleSubmit, reset } = useForm();

  const addToList = (formData: Record<string, string>) => {
    const newItem: AppItem = {
      title: formData.title,
      description: formData.description
    };
    setData([...data, newItem]);
    reset();
  }

  return (
    <>
      <form onSubmit={handleSubmit(addToList)}>
        <input {...register("title")} placeholder="Название" />
        <input {...register("description")} placeholder="Описание" />
        <button type="submit">Добавить в список</button>
      </form>

      <ul>
        {data.map((item: AppItem) => (
          <li>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </li>
        ))}
      </ul>
    </>
  );
};

export default App;
