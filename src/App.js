import React, { useState, useEffect } from "react";

import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data ? response.data : []);
    })
  }, []);

  async function handleAddRepository() {
    const timestamp = Date.now();
    const res = await api.post('/repositories', {
      title: `Repo ${timestamp}`,
      url: `https://github.com/repo-${timestamp}`,
      techs: ['React'],
    });

    const repository = res.data;

    if (repository) {
      setRepositories([...repositories, repository]);
    }
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);

    const repos = repositories.filter(repo => repo.id !== id);
    
    setRepositories(repos);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repo => {
          return <li key={repo.id}>
            {repo.title}
            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
            </button>
          </li>
        })}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
