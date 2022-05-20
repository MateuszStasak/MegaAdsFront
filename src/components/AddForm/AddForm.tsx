import React, {
    SyntheticEvent,
    useState
} from 'react';

import "./AddForm.css";
import {Button} from "../common/Button";
import {geocode} from "../../utils/geocoding";
import {apiUrl} from "../../config/api";

export const AddForm = () => {
    const [loading, setLoading] = useState(false);
    const [id, setId] = useState(null);
    const [form, setForm] = useState({
        name: '',
        description: '',
        price: 0,
        url: '',
        city: '',
        street: '',
        zip: '',
    });

    const address = `${form.city}, ${form.street}`;
    console.log(address);

    const saveAd = async (e: SyntheticEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
           const {latitude, longitude} = await geocode(address);
            const res = await fetch(`${apiUrl}/ad`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...form,
                    latitude,
                    longitude,
                }),
            });
            const data = await res.json();
            setId(data.id);
        } finally {
            setLoading(false);
        }
    };

    const updateForm = (key: string, value: string | number) => {
        setForm(form => ({
            ...form,
            [key]: value,
        }));
    };

    if (loading) {
        return <h2>Trwa dodawanie ogłoszenia...</h2>
    }

    if (id) {
        return <h2>Twoje ogłoszenie "{form.name}" zostało poprawnie dodane do serwisu pod ID: {id}</h2>
    }

    return (
        <>
        <form className="add-form" onSubmit={saveAd}>
            <h1>Dodaj swoje ogłoszenie</h1>
            <p>
                <label>
                    Nazwa: <br/>
                    <input
                        type="text"
                        name="name"
                        required
                        maxLength={99}
                        value={form.name}
                        onChange={e => updateForm('name', e.target.value)}/>
                </label>
                <label>
                    Opis: <br/>
                    <textarea
                        name="description"
                        required
                        maxLength={999}
                        value={form.description}
                        onChange={(e: { target: { value: string | number; }; }) => updateForm('description', e.target.value)}
                    />
                </label>
                <label>
                    Cena: <br/>
                    <input
                        type="number"
                        name="price"
                        required
                        value={form.price}
                        onChange={(e: { target: { value: string | number; }; }) => updateForm('price', +e.target.value)}
                    />
                    <small> zero w polu, aby nie wyświetlać ceny.</small>
                </label>
                <label>
                    Adres URL: <br/>
                    <input
                        type="url"
                        name="name"
                        maxLength={99}
                        value={form.url}
                        onChange={(e: { target: { value: string | number; }; }) => updateForm('url', e.target.value)}
                    />
                </label>
                <label>
                    Miasto: <br/>
                    <input
                        type="text"
                        name="city"
                        required
                        maxLength={99}
                        value={form.city}
                        onChange={(e: { target: { value: string | number; }; }) => updateForm('city', e.target.value)}
                        />
                </label>
                <label>
                        Ulica: <br/>
                        <input
                            type="text"
                            name="street"
                            required
                            maxLength={99}
                            value={form.street}
                            onChange={(e: { target: { value: string | number; }; }) => updateForm('street', e.target.value)}
                        />
                </label>
                <Button text="Zapisz"/>
            </p>
        </form>
        <div><p></p></div>
        </>
    )
}