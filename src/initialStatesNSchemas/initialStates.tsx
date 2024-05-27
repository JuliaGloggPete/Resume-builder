import {
  Skill,
  Resume,
  Client,
  ConsultantInfo,
  Certificate,
  Education,
  Language,
  Course,
} from "../../types";

export const initialFormState: Resume = {
  language: "",
  consultantInfo: {
    firstName: "",
    lastName: "",
    role: "",
    yearsOfExperience: 0,
    skillLevel: "",
    salesDescription: "",
    imageUrl: ""
  },
  sellerInfo: {
    email: "",
    phoneNumber: "",
    sellerLastname: "",
    sellerName:"",
  },
  skills: [],
  assignment: {
    clients: [],
  },
  summarizedCompetence: {
    educations: [],
    languages: [],
    certificates: [],
    courses: [],
  },
};

export const initialConsultantState: ConsultantInfo = {
  firstName: "",
  lastName: "",
  role: "",
  yearsOfExperience: 0,
  skillLevel: "",
  salesDescription: "",
  imageUrl: ""
};
/*
const prefillState = (prefill: boolean): ConsultantInfo => {
  if (prefill) {
    return {
      firstName: "John",
      lastName: "Doe",
      role: "Senior Consultant",
      yearsOfExperience: 10,
      skillLevel: "Expert",
      salesDescription: "Proven track record in sales and customer engagement.",
      imageUrl: "https://example.com/image.jpg"
    };
  } else {
    return {
      firstName: "",
      lastName: "",
      role: "",
      yearsOfExperience: 0,
      skillLevel: "",
      salesDescription: "",
      imageUrl: ""
    };
  }
}; 

export const initialConsultantState: ConsultantInfo = prefillState(true);*/


export const initialEducationState: Education = {
  date: "",
  place: "",
  description: "",
};
export const initialStateCertificate: Certificate = {
  year: 0,
  certificateName: "",
  description: "",
};
export const initialStateCourse: Course = {
  courseName: "",
  courseDescription: "",
  date: "",
};
export const initialStateLanguage: Language = {
 language: "",
 level: "",
};

export const initialStateSkill: Skill = {
  skill: "",
  proficiency: "",
  categories: [""]
};

export const initialStateSkills: Skill[] = [];
export const initialStateWorkExs: Client[] = [];
export const initialStateCertificates: Certificate[] = [];
export const initialEducationsState: Education[] = [];
export const initialStateLanguages: Language[] = [];
export const initialStateCourses: Course[] = [];
