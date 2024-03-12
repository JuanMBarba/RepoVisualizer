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
                <ul key={commit.node_id} className='repoInfo'>
                    <li>Message: {commit.commit.message}</li>
                </ul>
            )
        return result;
    };

    return (
        <div onClick={toggleVisibility}>
            {isVisible && isDataFetched ? commitLists() : "Commits >"}
        </div>
    );
};

export default ToggleCommits;