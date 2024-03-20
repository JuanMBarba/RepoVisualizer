import React, {useState, useEffect} from 'react';
import "./reset.css";
import "./App.css";
import ToggleCommits from './ToggleCommits';

const App = () => {
  const [repos, setRepo] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://api.github.com/orgs/Netflix/repos', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json', // Example of a header
          'Authorization': 'Bearer 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', // Example of an Authorization header
          'X-GitHub-Api-Version' : '2022-11-28'
        }
      });
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
      <div key={repo.name} className='repoInfo grid'>
        <ul className='repoTitles'>
          <li>Repo Name</li>
          <li>Language</li>
          <li>Star Count</li>
          <li>Fork Count</li>
          <li>Date Created</li>
        </ul>
        <ul>
          <li> : {repo.name}</li>
          <li> : {repo.language}</li>
          <li> : {repo.stargazers_count}</li>
          <li> : {repo.forks_count}</li>
          <li> : {repo.created_at}</li>
        </ul>
        <div className='repoTitles'>Description : </div>
        <span>{repo.description}</span>
        <ToggleCommits repoName={repo.name} />
      </div>
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
