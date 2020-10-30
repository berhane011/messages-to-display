import React from "react";
import "./Message.css";

function Message({ uuid, sendAt, content, senderuuid, deleted }) {
  return (
    <div className="list container bg-info rounded">
      <ul className="list-group">
        <li className="page-item">{senderuuid}</li>
        <li className="page-item"> {sendAt}</li>
        <li className="page-item">{uuid}</li>
        <li className="page-item">{content}</li>
      </ul>
      <button onClick={deleted} className="delete__item">
        delete
      </button>
    </div>
  );
}

export default Message;
