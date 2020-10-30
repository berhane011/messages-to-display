import "./App.css";
import { messages } from "./data.json";
import Message from "./Message";
import React, { useState } from "react";
import moment from "moment";
import img from "./img.jpg";

import Pagination from "./Pagination";
import Jambotrun from "./Jambotrun";
function App() {
  // sort the array in to  ascending order
  const sorted = messages.sort(function (a, b) {
    return new Date(a.sentAt) - new Date(b.sentAt);
  });
  // deduplicated if the uuid and content are the same.
  const filteredArr = sorted.reduce((acc, current) => {
    const x = acc.find(
      (item) => item.uuid === current.uuid || item.sentAt === current.sentAt
    );
    if (!x) {
      return acc.concat([current]);
    } else {
      return acc;
    }
  }, []);
  // get current messages
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setpostsPerPage] = useState(5);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredArr.slice(indexOfFirstPost, indexOfLastPost);

  const [state, setstate] = useState(messages);
  const deletehandler = (index) => {
    messages.splice(index, 1);
    setstate({ messages });
  };
  //change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="back-img">
      <Jambotrun />
      <div className="App container">
        {currentPosts.map((item, index) => (
          <Message
            key={index}
            uuid={item.uuid}
            content={item.content}
            sendAt={moment(item.sentAt).format("dddd/MM/DD/YYYY")}
            senderuuid={item.senderUuid}
            deleted={() => deletehandler(index)}
          />
        ))}
      </div>
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={filteredArr.length}
        paginate={paginate}
      />
    </div>
  );
}

export default App;
