import { useEffect, useState } from "react";
import {
  EpisodesDetails,
  PodcastCardProps,
} from "../components/podcast-card/PodcastCard";
import { useHeaderContext } from "./HeaderContextHook";
import { isLocalStorageValid } from "../utils/validators";
import { PodcastItem } from "../interface/PodcastApi";
import { storeDataInStorage } from "../utils/common";
import {
  ALLOW_ORIGINS_URL,
  LOOKUP_PODCAST_BY_ID_URL,
  PODCASTS_TOP_100_URL,
} from "../constants/api";
import {
  ERROR_PODCAST_DETAILS_FETCH,
  ERROR_PODCAST_FETCH,
} from "../constants/errors";
import { STORAGE_PODCASTS_KEY } from "../constants/storage";
import { PodcastEpisode } from "../interface/EpisodeApi";

export const usePodcastListData = () => {
  const { setIsLoading } = useHeaderContext();
  const [podcasts, setPodcasts] = useState<PodcastCardProps[]>([]);
  const [filteredPodcasts, setFilteredPodcasts] = useState<PodcastCardProps[]>(
    [],
  );

  const handleFilterChanges = (value: string) => {
    if (value.trim() === "") {
      setFilteredPodcasts(podcasts);
      return;
    }
    const filteredPodcasts = podcasts.filter(
      (podcast) =>
        podcast.title.toLowerCase().includes(value.toLowerCase()) ||
        podcast.author.toLowerCase().includes(value.toLowerCase()),
    );
    setFilteredPodcasts(filteredPodcasts);
  };

  useEffect(() => {
    const storePodcastData = (data: PodcastCardProps[]) => {
      storeDataInStorage(data, STORAGE_PODCASTS_KEY);
      setPodcasts(data);
      setFilteredPodcasts(data);
      setIsLoading(false);
    };

    const getPodcasts = async () => {
      const podcastResponse = localStorage.getItem(STORAGE_PODCASTS_KEY);

      if (!podcastResponse || !isLocalStorageValid(podcastResponse)) {
        const response = await fetch(PODCASTS_TOP_100_URL);
        if (!response.ok) {
          throw new Error(ERROR_PODCAST_FETCH);
        }
        const data = await response.json();
        const transformedData: PodcastCardProps[] = data.feed.entry.map(
          (podcast: PodcastItem) => {
            return {
              title: podcast["im:name"].label,
              author: podcast["im:artist"].label,
              image: podcast["im:image"][2].label,
              id: podcast.id.attributes["im:id"],
              description: podcast.summary.label,
            };
          },
        );
        storePodcastData(transformedData);
      } else {
        const { data } = JSON.parse(podcastResponse);
        setPodcasts(data);
        setFilteredPodcasts(data);
        setIsLoading(false);
      }
    };

    setIsLoading(true);
    getPodcasts();
  }, []);

  return { podcasts, filteredPodcasts, handleFilterChanges };
};

export const usePodcastDetailData = (podcastId?: string) => {
  const { setIsLoading } = useHeaderContext();
  const [podcastData, setPodcastData] = useState<PodcastCardProps>();
  const podcastDetailsResponse = localStorage.getItem(`${podcastId}`);
  const podcastResponse = localStorage.getItem(STORAGE_PODCASTS_KEY);

  useEffect(() => {
    setIsLoading(true);

    const getPodcastDetails = async () => {
      if (podcastId && podcastResponse) {
        const { data } = JSON.parse(podcastResponse);
        const selectedPodcast = data.find(
          (podcast: PodcastCardProps) => podcast.id.toString() === podcastId,
        );

        const response = await fetch(
          `${ALLOW_ORIGINS_URL}${encodeURIComponent(
            `${LOOKUP_PODCAST_BY_ID_URL}${podcastId}&media=podcast&entity=podcastEpisode&limit=
            200&sort=recent`,
          )}`,
        );
        if (!response.ok) {
          throw new Error(ERROR_PODCAST_DETAILS_FETCH);
        }
        const podcastEpisodesData = await response.json();
        const { results } = JSON.parse(podcastEpisodesData.contents);
        const totalEpisodes = results[0].trackCount;
        const listEpisodes = results.slice(1, results.length + 1);

        // prepare array for episodes data
        const episodesData: EpisodesDetails[] = [];

        listEpisodes.forEach((episode: PodcastEpisode) => {
          episodesData.push({
            title: episode.trackName,
            duration: episode.trackTimeMillis
              ? episode.trackTimeMillis
              : "unknown",
            pubDate: episode.releaseDate,
            description: episode.description,
            audioUrl: episode.episodeUrl,
            episodeId: episode.trackId.toString(),
          });
        });

        const updatePodcastDetail = {
          ...selectedPodcast,
          episodesCount: totalEpisodes,
          episodes: [...episodesData],
        };

        setPodcastData(updatePodcastDetail);
        storeDataInStorage(updatePodcastDetail, podcastId);
      }
      setIsLoading(false);
    };

    if (
      !podcastDetailsResponse ||
      !isLocalStorageValid(podcastDetailsResponse)
    ) {
      getPodcastDetails();
    }

    if (!!podcastDetailsResponse) {
      const { data } = JSON.parse(podcastDetailsResponse);
      setPodcastData(data);
      setIsLoading(false);
    }
  }, []);

  return { podcastData };
};

export const usePodcastEpisodeData = (
  podcastId?: string,
  episodeId?: string,
) => {
  const [episode, setEpisode] = useState<EpisodesDetails>();
  const [podcastDetail, setPodcastDetail] = useState<PodcastCardProps>();
  const { setIsLoading } = useHeaderContext();

  useEffect(() => {
    setIsLoading(true);
    const podcastDetailsResponse = localStorage.getItem(`${podcastId}`);
    if (podcastDetailsResponse) {
      const { data } = JSON.parse(podcastDetailsResponse);
      setPodcastDetail(data);
      const episodeData = data.episodes.find(
        (episode: EpisodesDetails) => episode.episodeId === episodeId,
      );
      setEpisode(episodeData);
      setIsLoading(false);
    }
  }, []);

  return { podcastDetail, episode };
};
