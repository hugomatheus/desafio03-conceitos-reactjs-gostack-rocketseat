import React from "react";

import "./styles.css";
import { useEffect } from "react";
import api from "./services/api";
import { useState } from "react";

function App() {
  const [repositories, setRepositories] = useState([]);
  async function handleAddRepository() {
    try {
      const response = await api.post("/repositories", {
        title: "My repository",
        url: "https://github.com/hugomatheus",
        techs: ["PHP", "Node.js", "ReactJS", "React Native"],
      });
      setRepositories([...repositories, response.data]);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleRemoveRepository(id) {
    try {
      await api.delete(`/repositories/${id}`);
      const repositoryIndex = repositories.findIndex(
        (repository) => repository.id === id
      );
      repositories.splice(repositoryIndex, 1);
      setRepositories([...repositories]);
      // other way
      // const newRepositories = repositories.filter(repository => repository.id !== id);
      // setRepositories(newRepositories);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    api.get("/repositories").then((response) => {
      setRepositories(response.data);
    });
  }, []);

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
