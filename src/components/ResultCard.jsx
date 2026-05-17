import React from "react";
import { useDispatch } from "react-redux";
import { addedToast } from "../app/features/collectionSlice";
import { addCollection } from "../app/features/collectionSlice";

const ResultCard = ({ item }) => {
  const dispatch = useDispatch();

  const addToCollection = (item) => {
    dispatch(addCollection(item));
    dispatch(addedToast());
  };

  const shareItem = async (item) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: item.type.toUpperCase(),
          text: "Shared by Media Send",
          url: item.url,
        });
      } catch (error) {
        // user cancel করলেও error আসে, তাই ignore করলাম
        console.log("Share cancelled");
      }
    } else {
      // browser Web Share API support না করলে
      navigator.clipboard.writeText(item.url);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <div className="w-[18vw] relative h-80 bg-white rounded-xl overflow-hidden">
      <a className="h-full" target="_blank" href={item.url}>
        {item.type == "photo" ? (
          <img
            className="h-full w-full object-cover object-center"
            src={item.src}
            alt=""
          />
        ) : (
          ""
        )}
        {item.type == "video" ? (
          <video
            className="h-full w-full object-cover object-center"
            autoPlay
            loop
            muted
            src={item.src}
          ></video>
        ) : (
          ""
        )}
        {item.type == "gif" ? (
          <img
            className="h-full w-full object-cover object-center"
            src={item.src}
            alt=""
          />
        ) : (
          ""
        )}
      </a>
      <div
        id="bottom"
        className="flex justify-between gap-3 items-center w-full px-4 py-6 absolute bottom-0 text-white"
      >
        <h2 className="text-lg font-semibold capitalize h-14 overflow-hidden">
          {item.title}
        </h2>

        <div className="flex gap-2">
          {" "}
          {/* ← Save আর Share পাশাপাশি */}
          <button
            onClick={() => shareItem(item)}
            className="bg-green-600 active:scale-95 text-white rounded px-3 py-1 cursor-pointer font-medium"
          >
            Share
          </button>
          <button
            onClick={() => addToCollection(item)}
            className="bg-indigo-600 active:scale-95 text-white rounded px-3 py-1 cursor-pointer font-medium"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultCard;
