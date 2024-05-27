import { useState, useEffect } from "react";
import type {
  Resume,
  Education,
  Certificate,
  Course,
  Language,
  Skill,
} from "../../types";
import { PencilSimple, Plus } from "@phosphor-icons/react";
import AddEducationSection from "./AddEducationSection";
import AddCertificateSection from "./AddCertificateSection";
import AddCoursesSection from "./AddCoursesSection";
import AddLanguageSection from "./AddLanguageSection";
interface Props {
  cv: Resume;
  updateCV?: boolean;
  translateCV?: boolean;
  educations: Education[];
  certificates: Certificate[];
  courses: Course[];
  languages: Language[];
  dispatchLanguages: React.Dispatch<any>;
  dispatchCertificates: React.Dispatch<any>;
  dispatchEducations: React.Dispatch<any>;
  dispatchCourses: React.Dispatch<any>;
}

const SummarySection = ({
  cv,
  updateCV,
  translateCV,
  educations,
  dispatchEducations,
  certificates,
  dispatchCertificates,
  courses,
  dispatchCourses,
  languages,
  dispatchLanguages,
}: Props) => {
  const [updateEducation, setUpdateEducation] = useState<boolean>(false);
  const [updateCertificates, setUpdateCertificates] = useState<boolean>(false);
  const [updateCourses, setUpdateCourses] = useState<boolean>(false);
  const [updateLanguages, setUpdateLanguages] = useState<boolean>(false);
  const [skillsByCategory, setSkillsByCategory] = useState<
    Record<string, string[]>
  >({});
  useEffect(() => {
    let newSkillsByCategory: Record<string, string[]> = {};
    cv.skills.forEach((skill) => {
      skill.categories.forEach((category) => {
        if (!newSkillsByCategory[category]) {
          newSkillsByCategory[category] = [];
        }
        newSkillsByCategory[category].push(skill.skill);
      });
    });
    setSkillsByCategory(newSkillsByCategory);
  }, [cv.skills]);

  useEffect(() => {
    console.log(educations);
  }, [educations]);

  return (
    <div>
      <div className="my-8 relative">
        <h2 className="text-center">Sammanfattad kompetens</h2>

        <div className="grid lg:grid-cols-2 gap-8 ">
          <div>
            {educations && educations.length > 0 && (
              <div className="border-summary">
                {updateCV && (
                  <div className="bg-MyBlue text-white rounded-full h-8 w-8  flex justify-center absolute top-2 right-2 ">
                    <PencilSimple
                      size={26}
                      className="pt-1"
                      onClick={() =>
                        setUpdateEducation((prevState) => !prevState)
                      }
                    />
                  </div>
                )}
                <h3>Utbildningar: </h3>
                {educations?.map((education, index) => (
                  <div
                    className="grid grid-cols-3 md:grid-cols-5 my-2"
                    key={index}
                  >
                    <p className="font-semibold mr-4"> {education.date}</p>
                    <div className="col-span-2 md:col-span-4">
                      <p className="mr-2 font-medium"> {education.place}</p>
                      <p className="italic"> {education.description}</p>
                    </div>
                  </div>
                ))}
                {updateEducation && (
                  <div className="mt-4">
                    <AddEducationSection
                      educations={educations}
                      dispatchEducations={dispatchEducations}
                    />
                  </div>
                )}
              </div>
            )}
          </div>

          {!updateCV && (
            <div className="border-summary">
              <h3>Teknisk Kompetens: </h3>
              <div>
                {Object.keys(skillsByCategory).map(
                  (category, categoryIndex) => (
                    <div className="grid grid-cols-4" key={categoryIndex}>
                      <p className="font-semibold ">{category}:</p>
                      <div className="col-span-3 flex">
                        {skillsByCategory[category].map((skill, skillIndex) => (
                          <p key={skillIndex} className="mr-2">
                            {skill}{" "}
                          </p>
                        ))}
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          )}

          <div className="border-summary">
            {updateCV ||
              (translateCV && (
                <div className="bg-MyBlue text-white rounded-full h-8 w-8  flex justify-center absolute top-2 right-2 ">
                  <PencilSimple
                    size={26}
                    className="pt-1"
                    onClick={() =>
                      setUpdateCertificates((prevState) => !prevState)
                    }
                  />
                </div>
              ))}
            <h3>Certifieringer: </h3>
            {certificates.map((certificate, index) => (
              <div key={index} className="flex my-2 ">
                {" "}
                <p className="mr-4 font-semibold">{certificate.year}</p>
                <div>
                  <p className="mr-2 font-medium">
                    {certificate.certificateName}
                  </p>
                  <p className="mr-2 italic">{certificate.description}</p>
                </div>
              </div>
            ))}{" "}
            {updateCertificates && (
              <div className="mt-4">
                <AddCertificateSection
                  certificates={certificates}
                  dispatchCertificates={dispatchCertificates}
                />
              </div>
            )}
          </div>

          <div className="border-summary">
            {" "}
            {updateCV && (
              <div className="bg-MyBlue text-white rounded-full h-8 w-8  flex justify-center absolute top-2 right-2 ">
                <PencilSimple
                  size={26}
                  className="pt-1"
                  onClick={() => setUpdateLanguages((prevState) => !prevState)}
                />
              </div>
            )}
            <h3 className="mb-2">Språk: </h3>
            {cv.summarizedCompetence.languages.map((language, index) => (
              <div key={index} className="grid md:grid-cols-6 sm:grid-cols-3">
                <p className="font-semibold">{language.language}</p>

                <p>{language.level}</p>
              </div>
            ))}{" "}
            {updateLanguages && (
              <div className="mt-4">
                <AddLanguageSection
                  cvLanguage={cv.language}
                  languages={languages}
                  dispatchLanguages={dispatchLanguages}
                />
              </div>
            )}
          </div>

          <div className="border-summary">
            {" "}
            {updateCV && (
              <div className="bg-MyBlue text-white rounded-full h-8 w-8  flex justify-center absolute top-2 right-2 ">
                <PencilSimple
                  size={26}
                  className="pt-1"
                  onClick={() => setUpdateCourses((prevState) => !prevState)}
                />{" "}
              </div>
            )}
            <h3>Kurser: </h3>
            {courses?.map((course, index) => (
              <div
                key={index}
                className="grid grid-cols-3 md:grid-cols-5 my-2 "
              >
                <p className="font-semibold mr-4">{course.date}</p>
                <div className="col-span-2 md:col-span-4">
                  <p className="mr-2 font-medium">{course.courseName}</p>
                  <p className="italic">{course.courseDescription}</p>
                </div>
              </div>
            ))}{" "}
            {updateCourses && (
              <div className="mt-4">
                <AddCoursesSection
                  courses={courses}
                  dispatchCourses={dispatchCourses}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummarySection;
