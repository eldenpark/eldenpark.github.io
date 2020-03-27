export interface BlogData {
  music: Blog;
}

export interface Blog {
  id: string;
  items: {
    capitalizedTitle: string;
    createdAt: number;
    hash: string;
    html: string;
    meta: {
      [key: string]: string;
      title: string;
    };
    pageUrl: string;
  }[];
  label: string;
}
