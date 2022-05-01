import React, { useEffect, useState } from 'react'
import { dbService, storage } from '../fbase';
import { getDocs, query, collection } from "firebase/firestore";
import { getStorage, ref, listAll} from 'firebase/storage';

const Loader = () => {
    
    const [listData, setListData] = useState([]);
    const getData = async() => {
        // Store the data in a list;
        let answer = [];
        let documentid;
        const que = query(collection(dbService, "listings"));
        const querySnapshot = await getDocs(que);
        querySnapshot.forEach((doc) => {
            answer.push([doc.data(),doc.id]);
        });
        // Update List
        setListData(answer);
    }


    const getImages = async() => {
        listData.map((item) => {
            const listRef = ref(storage, item[1]);
            // console.log(listRef);
            
            listAll(listRef).then((res) => {
                console.log(res);
                res.items.forEach((itemRef) => {
                    console.log(itemRef);
                });
            }).catch((error) => {console.log(error)})
        });
    }


    useEffect(() => {
        getData();
        getImages();
    }, []);



    return (
        <div>
            
        </div>
    )
}

export default Loader