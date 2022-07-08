import './map.scss'
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet'
import React, { useState } from 'react';
import ShowPosts from '../showPosts/ShowPosts';



export default function Map(post, handleLocation) {

  return (
    <>
    <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={true} style={{height:"100%"}}>
             <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
             ></TileLayer>
            <ShowPosts data={post.post} />

    </MapContainer>

    </>
  )
}
