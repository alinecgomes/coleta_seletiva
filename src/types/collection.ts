export interface CollectionSchedule {
  day: string;        // "Segunda-Feira"
  time: string;       // "07:30"
  neighborhood: string; // "GOIÁS"
  operator: string;    // "COOMCAT"
}

export interface CollectionByNeighborhood {
  neighborhood: string;
  schedules: {
    day: string;
    time: string;
    operator: string;
  }[];
}

export interface CollectionDisplay {
  neighborhood: string;
  schedules: {
    day: string;
    times: string[];
    operator: string;
  }[];
}