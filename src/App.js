import React, {useState, useEffect} from 'react';
import "./reset.css";
import "./App.css";

const App = () => {
  const [repos, setRepo] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://api.github.com/orgs/Netflix/repos');
      const data = await response.json();
      console.log(data);
      setRepo(data);
    };
    fetchData();
  }, []);

  return (
    <div className='repoVisualizerPage'>
      <h1 className='orgTitle'>
        Neflix Repos
      </h1>
      <ul className='repoList'>
        <ul className='repoInfo'>
          <li>Repo name : {repos[0].name}</li>
          <li>Language : {repos[0].language}</li>
          <li>Description : {repos[0].description}</li>
          <li>Star count : {repos[0].stargazers_count}</li>
          <li>Fork count : {repos[0].forks_count}</li>
          <li>Date created : {repos[0].created_at}</li>
        </ul>
      </ul>
    </div>
  );
};

export default App;
