import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActiveTab } from "../app/features/searchSlice";

const Tabs = () => {
  const tabs = ["photos", "videos", "gif"];

  const dispatch = useDispatch();
  const activeTab = useSelector((state) => state.search.activeTab);
  return (
    <div className="flex gap-5 p-10">
      {tabs.map(function (element, idx) {
        return (
          <button
            className={`${activeTab == element ? "bg-blue-600" : "bg-gray-600"} transition cursor-pointer active:scale-95 px-5 py-2 rounded uppercase`}
            key={idx}
            onClick={() => {
              dispatch(setActiveTab(element));
            }}
          >
            {element}
          </button>
        );
      })}
    </div>
  );
};

export default Tabs;
