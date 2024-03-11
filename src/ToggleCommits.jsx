import React, {useState} from "react";

const ToggleCommits = (props) => {
    const [isVisible, setIsVisible] = useState();

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    return (
        <div onClick={toggleVisibility}>
            {isVisible ? props.repoName : "Not Shown"}
        </div>
    );
};

export default ToggleCommits;