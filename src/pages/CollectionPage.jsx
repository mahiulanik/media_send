import React, { useState } from "react";
import { useSelector } from "react-redux";
import CollectionCard from "../components/CollectionCard";

const CollectionPage = () => {
  const collection = useSelector((state) => state.collection.items);
  const [page, setPage] = useState(1);
  const PER_PAGE = 30;

  const start = (page - 1) * PER_PAGE;
  const end = start + PER_PAGE;
  const currentItems = collection.slice(start, end);
  const totalPages = Math.ceil(collection.length / PER_PAGE);

  return (
    <div>
      <div className="flex justify-start w-full flex-wrap gap-6 overflow-auto px-10 py-6">
        {currentItems.length === 0 ? (
          <h2 className="text-white text-center w-full mt-20 text-4xl">
            No Saved Items!
          </h2>
        ) : (
          currentItems.map((item, idx) => (
            <div key={idx}>
              <CollectionCard item={item} />
            </div>
          ))
        )}
      </div>

      {/* Pagination — collection এ ৩০ এর বেশি item থাকলে দেখাবে */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 py-10">
          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            className={`px-4 py-2 rounded ${page === 1 ? "bg-gray-700 text-gray-500 cursor-not-allowed" : "bg-gray-600 hover:bg-gray-500 cursor-pointer"}`}
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`px-4 py-2 rounded ${p === page ? "bg-blue-600" : "bg-gray-600 hover:bg-gray-500 cursor-pointer"}`}
            >
              {p}
            </button>
          ))}

          <button
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
            className={`px-4 py-2 rounded ${page === totalPages ? "bg-gray-700 text-gray-500 cursor-not-allowed" : "bg-gray-600 hover:bg-gray-500 cursor-pointer"}`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default CollectionPage;
