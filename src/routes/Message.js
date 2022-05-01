// import React, { useEffect, useState } from "react";
// import { StreamChat } from "stream-chat";
// import {
//   Chat,
//   Channel,
//   ChannelHeader,
//   MessageInput,
//   MessageList,
//   Thread,
//   Window,
//   userChat,
// } from "stream-chat-react";
// import "stream-chat-react/dist/css/index.css";

// const api_key = "vxdks9br2f8a";

// function Message() {
//   const [token, setToken] = useState(0);
//   const [client, setClient] = useState(null);

//   // useEffect(() => {
//   //   fetch(
//   //     "https://cors-anywhere.herokuapp.com/https://sublette-api.herokuapp.com/get_token/Hajun"
//   //   )
//   //     .then((res) => res.json())
//   //     .then((data) => {
//   //       console.log(data);
//   //       setToken(data.token);
//   //     });
//   // });

//   const handleConnectionChange = ({ online = false }) => {
//     if (!online) return console.log("connection lost");
//     setClient(newClient);
//     console.log(newClient);
//   };

//   const newClient = new StreamChat(api_key);

//   newClient.on("connection.changed", handleConnectionChange);

//   <Chat client={newClient}>{/** children of Chat component*/}</Chat>;

//   newClient.connectUser(
//     {
//       id: "Hajun",
//       name: "Hajun",
//     },
//     newClient.devToken("Hajun")
//   );

//   const channel = newClient.channel("messaging", {
//     // image: "dave.png",
//     name: "New message",
//     members: ["Hajun", "sj846"],
//     // option to add custom fields
//   });

//   return (
//     <Chat client={newClient}>
//       <Channel channel={channel}>
//         <Window>
//           <ChannelHeader />
//           <MessageList />
//           <MessageInput />
//         </Window>
//         <Thread />
//       </Channel>
//     </Chat>
//   );
// }

// export default Message;
