export interface BlogData {
  music: Blog;
}

export interface Blog {
  id: string;
  items: {
    createdAt: number;
    hash: string;
    html: string;
    meta: {
      title: string;
    }
    pageUrl: string;
  }[];
  label: string;
}
