export type PostCategory = 'analysis' | 'code' | 'skill';

export interface Author {
  name: string;
  role: string;
  organization: string;
  avatar: string;
}

export interface ExecutiveSummaryPoint {
  title: string;
  description: string;
  impact: 'positive' | 'negative' | 'neutral';
}

export interface Post {
  id?: string;
  slug?: string;
  type?: PostCategory;
  categoryLabel?: string;
  title: string;
  subtitle?: string;
  excerpt?: string;
  coverImage?: string;
  publishedAt: string;
  readTime: string;
  audioTime?: string;
  featured?: boolean;
  author: Author;
  tags?: string[];
  executiveSummary?: ExecutiveSummaryPoint[];
  audioTranscript?: string;
  path?: string;
  stem?: string;
  body?: any;
}
