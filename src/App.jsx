import React, {useState, useEffect} from 'react';
import "./reset.css";
import "./App.css";
import ToggleCommits from './ToggleCommits';
import SearchBar from './SearchBar';

const App = () => {
  const [repos, setRepo] = useState();
  const [currentRepo, setCurrentRepo] = useState("Netflix")

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://api.github.com/orgs/'+currentRepo+'/repos', {
        method: 'GET'
        // ,
        // headers: {
        //   'Content-Type': 'application/json', // Example of a header
        //   'Authorization': 'Bearer //ADD TOKEN HERE//', // Example of an Authorization header
        //   'X-GitHub-Api-Version' : '2022-11-28'
        // }
      });
      const data = await response.json();
      console.log(data);
      if(data.message === "Not Found"){
        setRepo([]);
      }
      else{
        setRepo(data);
      }
    };
    fetchData();
  }, [currentRepo]);

  const receiveDataFromSearchBar = (data) => {
    setCurrentRepo(data);
  };

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
        <ToggleCommits companyName={currentRepo} repoName={repo.name} />
      </div>
    )
    return result;
  };

  return (
    <div className='repoVisualizerPage'>
      <div className='orgTitle'>
        <h1 >
          {currentRepo.toUpperCase()} REPOS
        </h1>
        <SearchBar sendDatatoApp={receiveDataFromSearchBar}/>
      </div>
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
