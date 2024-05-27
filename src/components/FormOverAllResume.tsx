import React, { useEffect } from "react";
import { Certificate, Education, Language, Course } from "../../types";
import AddEducationSection from "./AddEducationSection";
import AddCertificateSection from "./AddCertificateSection";
import AddCoursesSection from "./AddCoursesSection";
import AddLanguageSection from "./AddLanguageSection";

interface Props {
  certificates: Certificate[];
  dispatchCertificates: React.Dispatch<any>;
  educations: Education[];
  dispatchEducations: React.Dispatch<any>;
  courses: Course[];
  dispatchCourses: React.Dispatch<any>;
  languages: Language[];
  dispatchLanguages: React.Dispatch<any>;
  cvLanguage : string
}

export const FormOverAllResume = ({
  certificates,
  dispatchCertificates,
  educations,
  dispatchEducations,
  courses,
  dispatchCourses,
  languages,
  dispatchLanguages,
  cvLanguage
}: Props) => {
  useEffect(() => {
    //console.log("Updated courses:", courses);
  }, [courses, languages, certificates, educations]);

  return (
    <div className="form-section">

      <div>
        <p className="form-head-of-section">Sammanfattat Kompetens</p>
      </div>

      <div className="md:grid md:grid-cols-2 md:gap-16">
        <div>
          <p className="text-2xl font-semibold uppercase my-3">Utbildningar</p>
     
        <AddEducationSection
          educations={educations}
          dispatchEducations={dispatchEducations}
        />
   </div>
      <div>
        <p className="text-2xl font-semibold uppercase my-3">Certificeringar</p>
   

      <AddCertificateSection
        certificates={certificates}
        dispatchCertificates={dispatchCertificates}
      />
         </div>
      </div>
      <div className="md:grid md:grid-cols-2 md:gap-16">
        <div>
          <div>
            <p className="text-2xl font-semibold uppercase my-3">Kurser</p>
          </div>

          <AddCoursesSection
            dispatchCourses={dispatchCourses}
            courses={courses}
          />
        </div>
        <div>
          <div>
            <p className="text-2xl font-semibold uppercase my-3">Språk</p>
            <AddLanguageSection
              dispatchLanguages={dispatchLanguages}
              languages={languages}
              cvLanguage={cvLanguage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
