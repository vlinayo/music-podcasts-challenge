import React from "react";
import Card from "../common/card/Card";
import podcastCardStyles from "./PodcastCard.module.scss";

interface PodcastCardProps {
  id: number;
  title: string;
  author: string;
  image: string;
  description: string;
  episodes: Array<any>;
  onPodcastSelected: (id: number) => void;
}

//podcast card component to be displayed in the list of podcasts
const PodcastCard: React.FC<PodcastCardProps> = (props) => {
  const { title, author, image, id, onPodcastSelected } = props;

  return (
    <div
      className={podcastCardStyles.podcast}
      onClick={() => onPodcastSelected(id)}
    >
      <Card customStyles={podcastCardStyles.podcast__card}>
        <img
          className={podcastCardStyles.podcast__image}
          src={image}
          alt="Podcast Image"
        />
        <div className={podcastCardStyles.podcast__content}>
          <h2>{title}</h2>
          <p>
            Author: <span>{author}</span>
          </p>
        </div>
      </Card>
    </div>
  );
};

export default PodcastCard;
