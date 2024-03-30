import { useNavigate } from "react-router-dom";

export default function EpisodeDetail() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/music-podcasts-challenge/");
  };

  const handleClickBack = () => {
    navigate(-1);
  };

  return (
    <div>
      <h2>EpisodeDetail</h2>
      <button onClick={handleClick}>Go Home</button>
      <button onClick={handleClickBack}>Go Back</button>
    </div>
  );
}
