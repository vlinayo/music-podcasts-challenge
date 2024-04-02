export interface PodcastEpisode {
  artworkUrl160: string;
  episodeFileExtension: string;
  episodeContentType: string;
  artistIds: number[];
  feedUrl: string;
  episodeUrl: string;
  description: string;
  closedCaptioning: string;
  collectionId: number;
  collectionName: string;
  releaseDate: string;
  shortDescription: string;
  country: string;
  artworkUrl600: string;
  artistViewUrl: string;
  collectionViewUrl: string;
  trackViewUrl: string;
  artworkUrl60: string;
  trackTimeMillis: number;
  contentAdvisoryRating: string;
  previewUrl: string;
  episodeGuid: string;
  genres: { name: string; id: string }[];
  trackId: number;
  trackName: string;
  kind: string;
  wrapperType: string;
}
