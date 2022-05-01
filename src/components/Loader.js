import React, { useEffect, useState } from "react";
import { dbService, storage } from "../fbase";
import { getDocs, query, collection, onSnapshot } from "firebase/firestore";
import { getStorage, ref, listAll, list } from "firebase/storage";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const Loader = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [listData, setListData] = useState([]);
  const [imgListData, setImgListData] = useState([]);
  const [imgDict, setImgDict] = useState({});

  useEffect(() => {
    const que = query(collection(dbService, "listings"));
    onSnapshot(que, (snapshot) => {
      const snapData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      // console.log((await getDocs(que).then((res) => res.forEach((doc) => console.log(doc.data())))));
      // const querySnapshot = await getDocs(que).then((res) => {
      //     res.forEach((doc) => {
      //         answer.push([doc.data(), doc.id]);
      //     })
      // })
      // Update List
      setListData(snapData);
      setIsLoaded(true);
    });
  }, []);
  //   console.log(listData);

  useEffect(() => {
    getImages();
  }, [isLoaded]);

  //   console.log(listData.length);
  async function getImages() {
    // Store the data in a list;
    listData.map((item) => {
      const listRef = ref(storage, item.id);
      const itemId = item.id;
      const tempList = [];
      listAll(listRef)
        .then((res) => {
          res.items.map((itemRef) => {
            tempList.push([
              "https://storage.googleapis.com/" +
                itemRef._location.bucket +
                "/" +
                itemRef._location.path,
            ]);
          });
        })
        .catch((error) => {
          console.log(error);
        });
      //   console.log(itemId);
      setImgListData((prev) => [tempList, ...prev]);
    });
  }
  //   console.log(imgListData);
  //   const imgArr = imgListData.map((item) => <img src={item[0][0]} />);

  return <RenderData dataList={listData}></RenderData>;
  //   return <TestFunction dataList={(listData, imgListData)}></TestFunction>;
};

// No order is given to check which belongs to which so we will now put a restriction to make only one picture upload per item.
function RenderData({ dataList }) {
  const data = dataList.map((item, idx) => (
    <div>
      {/* <img src={imgList[idx]} key={idx}/>
        <div>{item.bathroom}</div> */}
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          alt="green iguana"
          height="140"
          image={item.imageLink}
        />
        <CardContent>
          <Typography gutterBottom variant="body2" component="div">
            {item.value}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {item.formattedFrom} - {item.formattedTo}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            ${item.price}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {item.bedroom}bds {item.bathroom}ba
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Contact</Button>
        </CardActions>
      </Card>
    </div>
  ));

  return <div>{data}</div>;
}

// function TestFunction({ dataList, imgListData }) {
//   for (let index = 0; index < dataList.length; index++) {
//     const data = dataList[index];
//     console.log(data);
//     const img = imgListData[index];
//     console.log(img);
//   }
// }
export default Loader;
