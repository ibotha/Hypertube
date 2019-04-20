export interface Torrent {
  _id: string;
  movieID: string;
  infoHash: string;
  moviePath: string;
  status: string;
  subtitles: any[];
  movieStats: MovieStats;
  __v: number;
}

interface MovieStats {
  length: number;
  type: string;
  duration: number;
}
