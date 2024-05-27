export type Client = {
  client: string;
  roles: string[];
  technologies: string[];
  timeSpan: string;
  scope: string;
  assignmentDescription: string;

};

export interface Date {
  start: string;
  end: string;
}

export type ConsultantInfo = {
  firstName: string;
  lastName: string;
  role: string;
  yearsOfExperience: number;
  skillLevel: string;
  salesDescription: string;
  imageUrl?: string;
};

export type Skill = {
  skill: string;
  proficiency: number;
  categories: string[];
};

export type Education = {
  date: string;
  place: string;
  description: string;
};
export type Language = {
  language: string;
  level: string;
};
export type Certificate = {
  certificateName: string;
  year: number;
  description: string;
};

export type Course = {
  date: string;
  courseName: string;
  courseDescription: string;
};
export type Sellerinfo = {
  email: string;
  phoneNumber: string;
  sellerName: string;
  sellerLastname: string;
};

export type Resume = {
  language: string;
  resumeId?: number |null;
  consultantInfo: ConsultantInfo;
  sellerInfo: Sellerinfo;
  skills: Skill[];
  assignment: {
    clients: Client[];
  };
  summarizedCompetence: {
    educations: Education[];
    languages: Language[];
    certificates: Certificate[];
    courses: Course[];
  };
};
export type FilteredResume = {
  resume: Resume;
  matchingSkills: {
    matches: number;
    proficiencyScore: number;
    skills: { skill: string; proficiency: number }[];
  };
};

export type Action = {
  type: "UPDATE";
  payload: Partial<ConsultantInfo>;
};

export type Item = {
  [key: string]: any;
};

export type ActionAll<T> = {
  type: "ADD" | "DELETE" | "PUT";
  payload: T | Partial<T>;
};


export type ClientActionType = 'ADD_CLIENT' | 'DELETE_CLIENT' | 'PATCH_CLIENT';

export interface AddClientAction {
  type: 'ADD_CLIENT';
  payload: Client;
}

export interface DeleteClientAction {
  type: 'DELETE_CLIENT';
  payload: { client: string };
}

export interface PatchClientAction {
  type: 'PATCH_CLIENT';
  payload: { client: string; updates: Partial<Client> };
}

export type ClientAction = AddClientAction | DeleteClientAction | PatchClientAction;

