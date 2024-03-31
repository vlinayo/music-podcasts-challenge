import { useNavigate } from "react-router-dom";
import PodcastCard from "../../components/podcast-card/PodcastCard";
import homeStyles from "./Home.module.scss";

export default function Home() {
  const navigate = useNavigate();

  const handleSelectedPodcast = (id: number) => {
    navigate(`/music-podcasts-challenge/podcast/${id}`);
  };

  const dummyDataPodcastList = [
    {
      id: 1,
      title: "Podcast 1",
      description: "Description 1",
      author: "Author 1",
      image: "https://picsum.photos/200/200",
      episodes: [
        {
          id: 1,
          title: "Episode 1",
          description: "Description 1",
          image: "https://picsum.photos/200/300",
          duration: 120,
        },
        {
          id: 2,
          title: "Episode 2",
          description: "Description 2",
          image: "https://picsum.photos/200/300",
          duration: 120,
        },
      ],
    },
    {
      id: 2,
      title: "Podcast 2",
      description: "Description 2",
      author: "Author 2",
      image: "https://picsum.photos/200/200",
      episodes: [
        {
          id: 1,
          title: "Episode 1",
          description: "Description 1",
          image: "https://picsum.photos/200/200",
          duration: 120,
        },
      ],
    },
    {
      id: 3,
      title: "Podcast 3",
      description: "Description 3",
      author: "Author 3",
      image: "https://picsum.photos/200/200",
      episodes: [
        {
          id: 1,
          title: "Episode 1",
          description: "Description 1",
          image: "https://picsum.photos/200/200",
          duration: 120,
        },
      ],
    },
    {
      id: 4,
      title: "Podcast 4",
      description: "Description 4",
      author: "Author 4",
      image: "https://picsum.photos/200/200",
      episodes: [],
    },
    {
      id: 5,
      title: "Podcast 5",
      description: "Description 5",
      author: "Author 5",
      image: "https://picsum.photos/200/200",
      episodes: [],
    },
    {
      id: 6,
      title: "Podcast 6",
      description: "Description 6",
      author: "Author 6",
      image: "https://picsum.photos/200/200",
      episodes: [],
    },
    {
      id: 7,
      title: "Podcast 7",
      description: "Description 7",
      author: "Author 7",
      image: "https://picsum.photos/200/200",
      episodes: [],
    },
    {
      id: 8,
      title: "Podcast 8",
      description: "Description 8",
      author: "Author 8",
      image: "https://picsum.photos/200/200",
      episodes: [],
    },
  ];

  return (
    <div>
      <div className={homeStyles.home}>
        {dummyDataPodcastList.map((podcast) => (
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
