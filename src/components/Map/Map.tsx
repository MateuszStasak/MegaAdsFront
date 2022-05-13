
import React from 'react';
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";

import "../../utils/fix-map-icon"

import 'leaflet/dist/leaflet.css'
import './Map.css'


export const Map = () => {
    return (
            <div className="map">
                <MapContainer center={[21.017532,52.237049]} zoom={13}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> & contributors"
                    />
                    <Marker position={[21.017532,52.237049]}>
                        <Popup>
                            <h2>Warsaw</h2>
                        </Popup>
                    </Marker>
                </MapContainer>
            </div>
    );
};