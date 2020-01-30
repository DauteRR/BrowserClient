export interface SearchParameters {
  text: string;
}

export interface WebpageMeta {
  keywords?: string[];
  description?: string;
  author?: string;
  lang?: string;
  locality?: string;
  organization?: string;
}

export interface Result {
  url: string;
  title: string;
  lastVisited: Date;
  meta: WebpageMeta;
}
