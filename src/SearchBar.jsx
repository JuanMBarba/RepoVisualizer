import React,{useState} from "react";

const SearchBar = (props) => {
    const [query, setQuery] = useState('');

    const handleChange = (event) => {
        setQuery(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        props.sendDatatoApp(query);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text"
                value={query}
                onChange={handleChange}
                placeholder="Enter Organization Name"
                className="searchInput"
            />

        </form>
    );
};

export default SearchBar;