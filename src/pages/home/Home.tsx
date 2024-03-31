import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PodcastItem } from "../../interface/PodcastApi";
import PodcastCard, {
  PodcastCardProps,
} from "../../components/podcast-card/PodcastCard";
import homeStyles from "./Home.module.scss";
import Counter from "../../components/counter/Counter";
import Input from "../../components/input/Input";

export default function Home() {
  const navigate = useNavigate();
  const [podcasts, setPodcasts] = useState<PodcastCardProps[]>([]);
  const [filteredPodcasts, setFilteredPodcasts] = useState<PodcastCardProps[]>(
    []
  );

  //TODO: to utils...
  const isLocalStorageValid = (podcastResponse: string) => {
    const { timestamp } = JSON.parse(podcastResponse);
    const oneDayInMilliseconds = 24 * 60 * 60 * 1000;
    const oneDayAgo = Date.now() - oneDayInMilliseconds;

    return timestamp > oneDayAgo;
  };

  //TODO: maybe custom hook?
  useEffect(() => {
    const storePodcastData = (data: any) => {
      const timestamp = Date.now();
      localStorage.setItem(
        "podcastResponse",
        JSON.stringify({ data, timestamp })
      );
      setPodcasts(data);
      setFilteredPodcasts(data);
    };

    const getPodcasts = async () => {
      const podcastResponse = localStorage.getItem("podcastResponse");

      if (!podcastResponse || !isLocalStorageValid(podcastResponse)) {
        const response = await fetch(
          "https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json"
        );
        if (!response.ok) {
          throw new Error("Could not fetch podcasts");
        }
        const data = await response.json();
        console.log(data.feed.entry);
        const transformedData: PodcastCardProps[] = data.feed.entry.map(
          (podcast: PodcastItem) => {
            return {
              title: podcast["im:name"].label,
              author: podcast["im:artist"].label,
              image: podcast["im:image"][2].label,
              id: podcast.id.attributes["im:id"],
            };
          }
        );
        storePodcastData(transformedData);
      } else {
        const { data } = JSON.parse(podcastResponse);
        setPodcasts(data);
        setFilteredPodcasts(data);
      }
    };
    getPodcasts();
  }, []);

  const handleSelectedPodcast = (id: number) => {
    navigate(`/music-podcasts-challenge/podcast/${id}`);
  };

  const handleFilterChanges = (value: string) => {
    if (value.trim() === "") {
      setFilteredPodcasts(podcasts);
      return;
    }
    const filteredPodcasts = podcasts.filter(
      (podcast) =>
        podcast.title.toLowerCase().includes(value.toLowerCase()) ||
        podcast.author.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredPodcasts(filteredPodcasts);
  };

  return (
    <div className={homeStyles.home}>
      <div className={homeStyles.home__filter}>
        <Counter number={podcasts.length} />
        <Input onInputChange={handleFilterChanges} />
      </div>
      <div className={homeStyles.home__podcasts}>
        {filteredPodcasts.map((podcast) => (
          <PodcastCard
            key={podcast.id}
            {...podcast}
            onPodcastSelected={handleSelectedPodcast}
          />
        ))}
      </div>
    </div>
  );
}
