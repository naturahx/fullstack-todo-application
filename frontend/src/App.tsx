import React, { FC, useEffect, useState } from "react";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import "./App.css";

interface AppItem {
  title: string;
  description: string;
}

const validationSchema = Yup.object().shape({
  title: Yup.string().min(3, 'Название должно содержать не менее 3 символов').required('Название обязательно'),
  description: Yup.string().min(5, 'Описание должно содержать не менее 5 символов').required('Описание обязательно'),
});

const App: FC = () => {
  const [data, setData] = useState<AppItem[]>([]);
  
  useEffect(() => {
    fetch("http://localhost:3000")
      .then((response) => response.json())
      .then((data) => setData(data));
  }, [data]);

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values: any) => {
      const newData = { title: values.title, description: values.description };

      fetch("http://localhost:3000", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newData),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setData([...data, newData]);
        })
        .catch((error) => console.error("Error:", error));

      formik.resetForm();
    },
  });

  return (
    <>
      <h1>FullStack ToDo</h1>
      <form onSubmit={formik.handleSubmit}>
        <input
          name="title"
          placeholder="Название"
          value={formik.values.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />

        <input
          name="description"
          placeholder="Описание"
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
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
