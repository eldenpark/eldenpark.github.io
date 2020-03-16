const data: Data = {
  bio: [
    {
      company: 'Memebox',
      dateFrom: '01/2018',
      dateTo: '01/2019',
      description: [
        {
          label: 'label1',
        },
      ],
      location: 'Pangyo, South Korea',
      role: 'Engineering Lead',
    },
  ],
  general: {
    name: 'Elden S. Park',
  },
};

export default data;

export interface Data {
  bio: Bio[];
  general: General;
}

interface General {
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
