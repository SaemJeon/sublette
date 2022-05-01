import React, { useEffect, useRef, useState } from "react";
import { dbService, storage } from "../fbase";
import { getDocs, query, collection } from "firebase/firestore";
import { getStorage, ref, listAll } from "firebase/storage";

const GMap = () => {
  const googleMapRef = useRef(null);
  let googleMap = null;
  const [listData, setListData] = useState([]);

  useEffect(() => {
    googleMap = initGoogleMap();
    getData();
    // createMarker();
  }, []);

  const getData = async () => {
    // Store the data in a list;
    let answer = [];
    const que = query(collection(dbService, "listings"));
    const querySnapshot = await getDocs(que);
    querySnapshot.forEach((doc) => {
      answer.push([doc.data(), doc.id]);
      drawMarker(doc.data().geo);
    });
    // Update List
    setListData(answer);
  };

  console.log(listData);

  // initialize the google map
  const initGoogleMap = () => {
    return new window.google.maps.Map(googleMapRef.current, {
      center: { lat: 39.95964432788919, lng: -75.19263827252368 },
      zoom: 8,
    });
  };

  const drawMarker = (geo) => {
    new window.google.maps.Marker({
      position: { lat: geo[0], lng: geo[1] },
      map: googleMap,
    });
  };

  // create marker on google map
  const createMarker = () =>
    new window.google.maps.Marker({
      position: { lat: -34.397, lng: 150.644 },
      map: googleMap,
    });

  return <div ref={googleMapRef} style={{ width: 600, height: 500 }} />;
};

export default GMap;
