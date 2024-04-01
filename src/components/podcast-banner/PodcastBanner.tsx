import React from "react";
import Card from "../common/card/Card";
import podcastBannerStyles from "./PodcastBanner.module.scss";

interface PodcastBannerProps {
  image: string;
  id: number;
  title: string;
  author: string;
  description?: string;
  onPodcastDetailClick?: () => void;
}
// Podcast Banner component used on podcast detail page & episode detail page
const PodcastBanner: React.FC<PodcastBannerProps> = ({
  image,
  id,
  title,
  author,
  description,
  onPodcastDetailClick,
}) => {
  const handlePodcastDetailClick = () => {
    if (onPodcastDetailClick) {
      onPodcastDetailClick();
    }
  };

  return (
    <Card customStyles={podcastBannerStyles.banner__card}>
      <div className={podcastBannerStyles.banner}>
        <img
          src={image}
          alt={`${id} image`}
          onClick={handlePodcastDetailClick}
          className={
            onPodcastDetailClick ? podcastBannerStyles.banner__cursor : ""
          }
        ></img>
        <div
          className={
            onPodcastDetailClick
              ? `${podcastBannerStyles.banner__title__container} ${podcastBannerStyles.banner__cursor}`
              : podcastBannerStyles.banner__title__container
          }
          onClick={handlePodcastDetailClick}
        >
          <p className={podcastBannerStyles.banner__title__container__title}>
            {title}
          </p>
          <p className={podcastBannerStyles.banner__title__container__author}>
            By {author}
          </p>
        </div>
        <div className={podcastBannerStyles.banner__description__container}>
          <p
            className={
              podcastBannerStyles.banner__description__container__title
            }
          >
            Description:
          </p>
          <p
            className={
              podcastBannerStyles.banner__description__container__description
            }
          >
            {description}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default PodcastBanner;
