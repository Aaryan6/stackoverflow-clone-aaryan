import React from "react";
import "./SuggestionBox.css";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import MiniProfile from "./MiniProfile";

const SuggestionBox = () => {
  const usersList = useSelector((state) => state.usersReducer);
  const currentUser = useSelector((state) => state.currentUserReducer);

  const [userlist, setUserlist] = useState([]);

  useEffect(() => {
    setUserlist(usersList);
  }, [usersList]);

  return (
    <div className="side-box">
      <span className="title">Suggestion for you</span>
      <div className="list">
        {userlist
          ?.filter((u) => u._id !== currentUser?.result._id)
          .map((user) => {
            return (
              <MiniProfile
                user={user}
                key={user._id}
                currentUserId={currentUser?.result._id}
              />
            );
          })}
      </div>
    </div>
  );
};

export default SuggestionBox;
