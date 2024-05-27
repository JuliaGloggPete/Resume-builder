import { useState, useReducer, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Resume } from "../../types";
import WorkExperience from "./WorkExperience";
import SkillMatrix from "./SKillMatrix";
//import { ConsultantSchema } from "../initialStatesNSchemas/Schema";
//import { z } from "zod";
import { Plus } from "@phosphor-icons/react";
import { FormWorkExperience } from "./FormWorkExperience";
import generateReducer from "../Reducers/itemReducer";
import * as Type from "../../types";
import SummarySection from "./SummarySectionGetCV";
import GeneralSection from "./GeneralSection";
import SkillSection from "./SkillSection";
//import min from "../assets/min.json";
import skillsReducer from "../Reducers/skillsReducer";
import clientReducer from "../Reducers/clientReducer";

export const GetCV = ({ type }: { type: string }) => {
  const location = useLocation();
  const { cv } = location.state || [];
  //const [consultantErrors, setConsultantErrors] = useState({});
  const [updateCV, setUpdateCV] = useState<boolean>(false);
  const [translateCV, setTranslateCV] = useState<boolean>(false);
  const [cVLanguage, setCVLanguage] = useState<string>(cv.language);
  const [addSkills, setAddSkills] = useState<boolean>(false);
  const [addAssignments, setAddAssignments] = useState<boolean>(false);
  const [checkCv, setCheckCV] = useState<boolean>(false);
  const navigate = useNavigate();
  const url = `https://as-cvapp.azurewebsites.net/api/Resume/${cv.resumeId}`;

  const [data, setData] = useState<Resume>(cv);
  const oldImage = data.consultantInfo.imageUrl;
  const [file, setFile] = useState<File | null>(null);
  // const [demo, setDemo] = useState<boolean>(false)

  const [imageUrl, setImageUrl] = useState<string>(
    data.consultantInfo?.imageUrl || ""
  );

  useEffect(() => {
    if (type === "update") {
      setUpdateCV(true);
    } else if (type === "check") {
      setCheckCV(true);
    } else if (type === "translate" && !translateCV) {
      if (cVLanguage === "en") {
        setCVLanguage("se");
      } else {
        setCVLanguage("en");
      }

      setTranslateCV(true);
    }
  }, [type]);

  const errorMessages: { [key: string]: string } = {};

  const [consultantInfo, setConsultantInfo] = useState<Type.ConsultantInfo>(
    data.consultantInfo
  );

  const [skills, dispatchSkills] = useReducer(skillsReducer, data.skills);

  // throws an arrow when
  const [educations, dispatchEducations] = useReducer(
    generateReducer<Type.Education, "description">(
      data.summarizedCompetence.educations,
      "description"
    ),
    data.summarizedCompetence.educations
  );

  const [certificates, dispatchCertificates] = useReducer(
    generateReducer<Type.Certificate, "certificateName">(
      data.summarizedCompetence.certificates,
      "certificateName"
    ),
    data.summarizedCompetence.certificates
  );

  const [courses, dispatchCourses] = useReducer(
    generateReducer<Type.Course, "courseDescription">(
      data.summarizedCompetence.courses,
      "courseDescription"
    ),
    data.summarizedCompetence.courses
  );
  const [languages, dispatchLanguages] = useReducer(
    generateReducer<Type.Language, "language">(
      data.summarizedCompetence.languages,
      "language"
    ),
    data.summarizedCompetence.languages
  );

  const [works, dispatchWorks] = useReducer(
    clientReducer,
    data.assignment.clients
  );

  /*const parseErrorMessages = (errors: any) => {
    for (const error of errors) {
      const fieldName = error.path.join(".");
      errorMessages[fieldName] = error.message;
    }

    return errorMessages;
  };*/

  const updateData = () => {
    setData((prevData) => ({
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
  };
  useEffect(() => {
    console.log("Updating data:", languages);
    updateData();
    console.log("data", data);
  }, [
    cVLanguage,
    consultantInfo,
    skills,
    educations,
    languages,
    certificates,
    courses,
    works,
  ]);
  useEffect(() => {
    console.log("data after update:", data);
  }, [data]);

  const putData = async () => {
    console.log("OLD", oldImage);

    console.log(imageUrl);
    console.log(cv.consultantInfo.imageUrl);

    setConsultantInfo({
      ...consultantInfo,
      imageUrl: oldImage,
    });
    // await getImage();
    if (imageUrl === "" || imageUrl !== null) {
      if (oldImage !== "" && imageUrl !== null && oldImage) {
        setImageUrl(oldImage);
        setConsultantInfo({
          ...consultantInfo,
          imageUrl: oldImage,
        });
      }
    }

    const { resumeId, ...newCVWithoutId } = data;
    const jsonForm = JSON.stringify(newCVWithoutId);

    const formData = new FormData();
    formData.append("newResumeJson", jsonForm);

    if (file instanceof Blob) {
      formData.append("imageFile", file);
    }

    console.log("Formdata", formData);

    try {
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
        throw new Error("Network response was not ok");
      } else {
        if (updateCV) {
          try {
            const response = await fetch(
              `https://as-cvapp.azurewebsites.net/api/Resume/${cv.resumeId}`,
              {
                method: "DELETE",

                body: formData,
                headers: {
                  "Ocp-Apim-Subscription-Key":
                    import.meta.env.VITE_SUBSCRIPTION_KEY || "",
                },
              }
            );

            if (!response.ok) {
              throw new Error("NOT DELETED - Network response was not ok");
            }
            navigate("/");
          } catch (error) {
            console.error("Error fetching newCV:", error);
          }
        } else {
          navigate("/");
        }
      }
    } catch (error) {
      console.error("Error fetching newCV:", error);
    }
  };
  // TODO INFO Currently the "PUT" endpoint is NOT working as anticipated,
  // as we can change old input but not add to it when fixed uncommend and take away the code above

  ///TODO all ids need to be in the form change types - obs translation to not send with id

  /*
    try {
      console.log("PUT", JSON.stringify(data));
      const response = await fetch(
        `https://as-cvapp.azurewebsites.net/api/Resume/${cv.resumeId}`,
        {
          method: "PUT",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
            "Ocp-Apim-Subscription-Key":
              import.meta.env.VITE_SUBSCRIPTION_KEY || "",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }*/

  //endpoint not deployed
  const downloadResume = async () => {
    try {
      const response = await fetch(url);
      if (response.ok) {
        const jsonData = await response.json();
        console.log(jsonData);
        setData(jsonData);
      } else {
        console.error("Error fetching data:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching data:");
    }
  };
  /*
  const handleUpdate = () => {
    try {
      ConsultantSchema.parse(data.consultantInfo);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMessages = parseErrorMessages(error.errors);
        setConsultantErrors(errorMessages);
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
        console.log(errorMessages);
      }
    }
  }; */

  return (
    <div className="px-8">
      <h1 className="mt-4 text-center">Resumé</h1>

      <div>
        <GeneralSection
          cvLanguage={cVLanguage}
          setCVLanguage={setCVLanguage}
          updateCV={updateCV}
          translateCV={translateCV}
          consultantInfo={consultantInfo}
          setConsultantInfo={setConsultantInfo}
          errorMessages={errorMessages}
          imageUrl={imageUrl}
          setImageUrl={setImageUrl}
          file={file}
          setFile={setFile}
        />

        <div className="bg-MyBlue  text-white mb-3 px-6 py-3 mt-4 -mx-8 relative">
          {updateCV && (
            <div className="bg-white text-MyBlue  rounded-full h-8 w-8 mx-8 flex justify-center items-center absolute top-2 right-2 ">
              <Plus
                size={26}
                onClick={() => {
                  setAddSkills((prevState) => !prevState);
                }}
              />
            </div>
          )}
          <SkillSection
            addSkills={addSkills}
            updateCV={updateCV}
            translateCV={translateCV}
            skills={skills}
            dispatchSkills={dispatchSkills}
          />
        </div>
      </div>
      {!updateCV && (
        <div className="relative">
          <SkillMatrix skills={data.skills} />
        </div>
      )}
      <h2>Uppdrag</h2>
      {works.map((work, index) => (
        <div key={index}>
          <div className="relative">
            <WorkExperience
              work={work}
              dispatchWorks={dispatchWorks}
              update={updateCV}
              workIndex={index}
              translate={translateCV}
            />
          </div>
        </div>
      ))}
      {updateCV && (
        <div className="flex justify-center my-2">
          <button
            type="button"
            className="btn"
            onClick={() => {
              setAddAssignments((prevState) => !prevState);
            }}
          >
            addera
          </button>
        </div>
      )}

      {addAssignments && (
        <FormWorkExperience
          skills={data.skills}
          dispatchWorks={dispatchWorks}
        />
      )}
      <SummarySection
        cv={data}
        updateCV={updateCV}
        translateCV={translateCV}
        educations={educations}
        dispatchEducations={dispatchEducations}
        certificates={certificates}
        dispatchCertificates={dispatchCertificates}
        courses={courses}
        dispatchCourses={dispatchCourses}
        languages={languages}
        dispatchLanguages={dispatchLanguages}
      />

      {!updateCV && !translateCV && (
        <div className="flex justify-center">
          <button
            type="button"
            //currently not deployed onClick={downloadResume}
            className="btn text-xl"
          >
            Ladda ner CV
          </button>
        </div>
      )}

      {(updateCV || translateCV) && (
        <div className="flex justify-around mt-4 ">
          <button className="btn-outlined" type="button" onClick={putData}>
            Spara
          </button>

          <Link className="btn-outlined" to={`/`}>
            Cancel
          </Link>
        </div>
      )}

      {checkCv && (!updateCV || !translateCV) && (
        <div className="flex justify-around mt-4 ">
          <Link
            className="btn-outlined"
            to={`/cv/${cv.consultantInfo.firstName}${cv.consultantInfo.lastName}/update`}
            state={{ cv: cv, type: "update" }}
          >
            Redigera
          </Link>
          <Link
            className="btn-outlined"
            to={`/cv/${cv.consultantInfo.firstName}${cv.consultantInfo.lastName}/translate`}
            state={{ cv: cv, type: "translate" }}
          >
            Översätt
          </Link>
          <Link className="btn-outlined" to={`/`}>
            Stäng
          </Link>
        </div>
      )}
    </div>
  );
};
