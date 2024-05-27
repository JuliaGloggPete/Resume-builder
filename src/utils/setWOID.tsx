import * as Type from "../../types";


export const setWOID = (cv:Type.Resume) => {


   
  const transformedSkills = cv.skills.map((skill: Type.Skill) => ({
    skill: skill.skill,
    proficiency: skill.proficiency,
    categories: skill.categories,
  }));
  const transformedWorks = cv.assignment.clients.map(
    (client: Type.Client) => ({
      client: client.client,
      roles: client.roles,
      technologies: client.technologies,
      timeSpan: client.timeSpan,
      scope: client.scope,
      assignmentDescription: client.assignmentDescription,
    })
  );

  const transformedEducations = cv.summarizedCompetence.educations.map(
    (education: Type.Education) => ({
      date: education.date,
      place: education.place,
      description: education.description,
    })
  );
  const transformedCourses = cv.summarizedCompetence.courses.map(
    (course: Type.Course) => ({
      date: course.date,
      courseName: course.courseName,
      courseDescription: course.courseDescription,
    })
  );
  const transformedCertificates = cv.summarizedCompetence.certificates.map(
    (certificate: Type.Certificate) => ({
      certificateName: certificate.certificateName,
      year: certificate.year,
      description: certificate.description,
    })
  );

  const transformedLanguages = cv.summarizedCompetence.languages.map(
    (language: Type.Language) => ({
      language: language.language,
      level: language.level,
    })
  );

  const updatedCV: Type.Resume = {
    language: cv.language,
    resumeId: cv.resumeId,

    consultantInfo: {
      firstName: cv.consultantInfo.firstName,
      lastName: cv.consultantInfo.lastName,
      role: cv.consultantInfo.role,
      yearsOfExperience: cv.consultantInfo.yearsOfExperience,
      skillLevel: cv.consultantInfo.skillLevel,
      salesDescription: cv.consultantInfo.salesDescription,
      imageUrl: cv.consultantInfo.imageUrl,
    },
    sellerInfo: {
      email: cv.sellerInfo.email,
      phoneNumber: cv.sellerInfo.phoneNumber,
      sellerName: cv.sellerInfo.sellerName,
      sellerLastname: cv.sellerInfo.sellerLastname,
    },

    skills: transformedSkills,
    assignment: { clients: transformedWorks },
    summarizedCompetence: {
      educations: transformedEducations,
      languages: transformedLanguages,
      certificates: transformedCertificates,
      courses: transformedCourses,
    },
  };
return [updatedCV]

}

 
