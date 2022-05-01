// import React, { useEffect, useState } from "react";
// import { StreamChat } from "stream-chat";
// import {
//   Chat,
//   Channel,
//   ChannelHeader,
//   ChannelList,
//   MessageList,
//   MessageInput,
//   Thread,
//   Window,
// } from "stream-chat-react";
// import "stream-chat-css/dist/css/index.css";

// const filters = { type: "messaging" };
// const options = { state: true, presence: true, limit: 10 };
// const sort = { last_message_at: -1 };

// const App = () => {
//   const [client, setClient] = useState(null);

//   useEffect(() => {
//     const newClient = new StreamChat("vxdks9br2f8a");

//     const handleConnectionChange = ({ online = false }) => {
//       if (!online) return console.log("connection lost");
//       setClient(newClient);
//     };

//     newClient.on("connection.changed", handleConnectionChange);

//     newClient.connectUser(
//       {
//         id: "Hajun",
//         name: "Hajun",
//       },
//       // newClient.devToken("Saem")
//       "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiaGFqdW4ifQ.GkvjQ7Qp1gdNiVzPHqmzqn0jNvk6iB0bvH0qEPoEkAM"
//     );

//     return () => {
//       newClient.off("connection.changed", handleConnectionChange);
//       newClient.disconnectUser().then(() => console.log("connection closed"));
//     };
//   }, []);

//   if (!client) return null;

//   return (
//     <Chat client={client}>
//       <ChannelList filters={filters} sort={sort} options={options} />
//       <Channel>
//         <Window>
//           <ChannelHeader />
//           <MessageList />
//           <MessageInput />
//         </Window>
//         <Thread />
//       </Channel>
//     </Chat>
//   );
// };

// export default App;
