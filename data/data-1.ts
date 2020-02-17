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
};

export default data;

export interface Data {
  bio: Bio[];
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
