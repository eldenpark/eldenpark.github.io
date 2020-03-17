export interface ContentData {
  bio: Bio[];
  general: General;
}

interface General {
  introduction: string;
  name: string;
}

interface Bio {
  company: string;
  dateFrom: string;
  dateTo: string;
  description: Description[];
  location: string;
  role: string;
}

interface Description {
  children?: string[];
  label: string;
}
