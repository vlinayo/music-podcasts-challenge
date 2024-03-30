import { useNavigate } from "react-router-dom";

export default function PodcastDetail() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/music-podcasts-challenge/podcast/1/episode/1");
  };

  const handleClickBack = () => {
    navigate(-1);
  };

  return (
    <div>
      <h2>PodcastDetail</h2>
      <button onClick={handleClick}>Go to Episode Detail</button>
      <button onClick={handleClickBack}>Go Back</button>
    </div>
  );
}
