import React, { FC, useEffect, useState } from 'react';

interface AppItem {
  title: string,
  description: string
}

const App:FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [data, setData] = useState([])

  useEffect(() => {
    fetch('http://localhost:3000')
    .then(response => response.json())
    .then(data => setData(data))
  }, [title])

  const handleButtonClick = () => {
    const data = { title: title, description: description };

    fetch('http://localhost:3000', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error('Error:', error));
      setDescription('')
      setTitle('')
  };

  return (
    <div>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button onClick={handleButtonClick}>Отправить на сервер</button>

      <ul>
        {data.map((item: AppItem) => (
          <li>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
