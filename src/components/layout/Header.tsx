import React, {
    useContext,
    useState
} from 'react';
import { Button } from '../common/Button';
import {SearchContext} from "../../contexts/search.context";

import './Header.css'

export const Header = () => {
    const {search, setSearch} = useContext(SearchContext);
    const [inputValue, setInputValue] = useState(search);

    const setSearchFromLocalState = (e: React.SyntheticEvent) => {
        e.preventDefault();
        setSearch(inputValue);
    };

    return (
        <header>
            <h1>
                <strong>Mega </strong> Ogłoszenia
            </h1>
            <Button text='Dodaj ogłoszenie' />
            <form className="search" onSubmit={setSearchFromLocalState}>
                <input value={inputValue} onChange={(e) => setInputValue(e.target.value)} type="text"/>
                <Button text='Szukaj' />
            </form>
        </header>
  );
};