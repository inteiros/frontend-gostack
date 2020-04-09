import React, {useState, useEffect} from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [projects, setProjects] = useState([]);

  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [techs, setTechs] = useState('');

  useEffect(() =>{
    api.get('repositories').then(response=>{
      setProjects(response.data);
    }, []);
  });
  
  console.log(projects)
  async function handleAddRepository(e) {
    e.preventDefault();

    const form = {
      title,
      url,
      techs,
    };

    const response = await api.post('repositories', form);

    const project = response.data;
    setProjects([...projects, project]);
  }

  async function handleRemoveRepository(id) { 
    await api.delete(`repositories/${id}`)
  }
  return (
    <div>
      <ul data-testid="repository-list">
  {projects.map(project => <li key={project.id}>{project.title} <button key ={project.id} onClick={() => handleRemoveRepository(project.id)}>Remover</button> </li>)}
      </ul>

      <input placeholder="Título"
      value={title}
      onChange={e => setTitle(e.target.value)}></input>

      <input placeholder="URL"
      value={url}
      onChange={e => setUrl(e.target.value)}></input>

      <input placeholder="Techs"
      value={techs}
      onChange={e => setTechs(e.target.value)}></input>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
