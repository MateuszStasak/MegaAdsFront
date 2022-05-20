
import React, {useContext, useEffect, useState} from 'react';
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import '../../utils/fix-map-icon';
import {SearchContext} from "../../contexts/search.context";
import {SimpleAdEntity} from 'types';
import { SingleAd } from './SingleAd';

import 'leaflet/dist/leaflet.css';
import './Map.css';
import {apiUrl} from "../../config/api";


export const Map = () => {
    const {search} = useContext(SearchContext);
    const [ads, setAds] = useState<SimpleAdEntity[]>([]);

    useEffect(() => {
        (async () => {
            const res = await fetch(`${apiUrl}/ad/search/${search}`);
            const data = await res.json();
            setAds(data);
        })();
    }, [search]);

    return (
            <div className="map">
                <MapContainer center={[52.237049,21.017532]} zoom={13}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> & contributors"
                    />
                    {ads.map(ad => (
                        <Marker key={ad.id} position={[ad.latitude, ad.longitude]}>
                        <Popup className="popup">
                            <SingleAd id={ad.id}/>
                        </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </div>
    );
};