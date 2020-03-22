export interface ContentData {
  general: General;
  groups: {
    aboutDesc: Group;
    activities: Group;
    awards: Group;
    education: Group;
    employment: Group;
    interests: Group;
    musicDesc: Group;
    projectsAbbrev: Group;
    projectsDesc: Group;
    projectsGeneral: Group;
    projectsLibraries: Group;
    songs: Group;
    talks: Group;
  };
  views: Views;
}

interface General {
  email: string;
  github: string;
  introduction: {
    p1: string;
    p2?: string;
  };
  linkedIn: string;
  name: string;
  photoUrl: string;
}

interface Views {
  items: View[];
}

export interface View {
  backUrl?: string;
  children: {
    type: string;
    value: string;
  }[];
  exact?: string;
  label: string;
  url: string;
  visibleOnMenu: string;
}

export interface Group {
  id: string;
  items: Item[];
  label: string;
  type: 'message' | 'category';
}

interface Item {
  children?: {
    children?: {
      label: string;
      type: 'text' | 'multimedia';
    }[];
    label: string;
    type: 'text' | 'multimedia';
  }[];
  title1?: string;
  title2?: string;
  title3?: string;
}
