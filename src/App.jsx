import React, {useState, useEffect} from 'react';
import "./reset.css";
import "./App.css";
import ToggleCommits from './ToggleCommits';

const App = () => {
  const [repos, setRepo] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://api.github.com/orgs/Netflix/repos');
      const data = await response.json();
      console.log(data);
      setRepo(data);
    };
    fetchData();
  }, []);

  const repoLists = () => {
    let result = repos
    .sort((repo1, repo2) => repo2.stargazers_count - repo1.stargazers_count)
    .map((repo) =>
      <ul key={repo.name} className='repoInfo'>
        <li>Repo name : {repo.name}</li>
        <li>Language : {repo.language}</li>
        <li>Description : {repo.description}</li>
        <li>Star count : {repo.stargazers_count}</li>
        <li>Fork count : {repo.forks_count}</li>
        <li>Date created : {repo.created_at}</li>
        <ToggleCommits repoName={repo.name}/>
      </ul>
    )
    return result;
  };

  return (
    <div className='repoVisualizerPage'>
      <h1 className='orgTitle'>
        Neflix Repos
      </h1>
      <ul className='repoList'>
        {/* <ul className='repoInfo'>
          <li>Repo name : {repos[0].name}</li>
          <li>Language : {repos[0].language}</li>
          <li>Description : {repos[0].description}</li>
          <li>Star count : {repos[0].stargazers_count}</li>
          <li>Fork count : {repos[0].forks_count}</li>
          <li>Date created : {repos[0].created_at}</li>
        </ul> */}
        {repos !== undefined ? repoLists() : "Loading..."}
      </ul>
    </div>
  );
};

export default App;
