import GMap from "./GMap";
import React, { useState, useEffect } from "react";
import styles from "../css/Map.module.css";

// load google map script
const loadGoogleMapScript = (callback) => {
  if (
    typeof window.google === "object" &&
    typeof window.google.maps === "object"
  ) {
    callback();
  } else {
    const googleMapScript = document.createElement("script");
    googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_API_KEY}`;
    window.document.body.appendChild(googleMapScript);
    googleMapScript.addEventListener("load", callback);
  }
};

const Map = () => {
  const [loadMap, setLoadMap] = useState(false);

  useEffect(() => {
    loadGoogleMapScript(() => {
      setLoadMap(true);
    });
  }, []);

  return (
    <div className={styles.body}>
      <br />
      <br />
      {!loadMap ? <div>Loading...</div> : <GMap className={styles.map}/>}
    </div>
  );
};

export default Map;
