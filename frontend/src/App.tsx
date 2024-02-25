import React, { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "./App.css";

interface AppItem {
  id?: number;
  title: string;
  description: string;
}

const App: FC = () => {
  const [data, setData] = useState<AppItem[]>([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AppItem>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedPost, setEditedPost] = useState<AppItem | null>(null);

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
    const postWithId = { ...newPost, id: undefined };
    fetch("http://localhost:3000", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postWithId),
    })
      .then(() => {
        fetchData();
        reset();
      })
      .catch((error) => console.error("Error adding post:", error));
  };

  const deletePost = (id: number | undefined) => {
    if (id !== undefined) {
      fetch(`http://localhost:3000?id=${id}`, {
        method: "DELETE",
      })
        .then(() => {
          fetchData();
        })
        .catch((error) => console.error("Error deleting post:", error));
    }
  };

  const editPost = (editedPost: AppItem, id: number | undefined) => {
    if (id !== undefined) {
      fetch(`http://localhost:3000?id=${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedPost),
      })
        .then(() => {
          fetchData();
        })
        .catch((error) => console.error("Error editing post:", error));
    }
  };

  const onSubmit = (formData: AppItem) => {
    addPost(formData);
  };

  const openModal = (post: AppItem) => {
    setEditedPost(post);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setEditedPost(null);
    setIsModalOpen(false);
  };

  const updatePost = (formData: AppItem) => {
    if (editedPost) {
      editPost(formData, editedPost.id);
      closeModal();
      reset()
    }
  };

  return (
    <>
      <h1>FullStack ToDo</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          placeholder="Название"
          {...register("title", {
            required: "Название обязательно",
            minLength: {
              value: 3,
              message: "Название должно содержать не менее 3 символов",
            },
          })}
        />
        {errors.title && <p>{errors.title.message}</p>}

        <input
          placeholder="Описание"
          {...register("description", {
            required: "Описание обязательно",
            minLength: {
              value: 5,
              message: "Описание должно содержать не менее 5 символов",
            },
          })}
        />
        {errors.description && <p>{errors.description.message}</p>}

        <button type="submit">Добавить</button>
      </form>

      <div className="block">
        <ul>
          {data.map((item: AppItem) => (
            <li className="list" key={item.id}>
              <h3>Название: {item.title}</h3>
              <p>Описание: {item.description}</p>
              <button onClick={() => deletePost(item.id)}>Удалить</button>
              <button onClick={() => openModal(item)}>Редактировать</button>
            </li>
          ))}
        </ul>
      </div>

      {isModalOpen && editedPost && (
        <div onSubmit={handleSubmit(onSubmit)} className="modal">
          <h2>Редактировать пост:</h2>
          <input
           placeholder="Название"
           {...register("title", {
             required: "Название обязательно",
             minLength: {
               value: 3,
               message: "Название должно содержать не менее 3 символов",
             },
           })}
            value={editedPost.title}
            onChange={(e) =>
              setEditedPost({ ...editedPost, title: e.target.value })
            }
          />
          <input
           placeholder="Описание"
           {...register("description", {
             required: "Описание обязательно",
             minLength: {
               value: 5,
               message: "Название должно содержать не менее 5 символов",
             },
           })}
            value={editedPost.description}
            onChange={(e) =>
              setEditedPost({ ...editedPost, description: e.target.value })
            }
          />
          <button onClick={() => updatePost(editedPost)}>
            Сохранить изменения
          </button>
          <button onClick={closeModal}>Отмена</button>
        </div>
      )}
    </>
  );
};

export default App