import { useNavigate, useParams } from "react-router-dom";
import PodcastBanner from "../../components/podcast-banner/PodcastBanner";
import Card from "../../components/common/card/Card";
import { formatDate, formatDuration } from "../../utils/formatters";
import { usePodcastDetailData } from "../../hooks/ApiDataHooks";
import podcastDetailStyles from "./PodcastDetail.module.scss";
import { PodcastCardProps } from "../../components/podcast-card/PodcastCard";

interface PodcastDetail {
  podcastData?: PodcastCardProps;
}

export default function PodcastDetail() {
  const navigate = useNavigate();
  const { podcastId } = useParams();
  const { podcastData }: PodcastDetail = usePodcastDetailData(podcastId);

  const handleEpisodeClick = (id: string) => {
    navigate(`/music-podcasts-challenge/podcast/${podcastId}/episode/${id}`);
  };

  return (
    <div className={podcastDetailStyles.podcastDetail}>
      {podcastData && (
        <>
          <div>
            <PodcastBanner
              image={podcastData.image}
              id={podcastData.id}
              title={podcastData.title}
              description={podcastData.description}
              author={podcastData.author}
            />
          </div>
          <div className={podcastDetailStyles.podcastDetail__episodes}>
            {podcastData.episodes && (
              <Card
                customStyles={podcastDetailStyles.podcastDetail__episodes__card}
              >
                <h2>Episodes {podcastData.episodesCount}</h2>
              </Card>
            )}
            <Card>
              <table
                className={podcastDetailStyles.podcastDetail__episodes__table}
              >
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Date</th>
                    <th>Duration</th>
                  </tr>
                </thead>
                <tbody>
                  {podcastData.episodes &&
                    podcastData.episodes.map((episode, index) => (
                      <tr
                        key={episode.episodeId}
                        onClick={() => handleEpisodeClick(episode.episodeId)}
                        className={
                          index % 2 === 0
                            ? podcastDetailStyles[
                                "podcastDetail__episodes__table--even"
                              ]
                            : podcastDetailStyles[
                                "podcastDetail__episodes__table--odd"
                              ]
                        }
                      >
                        <td
                          className={
                            podcastDetailStyles.podcastDetail__episodes__table__title
                          }
                        >
                          {episode.title}
                        </td>
                        <td>{formatDate(episode.pubDate)}</td>
                        <td>{formatDuration(episode.duration)}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </Card>
          </div>
        </>
      )}
    </div>
  );
}
