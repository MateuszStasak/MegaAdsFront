import React, {
    useContext,
    useState
} from 'react';
import { Button } from '../common/Button';
import {SearchContext} from "../../contexts/search.context";

import './Header.css'
import {Link} from "react-router-dom";

export const Header = () => {
    const {search, setSearch} = useContext(SearchContext);
    const [inputValue, setInputValue] = useState(search);

    const setSearchFromLocalState = (e: React.SyntheticEvent) => {
        e.preventDefault();
        setSearch(inputValue);
    };

    return (
        <header>
            <Link className="link" to="/">
            <h1>
                <strong>Mega </strong> Ogłoszenia
            </h1>
            </Link>
            <Button to="/add" text='Dodaj ogłoszenie' />
            <form className="search" onSubmit={setSearchFromLocalState}>
                <input type="search" value={inputValue} onChange={(e) => setInputValue(e.target.value)}/>
                <Button text='Szukaj' />
            </form>
        </header>
  );
};