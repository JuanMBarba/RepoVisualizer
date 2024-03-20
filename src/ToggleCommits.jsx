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
            const response = await fetch('https://api.github.com/repos/Netflix/'+props.repoName+'/commits', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json', // Example of a header
                    'Authorization': 'Bearer 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', // Example of an Authorization header
                    'X-GitHub-Api-Version': '2022-11-28'
                }
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
                    <ul>
                        <li>Username: {commit.commit.author.name}</li>
                        <li>Date: {commit.commit.author.date}</li>
                        <li>Hash: {commit.sha}</li>
                    </ul>
                    <ul>
                        <li>Message: </li>
                        <li>{commit.commit.message}</li>
                    </ul>
                </div>
            )
        return (
            <div className="commitList">{result}</div>
        );
    };

    return (
        <div className="gridSpanCol">
            <div className="highlighted clickable commitButton" onClick={toggleVisibility}>{isVisible && isDataFetched ? "Commits ▾" : "Commits ▸"}</div>
            {isVisible && isDataFetched ? commitLists() : ""}
        </div>
    );
};

export default ToggleCommits;