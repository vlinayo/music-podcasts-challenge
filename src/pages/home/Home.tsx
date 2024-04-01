import { useNavigate } from "react-router-dom";
import PodcastCard from "../../components/podcast-card/PodcastCard";
import homeStyles from "./Home.module.scss";
import Counter from "../../components/counter/Counter";
import Input from "../../components/input/Input";
import { usePodcastListData } from "../../hooks/ApiDataHooks";

export default function Home() {
  const navigate = useNavigate();
  const { filteredPodcasts, handleFilterChanges } = usePodcastListData();

  const handleSelectedPodcast = (id: number) => {
    navigate(`/music-podcasts-challenge/podcast/${id}`);
  };

  return (
    <div className={homeStyles.home}>
      <div className={homeStyles.home__filter}>
        <Counter number={filteredPodcasts.length} />
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
