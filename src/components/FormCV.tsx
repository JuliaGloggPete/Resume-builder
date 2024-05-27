import { useState, useReducer, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FormGeneralInfo } from "./FormGeneralInfo";
import { FormOverAllResume } from "./FormOverAllResume";
import FormSkills from "./FormSkills";
import * as InitialStates from "../initialStatesNSchemas/initialStates";
import { FormSkillMatrix } from "./FormSkillMatrix";
import { FormWorkExperience } from "./FormWorkExperience";
import { ConsultantSchema } from "../initialStatesNSchemas/Schema";
import consultantReducer from "../Reducers/consultantReducer";
import generateReducer from "../Reducers/itemReducer";
import skillsReducer from "../Reducers/skillsReducer";
//import min from "../assets/min.json";
import { z } from "zod";
import * as Type from "../../types";
import { setWOID } from "../utils/setWOID";
import clientReducer from "../Reducers/clientReducer";

const sellerInfo = {
  email: "mail@mail.se",
  phoneNumber: "123456789",
  sellerName: "Dennis",
  sellerLastname: "Stigsson",
};

export const FormCV = () => {
  //swedish by default
  const [cVLanguage, setCVLanguage] = useState<string>("se");
  const [file, setFile] = useState<File | null>(null);
 // const [demo, setDemo] = useState<boolean>(false)

  const [imageUrl, setImageUrl] = useState<string>("");

  const [allData, setAllData] = useState<Type.Resume>(
    InitialStates.initialFormState
  );
  const [consultantErrors, setConsultantErrors] = useState({});
  const [skills, dispatchSkills] = useReducer(
    skillsReducer,
    InitialStates.initialStateSkills
  );
  /*
  const [works, dispatchWorks] = useReducer(
    generateReducer<Type.Client, "assignmentDescription">(
      InitialStates.initialStateWorkExs,
      "assignmentDescription"
    ),
    InitialStates.initialStateWorkExs
  ); */
  const [works, dispatchWorks] = useReducer(
    clientReducer, 
    InitialStates.initialStateWorkExs
  );



  const [certificates, dispatchCertificates] = useReducer(
    generateReducer<Type.Certificate, "certificateName">(
      InitialStates.initialStateCertificates,
      "certificateName"
    ),
    InitialStates.initialStateCertificates
  );
  const [educations, dispatchEducations] = useReducer(
    generateReducer<Type.Education, "description">(
      InitialStates.initialEducationsState,
      "description"
    ),
    InitialStates.initialEducationsState
  );
  const [languages, dispatchLanguages] = useReducer(
    generateReducer<Type.Language, "language">(
      InitialStates.initialStateLanguages,
      "language"
    ),
    InitialStates.initialStateLanguages
  );
  const [courses, dispatchCourses] = useReducer(
    generateReducer<Type.Course, "courseDescription">(
      InitialStates.initialStateCourses,
      "courseDescription"
    ),
    InitialStates.initialStateCourses
  );

  const [consultantInfo, dispatchConsultantInfo] = useReducer(
    consultantReducer,
    InitialStates.initialConsultantState
  );

  useEffect(() => {
    console.log("Updated consultantINFO:", consultantInfo);

    setAllData((prevData) => ({
      ...prevData,
      language: cVLanguage,
      consultantInfo: consultantInfo,
      skills: skills,
      assignment: { clients: works },
      summarizedCompetence: {
        educations: educations,
        languages: languages,
        certificates: certificates,
        courses: courses,
      },
    }));
  }, [
    cVLanguage,
    consultantInfo,
    skills,
    works,
    languages,
    certificates,
    courses,
    educations,
    file,
    imageUrl,
  ]);

  useEffect(() => {}, [allData]);

  const errorMessages: { [key: string]: string } = {};

  const parseErrorMessages = (errors: any) => {
    for (const error of errors) {
      const fieldName = error.path.join(".");
      errorMessages[fieldName] = error.message;
    }

    return errorMessages;
  };
  const navigate = useNavigate();
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault(); // prevents resetting when I submit

    setAllData((prevData) => ({
      ...prevData,
      language: cVLanguage,
      consultantInfo: consultantInfo,
      sellerInfo: sellerInfo,
      skills: skills,
      assignment: { clients: works },
      summarizedCompetence: {
        educations: educations,
        languages: languages,
        certificates: certificates,
        courses: courses,
      },
    }));
    try {
      ConsultantSchema.parse(consultantInfo);

      // Update allData with the latest state values
      setAllData((prevData) => ({
        ...prevData,
        language: cVLanguage,
        consultantInfo: consultantInfo,
        sellerInfo: sellerInfo,
        skills: skills,
        assignment: { clients: works },
        summarizedCompetence: {
          educations: educations,
          languages: languages,
          certificates: certificates,
          courses: courses,
        },
      }));

      // Ensure the updated state is used
      const updatedData = {
        ...allData,
        language: cVLanguage,
        consultantInfo: consultantInfo,
        sellerInfo: sellerInfo,
        skills: skills,
        assignment: { clients: works },
        summarizedCompetence: {
          educations: educations,
          languages: languages,
          certificates: certificates,
          courses: courses,
        },
      };

      const jsonForm = JSON.stringify(updatedData);
      console.log(jsonForm);

      const formData = new FormData();
      formData.append("newResumeJson", jsonForm);
      if (file) {
        formData.append("imageFile", file);
      } else {
        console.error("No file selected for imageFile");
      }

      console.log("formdata",formData)

      const response = await fetch(
        "https://as-cvapp.azurewebsites.net/api/Resume",
        {
          method: "POST",
          body: formData,
          headers: {
            "Ocp-Apim-Subscription-Key":
              import.meta.env.VITE_SUBSCRIPTION_KEY || "",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }

      const responseData = await response.json();
      console.log("Success:", responseData);
      const dataWOID = setWOID(responseData)

      navigate(
        `cv/${consultantInfo.firstName}${consultantInfo.lastName}/check`,
        { state: { cv: dataWOID[0], type: "check" } }
      );
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMessages = parseErrorMessages(error.errors);
        setConsultantErrors(errorMessages);
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
        console.log(errorMessages);
      } else {
        console.error("An unknown error occurred:", error);
        alert("An unknown error occurred.");
      }
    }
  };

  return (
    <div>
     {/*  <button className="btn my-4" onClick={()=>{setDemo((prevState) => !prevState)}}>DEMO</button>
 */}
      <form
        onSubmit={handleSubmit}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
          }
        }}
      >
        <FormGeneralInfo
          cvLanguage={cVLanguage}
          setCVLanguage={setCVLanguage}
          consultantInfo={consultantInfo}
          dispatchConsultantInfo={dispatchConsultantInfo}
          errorMessages={consultantErrors}
          imageUrl={imageUrl}
          setImageUrl={setImageUrl}
          file={file}
          setFile={setFile}
        />
        <div id="form-skills">
          <FormSkills skills={skills} dispatchSkills={dispatchSkills} />
        </div>
        <FormSkillMatrix skills={skills} dispatchSkills={dispatchSkills} />

        <div className="form-section">
          <div>
            <p className="form-head-of-section">Tidigare Jobbuppdrag</p>
          </div>
          <FormWorkExperience
            skills={skills}
            works={works}
            dispatchWorks={dispatchWorks}
          />
        </div>
        <FormOverAllResume
        cvLanguage ={cVLanguage}
          certificates={certificates}
          dispatchCertificates={dispatchCertificates}
          educations={educations}
          dispatchEducations={dispatchEducations}
          courses={courses}
          dispatchCourses={dispatchCourses}
          languages={languages}
          dispatchLanguages={dispatchLanguages}
        />
        <div className="flex justify-center text-2xl">
          <button onClick={handleSubmit} type="submit" className="btn-outlined">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
