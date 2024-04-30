import React, {useState, useEffect} from "react";

const ToggleCommits = (props) => {
    const [commits, setCommits] = useState();
    const [isVisible, setIsVisible] = useState();
    const [isDataFetched, setIsDataFetched] = useState(false);

    const toggleVisibility = () => {
        fetchData();
        setIsVisible(!isVisible);
    };

    const fetchData = async () => {
        if(!isDataFetched){
            const response = await fetch('https://api.github.com/repos/'+props.companyName+'/'+props.repoName+'/commits', {
                method: 'GET'
                // ,
                // headers: {
                //     'Content-Type': 'application/json', // Example of a header
                //     'Authorization': 'Bearer //ADD TOKEN HERE//', // Example of an Authorization header
                //     'X-GitHub-Api-Version': '2022-11-28'
                // }
            });
            const data = await response.json();
            console.log(data);
            setCommits(data);
            setIsDataFetched(true);
            
        }
    };

    const commitLists = () => {
        let result = commits
            .map((commit) =>
                <div key={commit.node_id} className="commitInfo grid">
                    <ul className="repoTitles">
                        <li>Username</li>
                        <li>Date</li>
                        <li>Hash</li>
                    </ul>
                    <ul>
                        <li>: {commit.commit.author.name}</li>
                        <li>: {commit.commit.author.date}</li>
                        <li>: {commit.sha}</li>
                    </ul>
                    <div className="repoTitles">Message: </div>
                    <span>{commit.commit.message}</span>
                </div>
            )
        return (
            <div className="commitList">{result}</div>
        );
    };

    return (
        <div className="gridSpanCol">
            <div className="highlighted clickable commitButton" onClick={toggleVisibility}>{isVisible && isDataFetched ? "Commits ▾" : "Commits ▸"}</div>
            {console.log(commits)}
            {console.log(isDataFetched)}
            {isVisible && isDataFetched ? commitLists() : ""}
        </div>
    );
};

export default ToggleCommits;