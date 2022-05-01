import React, { useEffect, useState } from "react";
import { dbService, storage, authService } from "../fbase";
import {
  getDocs,
  query,
  collection,
  onSnapshot,
  where,
} from "firebase/firestore";
import { getStorage, ref, listAll, list } from "firebase/storage";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import styles from "../css/Profile.module.css";

const Profile = () => {
  const uid = authService.currentUser.uid;
  const [isLoaded, setIsLoaded] = useState(false);
  const [listData, setListData] = useState([]);
  const [imgListData, setImgListData] = useState([]);
  const [imgDict, setImgDict] = useState({});

  useEffect(() => {
    const queRef = collection(dbService, "listings");
    const que = query(queRef, where("uid", "==", uid));
    onSnapshot(que, (snapshot) => {
      const snapData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setListData(snapData);
      setIsLoaded(true);
    });
  }, []);
  console.log(listData);

  return <RenderData dataList={listData}></RenderData>;
};

function RenderData({ dataList }) {
  const data = dataList.map((item, idx) => (
    <div className={styles.body}>
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

  return (
    <div>
      <h3>Here are your listings!</h3>
      {data}
    </div>
  );
}

export default Profile;
