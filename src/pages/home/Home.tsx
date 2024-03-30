import { useNavigate } from "react-router-dom";
import PodcastCard from "../../components/podcast-card/PodcastCard";

export default function Home() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/music-podcasts-challenge/podcast/1");
  };

  return (
    <div>
      <h2>Home</h2>
      <div>
        <PodcastCard />
        <PodcastCard />
        <PodcastCard />
      </div>
      <button onClick={handleClick}>Go to Podcast</button>
    </div>
  );
}
