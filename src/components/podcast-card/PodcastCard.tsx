import Card from "../common/card/Card";

//podcast card component to be displayed in the list of podcasts
export default function PodcastCard() {
  return (
      <Card>
        <img src={"./vite.svg"} alt="Image" />
        <h2>Podcast title</h2>
        <p>Author: XXXXX</p>
      </Card>
  );
}
