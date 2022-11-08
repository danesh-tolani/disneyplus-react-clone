// The sole purpose of this component was to import data into firestore

import React, { useEffect, useRef } from "react";
import { movies } from "../moviesJSON";
import db from "../firebase";

console.log(movies);

function Upload() {
  const dataFetchedRef = useRef(false);

  // run this only once to upload the data
  //   useEffect(() => {
  //     if (dataFetchedRef.current) return;
  //     dataFetchedRef.current = true;
  //     addData(movies);
  //   }, []);

  function addData(file) {
    file.forEach(function (obj) {
      db.collection("movies")
        .add({
          backgroundImg: obj.backgroundImg,
          cardImg: obj.cardImg,
          description: obj.description,
          subTitle: obj.subTitle,
          title: obj.title,
          titleImg: obj.titleImg,
          type: obj.type,
        })
        .then(function (docRef) {
          console.log("Document written with ID: ", docRef.id);
        })
        .catch(function (error) {
          console.error("Error adding document: ", error);
        });
    });
  }

  return <div>Upload</div>;
}

export default Upload;
