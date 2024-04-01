import React from "react";
import { Navigate, createBrowserRouter } from "react-router-dom";
import Home from "../pages/home/Home";

//lazy load the secondary pages
const PodcastDetail = React.lazy(
  () => import("../pages/podcast-detail/PodcastDetail"),
);
const EpisodeDetail = React.lazy(
  () => import("../pages/episode-detail/EpisodeDetail"),
);

const SuspenseFallback = () => <div>Loading...</div>;

export const router = createBrowserRouter([
  {
    path: "/music-podcasts-challenge/",
    element: <Home />,
  },
  {
    path: "/music-podcasts-challenge/podcast/:podcastId",
    element: (
      <React.Suspense fallback={<SuspenseFallback />}>
        <PodcastDetail />
      </React.Suspense>
    ),
  },
  {
    path: "/music-podcasts-challenge/podcast/:podcastId/episode/:episodeId",
    element: (
      <React.Suspense fallback={<SuspenseFallback />}>
        <EpisodeDetail />
      </React.Suspense>
    ),
  },
  {
    path: "*", // Catch-all route
    element: <Navigate to="/music-podcasts-challenge/" replace />,
  },
]);
