export interface DevToArticle {
  id: number;
  title: string;
  url: string;
  published_at: string;
  cover_image?: string;
  user: {
    name: string;
    username: string;
  };
  reading_time_minutes: number;
  tag_list: string[];
  public_reactions_count: number;
  comments_count: number;
}