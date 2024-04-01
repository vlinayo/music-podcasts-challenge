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
  ERROR_PODCAST_EPISODES_FETCH,
  ERROR_PODCAST_FETCH,
} from "../constants/errors";
import { STORAGE_PODCASTS_KEY } from "../constants/storage";

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

  useEffect(() => {
    const getPodcastEpisodes = async (url: string) => {
      const response = await fetch(
        `${ALLOW_ORIGINS_URL}${encodeURIComponent(url)}`,
      );
      if (!response.ok) {
        throw new Error(ERROR_PODCAST_EPISODES_FETCH);
      }
      const { contents } = await response.json();

      // Decode Base64-encoded XML data
      const decodedXmlString = atob(contents.split(",")[1]);

      // Parse the XML document
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(decodedXmlString, "text/xml");

      // Extract the episodes of the podcast
      const episodes = xmlDoc.querySelectorAll("item");

      // prepare array for episodes data
      const episodesData: EpisodesDetails[] = [];

      // Iterate over episodes to extract required information
      episodes.forEach((episode: any, index: number) => {
        // Extract episode title
        const title = episode.querySelector("title").textContent;

        // Extract episode duration (if available)
        const durationElement = episode.querySelector("duration");
        const duration = durationElement
          ? durationElement.textContent
          : "Duration not available";

        // Extract publication date
        const pubDate = episode.querySelector("pubDate").textContent;

        // Extract episode description
        const descriptionElement = episode.querySelector("description");
        const description = descriptionElement
          ? descriptionElement.textContent
          : "Description not available";

        // Extract episode audio link
        const audioUrl = episode.querySelector("enclosure").getAttribute("url");

        // Generate an episode id number (id)
        const episodeId = episodes.length - index;

        episodesData.push({
          title,
          duration,
          pubDate,
          description,
          audioUrl,
          episodeId: episodeId.toString(),
        });
      });

      if (podcastData && episodesData.length > 0 && podcastId) {
        const updatePodcastDetail = {
          ...podcastData,
          episodes: [...episodesData],
        };
        setPodcastData({
          ...podcastData,
          episodes: [...episodesData],
        });
        storeDataInStorage(updatePodcastDetail, podcastId);
        setIsLoading(false);
      }
    };

    const getPodcastDetails = async () => {
      const response = await fetch(
        `${ALLOW_ORIGINS_URL}${encodeURIComponent(
          `${LOOKUP_PODCAST_BY_ID_URL}${podcastId}`,
        )}`,
      );
      if (!response.ok) {
        throw new Error(ERROR_PODCAST_DETAILS_FETCH);
      }
      const data = await response.json();
      const { results } = JSON.parse(data.contents);
      const feedUrl = results[0].feedUrl;
      getPodcastEpisodes(feedUrl);
    };
    setIsLoading(true);

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
