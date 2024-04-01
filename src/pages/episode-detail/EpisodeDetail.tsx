import { useNavigate, useParams } from "react-router-dom";
import PodcastBanner from "../../components/podcast-banner/PodcastBanner";
import Card from "../../components/common/card/Card";
import { usePodcastEpisodeData } from "../../hooks/ApiDataHooks";
import epidoseDetailStyles from "./EpisodeDetail.module.scss";

export default function EpisodeDetail() {
  const navigate = useNavigate();
  const { podcastId, episodeId } = useParams();
  const { podcastDetail, episode } = usePodcastEpisodeData(
    podcastId,
    episodeId
  );

  const handleBannerPodcastClick = () => {
    navigate(`/music-podcasts-challenge/podcast/${podcastId}`);
  };

  return (
    <div className={epidoseDetailStyles.container}>
      {podcastDetail && (
        <>
          <div className={epidoseDetailStyles.banner}>
            <PodcastBanner
              image={podcastDetail.image}
              id={podcastDetail.id}
              title={podcastDetail.title}
              description={podcastDetail.description}
              author={podcastDetail.author}
              onPodcastDetailClick={handleBannerPodcastClick}
            />
          </div>
          <div className={epidoseDetailStyles.episode}>
            <Card>
              <h2>{episode?.title && episode.title}</h2>
              {episode?.description && (
                <div
                  className={epidoseDetailStyles.episode__description}
                  dangerouslySetInnerHTML={{
                    __html: episode.description,
                  }}
                />
              )}
              <audio controls src={episode?.audioUrl}></audio>
            </Card>
          </div>
        </>
      )}
    </div>
  );
}
