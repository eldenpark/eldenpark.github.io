export interface ContentData {
  activities: Group;
  awards: Group;
  education: Group;
  employment: Group;
  general: General;
  interests: Group;
  projectsAbbrev: Group;
  talks: Group;
}

interface General {
  email: string;
  github: string;
  introduction: string;
  linkedIn: string;
  name: string;
  photoUrl: string;
}

export interface Group {
  id: string;
  items: Item[];
  label: string;
}

interface Item {
  children?: {
    children?: {
      label: string;
    }[];
    label: string;
  }[];
  title1: string;
  title2?: string;
  title3?: string;
}
