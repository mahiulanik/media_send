import React, { useEffect } from "react";

import { fetchPhotos, fetchVideos, fetchGIF } from "../api/mediaAPI";
import {
  setLoading,
  setError,
  setResults,
  setPage,
  resetPage,
  setTotalPages,
} from "../app/features/searchSlice";
import { useDispatch, useSelector } from "react-redux";
import ResultCard from "./ResultCard";

const ResultGrid = () => {
  const dispatch = useDispatch();
  const { query, activeTab, results, loading, error, page, totalPages } =
    useSelector((store) => store.search);

  useEffect(
    function () {
      if (!query) return;
      const getData = async () => {
        try {
          dispatch(setLoading());
          let data = [];

          if (activeTab == "photos") {
            let response = await fetchPhotos(query, page, 28);
            dispatch(setTotalPages(response.total_pages));
            data = response.results.map((item) => ({
              id: item.id,
              type: "photo",
              // title: item.alt_description,
              thumbnail: item.urls.small,
              src: item.urls.full,
              url: item.links.html,
            }));
          }

          if (activeTab == "videos") {
            let response = await fetchVideos(query, 28, page);
            dispatch(setTotalPages(Math.ceil(response.total_results / 28)));
            data = response.videos.map((item) => ({
              id: item.id,
              type: "video",
              // title: item.user.name || "video",
              thumbnail: item.image,
              src: item.video_files[0].link,
              url: item.url,
            }));
          }

          if (activeTab == "gif") {
            let response = await fetchGIF(query, 28, page);
            dispatch(
              setTotalPages(Math.ceil(response.pagination.total_count / 28)),
            );
            data = response.data.map((item) => ({
              id: item.id,
              type: "gif",
              // title: item.title || "GIF",
              thumbnail: item.images.preview_gif.url,
              src: item.images.original.url,
              url: item.url,
            }));
          }

          dispatch(setResults(data));
        } catch (error) {
          dispatch(setError(error.message));
        }
      };

      getData();
    },
    [query, activeTab, page, dispatch],
  );

  useEffect(() => {
    dispatch(resetPage());
  }, [query, activeTab]);

  if (error) return <h1>Error</h1>;
  if (loading) return <h1>Loading...</h1>;

  return (
    <>
      <div className="flex justify-between w-full flex-wrap gap-6 overflow-auto px-10">
        {results.map((item, idx) => {
          return (
            <div key={idx}>
              <ResultCard item={item} />
            </div>
          );
        })}
      </div>

      <div className="flex justify-center items-center gap-2 py-10 flex-wrap">
        <button
          onClick={() => dispatch(setPage(page - 1))}
          disabled={page === 1}
          className={`px-4 py-2 rounded ${page === 1 ? "bg-gray-700 text-gray-500 cursor-not-allowed" : "bg-gray-600 hover:bg-gray-500 cursor-pointer"}`}
        >
          Prev
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1)
          .filter(
            (p) =>
              p === 1 || p === totalPages || (p >= page - 2 && p <= page + 2),
          )
          .map((p, idx, arr) => (
            <>
              {idx > 0 && arr[idx - 1] !== p - 1 && (
                <span key={`dots-${p}`} className="text-white px-2">
                  ...
                </span>
              )}
              <button
                key={p}
                onClick={() => dispatch(setPage(p))}
                className={`px-4 py-2 rounded ${p === page ? "bg-blue-600" : "bg-gray-600 hover:bg-gray-500 cursor-pointer"}`}
              >
                {p}
              </button>
            </>
          ))}

        <button
          onClick={() => dispatch(setPage(page + 1))}
          disabled={page === totalPages}
          className={`px-4 py-2 rounded ${page === totalPages ? "bg-gray-700 text-gray-500 cursor-not-allowed" : "bg-gray-600 hover:bg-gray-500 cursor-pointer"}`}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default ResultGrid;
