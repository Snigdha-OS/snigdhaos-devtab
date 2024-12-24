export interface DevToArticle {
  id: number;
  title: string;
  url: string;
  published_at: string;
  user: {
    name: string;
    username: string;
  };
  reading_time_minutes: number;
  tag_list: string[];
}