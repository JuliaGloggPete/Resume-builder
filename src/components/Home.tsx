import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
//import min from "../assets/min.json";
import { Resume, FilteredResume } from "../../types";
import { Check } from "@phosphor-icons/react";
import ButtonComponent from "./ButtonComponent";
import { initialFormState } from "../initialStatesNSchemas/initialStates";
import InputComponent from "./InputComponent";
import { ApiCall } from "../utils/ApiCall";
import { setWOID } from "../utils/setWOID";

export const Home = () => {
  const [updateInputValue, setUpdateInputValue] = useState("");
  const [translateInputValue, setTranslateInputValue] = useState("");
  const [matchedNamesTranslate, setMatchedNamesTranslate] = useState<Resume[]>(
    []
  );
  const [matchedNamesUpdate, setMatchedNamesUpdate] = useState<Resume[]>([]);
  const [selectedCandidate, setSelectedCandidate] = useState<Resume[]>([]);
  //if you want to use mockdata set "min" otherwise set initialFormState
  //const [all, setAll] = useState<Resume[]>(min);
  const [all, setAll] = useState<Resume[]>([initialFormState]);
  const [allWithOutIDExceptResume, setAllWithoutID] = useState<Resume[]>([
    initialFormState,
  ]);
  const [neededSkills, setNeededSkills] = useState<string[]>([]);
  const [neededSkill, setNeededSkill] = useState<string>("");
  const [matchedCVs, setMatchedCVs] = useState<FilteredResume[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingError, setError] = useState<string | null>(null);

  const url = "https://as-cvapp.azurewebsites.net/api/Resume/all";
  const getData = async (retryCount = 0) => {
    setLoading(true);
    setError(null);
    try {
      const data = await ApiCall(url, "GET");
      setAll(data);
      const transformedData = data.map((cv: Resume) => setWOID(cv)[0]);
      setAllWithoutID(transformedData);
      console.log("TEST", allWithOutIDExceptResume);
    } catch (error) {
      if (retryCount < 3) {
        console.error("Error fetching data, retrying:", error);
        setTimeout(() => getData(retryCount + 1), 10000); // Retry after 10 seconds
      } else {
        setError("Failed to fetch data after multiple attempts.");
        alert(`${loadingError} please reload the page`);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleSkillChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNeededSkill(event.target.value);
  };
  const addNeededSkill = (skill: string) => {
    setNeededSkills((prevSkills) => [...prevSkills, skill]);
    setNeededSkill("");
  };

  useEffect(() => {
    const filteredCVs = filterCVsBySkills(neededSkills);
    setMatchedCVs(filteredCVs);
  }, [neededSkills]); // Trigger this effect whenever neededSkills changes

  const findMatchingNames = (inputValue: string, typeOfAction: string) => {
    // const sourceData = typeOfAction === "update" ? all : allWithOutIDexceptResume;

    //TODO as put is not working and a post needs to be without ids  sourceData is the same for
    // update and translate - this will probably change when put is in place
    const sourceData = allWithOutIDExceptResume;

    console.log("sourceData", sourceData);
    const filtered = sourceData.filter((cv) => {
      const fullName =
        cv.consultantInfo.firstName?.toLowerCase() +
        " " +
        cv.consultantInfo.lastName?.toLowerCase();
      const reversedFullName =
        cv.consultantInfo.lastName?.toLowerCase() +
        " " +
        cv.consultantInfo.firstName?.toLowerCase();
      return (
        fullName.includes(inputValue.toLowerCase()) ||
        reversedFullName.includes(inputValue.toLowerCase()) ||
        cv.consultantInfo
          .firstName!.toLowerCase()
          .includes(inputValue.toLowerCase()) ||
        cv.consultantInfo
          .lastName!.toLowerCase()
          .includes(inputValue.toLowerCase())
      );
    });

    if (typeOfAction === "update") {
      setMatchedNamesUpdate(filtered);
    } else {
      setMatchedNamesTranslate(filtered);
    }
  };

  const handleChoosenCandidate = (candidate: Resume) => {
    const candidateIndex = selectedCandidate.findIndex(
      (s) => s.resumeId === candidate.resumeId
    );

    if (candidateIndex === -1) {
      // Resume is not selected, add it to the list
      setSelectedCandidate((prevCVs) => [...prevCVs, candidate]);
    } else {
      // Resume is already selected, remove it from the list
      setSelectedCandidate((prevCVs) => {
        const updatedCVs = [...prevCVs];
        updatedCVs.splice(candidateIndex, 1);
        return updatedCVs;
      });
    }
  };
  const isSelected = (resume: Resume) => {
    return selectedCandidate.some(
      (candidate) => candidate.resumeId === resume.resumeId
    );
  };

  const filterCVsBySkills = (searchedSkills: string[]): FilteredResume[] => {
    return all
      .reduce((filteredResumes: FilteredResume[], resume) => {
        const matchingSkills = resume.skills.reduce(
          (
            accumulator: {
              matches: number;
              proficiencyScore: number;
              skills: { skill: string; proficiency: number }[]; // Changed proficiency to number
            },
            skill
          ) => {
            if (
              searchedSkills.some(
                (searchedSkill) =>
                  searchedSkill.toLowerCase() === skill.skill.toLowerCase()
              )
            ) {
              accumulator.matches += 1;

              //now proficiency shall be send as a string like "****" so here is the code adjustment
              //this will likely change wiht the new update
              const proficiencyScore = skill.proficiency;
              accumulator.proficiencyScore += proficiencyScore;
              accumulator.skills.push({
                skill: skill.skill,
                proficiency: proficiencyScore, // Changed to proficiencyScore
              });
            }
            return accumulator;
          },
          { matches: 0, proficiencyScore: 0, skills: [] }
        );

        if (matchingSkills.matches > 0) {
          filteredResumes.push({ resume: { ...resume }, matchingSkills });
        }

        return filteredResumes;
      }, [])
      .sort((a, b) => {
        if (b.matchingSkills.matches !== a.matchingSkills.matches) {
          return b.matchingSkills.matches - a.matchingSkills.matches;
        }
        return (
          b.matchingSkills.proficiencyScore - a.matchingSkills.proficiencyScore
        );
      });
  };

  return (
    <div className="my-4 grid gap-4">
      <div className="my-4 border rounded-tl-xl p-6">
        <div>
          <h3 className="font-bold text-xl mb-2">
            Vilka skills letar du efter{" "}
          </h3>
          <div className="grid md:grid-cols-4">
            <InputComponent
              value={neededSkill}
              placeholder="Html"
              name="skillSearch"
              keyDown={(e) => {
                if (e.key === "Enter") {
                  addNeededSkill(neededSkill);
                }
              }}
              setFunction={handleSkillChange}
            />
            <ButtonComponent
              setFunction={() => addNeededSkill(neededSkill)}
              label="Lagg till Skill"
              position="center"
            />
          </div>

          <div className="flex my-2">
            {neededSkills.map((skill, index) => (
              <p key={index}>{skill},&nbsp;</p>
            ))}
          </div>

          {!loading && (
            <div className="grid gap-3 md:grid-cols-3 end-0">
              {matchedCVs.map((cv, index) => (
                <div
                  className={`my-4 p-2 relative rounded-tl-xl border ${
                    isSelected(cv.resume)
                      ? " border-MyBlue"
                      : "border-slate-300"
                  }`}
                  key={index}
                  onClick={() => handleChoosenCandidate(cv.resume)}
                >
                  {" "}
                  {isSelected(cv.resume) && (
                    <Check
                      className="absolute top-2 right-2 p-1 bg-MyBlue text-white rounded-full"
                      size={32}
                    />
                  )}
                  <h2 className="font-bold text-center text-xl ">
                    {cv.resume.consultantInfo.firstName}{" "}
                    {cv.resume.consultantInfo.lastName}- {cv.resume.language}
                  </h2>
                  <div className="flex flex-wrap my-2 ">
                    {cv.resume.skills.map((skill, skillIndex) => (
                      <p className="mr-1" key={skillIndex}>
                        {skill.skill}&nbsp;
                      </p>
                    ))}
                  </div>
                  <div className="grid gap-2  ">
                    {" "}
                    <div className="flex">
                      {" "}
                      <p className="font-semibold">Matchar:&nbsp;</p>
                      <p>{cv.matchingSkills.matches}</p>
                    </div>
                    <div className="flex">
                      <p className="font-semibold">
                        Summerad skicklighet:&nbsp;
                      </p>
                      <p>{cv.matchingSkills.proficiencyScore}</p>{" "}
                    </div>
                    <div>
                      <p className="font-semibold mb-2">Skills som matchar: </p>
                      {cv.matchingSkills.skills.map((skill, skillIndex) => (
                        <div className="flex">
                          <p key={skillIndex} className="font-semibold">
                            {skill.skill}&nbsp;
                          </p>
                          <p>skicklighet: {skill.proficiency}</p>
                        </div>
                      ))}
                    </div>
                    <Link
                      className="btn-outlined mx-auto mb-4"
                      to={`/cv/${cv.resume.consultantInfo.firstName}${cv.resume.consultantInfo.lastName}/download`}
                      state={{ cv: cv.resume, type: "download" }}
                    >
                      Se hela CV:n
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

          {loading && <div>...loading</div>}

          {matchedCVs && matchedCVs.length > 0 && (
            <div className="flex justify-end">
              {" "}
              <ButtonComponent
                setFunction={() => addNeededSkill(neededSkill)}
                label="Ladda ner utvalda"
                position="center"
              />
            </div>
          )}
        </div>
      </div>

      <div className="my-4 border p-6">
        <div>
          <h3 className="font-bold text-xl mb-2"> Om du inte har en CV än </h3>

          <div className="md:flex justify-between">
            <p>
              Skapa ett CV från, vilket språk den ska vara i, kan du välja
              direkt i mallen. <br /> <strong>OBS </strong>har du redan ett CV
              uppladdad och vill bara översätta texterna gåt till "Översätt"
              istället
            </p>
            <Link to="/createCV">
              <ButtonComponent label="Skapa ett CV" position="center" />
            </Link>
          </div>
        </div>
      </div>
      <div className="my-4 border p-6">
        <h3 className="font-bold text-xl mb-2"> Om du vill updatera ett CV</h3>
        <div className="grid md:grid-cols-4 gap-2 items-center ">
          <div className="md:col-span-3">
            <InputComponent
              value={updateInputValue}
              labelText="Ange för- och efternamn:"
              name="updateNameInput"
              keyDown={(e) => {
                if (e.key === "Enter") {
                  findMatchingNames(updateInputValue, "update");
                }
              }}
              setFunction={(e) => setUpdateInputValue(e.target.value)}
            />
          </div>
          <ButtonComponent
            setFunction={() => findMatchingNames(updateInputValue, "update")}
            label="Hitta"
          />
        </div>
        {loading && <div>...loading</div>}

        {!loading && (
          <div className="grid  md:grid-cols-2 xl:grid-cols-4 my-2">
            {matchedNamesUpdate.length > 0 &&
              matchedNamesUpdate.map((cv, index) => (
                <div key={index} className="cursor-pointer my-4">
                  <Link
                    className="btn-outlined"
                    to={`/cv/${cv.consultantInfo.firstName}${cv.consultantInfo.lastName}/update`}
                    state={{ cv: cv, type: "update" }}
                  >
                    {" "}
                    {cv.consultantInfo.firstName} {cv.consultantInfo.lastName} -{" "}
                    {cv.language}
                  </Link>
                </div>
              ))}
          </div>
        )}
      </div>
      <div className="my-4 border p-6">
        <h3 className="font-bold text-xl mb-2 textcenter">
          Om du har ett CV och vill översätta med ditt CV som mall
        </h3>
        <div className="grid  md:grid-cols-4 gap-2 items-center ">
          <div className=" md:col-span-3">
            <InputComponent
              value={translateInputValue}
              labelText="Ange för- och efternamn:"
              name="translateNameInput"
              keyDown={(e) => {
                if (e.key === "Enter") {
                  findMatchingNames(translateInputValue, "translate");
                }
              }}
              setFunction={(e) => setTranslateInputValue(e.target.value)}
            />
          </div>

          <ButtonComponent
            setFunction={() =>
              findMatchingNames(translateInputValue, "translate")
            }
            label="Hitta"
          />
        </div>
        {loading && <div>...loading</div>}

        {!loading && (
          <div className="grid  md:grid-cols-2 xl:grid-cols-4 my-2">
            {matchedNamesTranslate.length > 0 &&
              matchedNamesTranslate.map((cv, index) => (
                <div key={index} className="cursor-pointer my-4">
                  <Link
                    className="btn-outlined"
                    to={`/cv/${cv.consultantInfo.firstName}${cv.consultantInfo.lastName}/translate`}
                    state={{ cv: cv, type: "translate", cvID: cv.resumeId }}
                  >
                    {cv.consultantInfo.firstName} {cv.consultantInfo.lastName} -{" "}
                    {cv.language}
                  </Link>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};
