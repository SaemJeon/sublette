import React, { useEffect, useState } from 'react'
import { dbService, storage } from '../fbase';
import { getDocs, query, collection, onSnapshot } from "firebase/firestore";
import { getStorage, ref, listAll, list} from 'firebase/storage';

const Loader = () => {

    const [isLoaded, setIsLoaded] = useState(false);
    const [listData, setListData] = useState([]);
    const [imgListData, setImgListData] = useState([]);
    
    useEffect(() => {
        const que = query(collection(dbService, "listings"));
        onSnapshot(que, (snapshot)=> { const snapData = snapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}))
        // console.log((await getDocs(que).then((res) => res.forEach((doc) => console.log(doc.data())))));
        // const querySnapshot = await getDocs(que).then((res) => {
        //     res.forEach((doc) => {
        //         answer.push([doc.data(), doc.id]);
        //     })
        // })
        // Update List
        setListData(snapData);
        setIsLoaded(true)});
    }, []);
    console.log(listData);

    // useEffect(() =>{
    //     getImages();
    // }, [isLoaded]);

    // console.log(listData.length);
    // async function getImages() {
    //     // Store the data in a list;
    //     listData.map((item) => {
    //         const listRef = ref(storage, item.id);
    //         listAll(listRef).then((res) => {
    //             res.items.map((itemRef) => {
    //                     setImgListData((prev) => ([["https://storage.googleapis.com/"+ itemRef._location.bucket + "/" + itemRef._location.path], ...prev]));
    //             });
    //         }).catch((error) => {console.log(error)})
    //     });
    //     };
    // console.log(listData);
    // const imgArr = imgListData.map((item) => <img src={item[0][0]}/>);

    return (
        <RenderData dataList={listData}></RenderData>
    )
}

// No order is given to check which belongs to which so we will now put a restriction to make only one picture upload per item.
function RenderData({dataList}) {
    const data = dataList.map((item, idx) => 

    <div>
        {/* <img src={imgList[idx]} key={idx}/> */}
        <div>{item.bathroom}</div>
    </div>);
    
    return  (
        <div>{data}</div>
    )
}

export default Loader