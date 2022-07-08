import React, { useCallback, useEffect, useState } from "react";
import L from "leaflet";
import "./showPosts.scss";
import useSupercluster from "use-supercluster";
import { Marker, Popup, useMap } from "react-leaflet";
import { Link } from "react-router-dom";

// The current library contains some compatibility issues ( try later if solved ? )
// This code has been made thanks to https://www.youtube.com/watch?v=hkrnyDg3nxg

const icons = {};
const fetchIcon = (count, size) => {
  if (!icons[count]) {
    icons[count] = L.divIcon({
      html: `<div class="cluster-marker" style="width: ${size}px; height: ${size}px;">
        ${count}
      </div>`,
    });
  }
  return icons[count];
};

// const cuffs = new L.Icon({
//   iconUrl: "/handcuffs.svg",
//   iconSize: [25, 25],
// });

export default function ShowPosts ( data ) {
  const maxZoom = 22;
  const [bounds, setBounds] = useState(null);
  const [zoom, setZoom] = useState(12);
  const map = useMap();

  // get map bounds
  function updateMap() {
    console.log("updating");
    const b = map.getBounds();
    setBounds([
      b.getSouthWest().lng,
      b.getSouthWest().lat,
      b.getNorthEast().lng,
      b.getNorthEast().lat,
    ]);
    setZoom(map.getZoom());
  }

  const onMove = useCallback(() => {
    updateMap();
  }, [map]);

  React.useEffect(() => {
    updateMap();
  }, [map]);

  useEffect(() => {
    map.on("move", onMove);
    return () => {
      map.off("move", onMove);
    };
  }, [map, onMove]);

  const points = data.data.map((spot) => ( console.log(spot),{
     
    type: "Feature",
    properties: { cluster: false, spotId: spot.name },
    infos: {
      name: spot.title,
      desc: spot.desc,
      image: spot.photo,
      type: spot.type,
      categories: spot.categories,
      link: `/post/${spot._id}`
    } ,
    geometry: {
      type: "Point",
      coordinates: [
        parseFloat(spot.position.lng),
        parseFloat(spot.position.lat),
      ],
    },
  }));

  const { clusters, supercluster } = useSupercluster({
    points: points,
    bounds: bounds,
    zoom: zoom,
    options: { radius: 250, maxZoom: 17 },
  });

  console.log(clusters.length);

  return (
    <>
      {clusters.map((cluster) => {
        // every cluster point has coordinates
        const [longitude, latitude] = cluster.geometry.coordinates;
        // the point may be either a cluster or a crime point
        const { cluster: isCluster, point_count: pointCount } =
          cluster.properties;

        // we have a cluster to render
        if (isCluster) {
          return (
            <Marker
              key={`cluster-${cluster.id}`}
              position={[latitude, longitude]}
              icon={fetchIcon(
                pointCount,
                10 + (pointCount / points.length) * 40
              )}
              eventHandlers={{
                click: () => {
                  const expansionZoom = Math.min(
                    supercluster.getClusterExpansionZoom(cluster.id),
                    maxZoom
                  );
                  map.setView([latitude, longitude], expansionZoom, {
                    animate: true,
                  });
                },
              }}
            />
          );
        }

        // we have a single point (crime) to render
        return (
          <Marker
            key={`spot-${cluster.properties.spotId}`}
            position={[latitude, longitude]}
          >
            <Popup className="popup">
              <div className="popupContainer">
                <img src={cluster.infos.image} alt="image" />
                <h2 className="popupTitle">{cluster.infos.name}</h2>
                <span className="popupType">{cluster.infos.type}</span>
                <ul>
                  {cluster.infos.categories && cluster.infos.categories.map((cat)=> (
                    <li className="singleCat">{cat}</li>
                  ))}
                </ul>
                <Link to={cluster.infos.link} className='linkSpot'>See Spot !</Link>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </>
  );
}
