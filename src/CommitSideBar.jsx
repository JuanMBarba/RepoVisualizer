import React, {useState, useEffect} from "react";

const CommitSideBar = (props) => {
    const commitLists = () => {
        let result = props.commits
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
        <div>
            commitLists()
        </div>
    );
};

export default CommitSideBar;