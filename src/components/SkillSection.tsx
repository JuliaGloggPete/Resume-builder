import { useState } from "react";
import { Skill } from "../../types";
import { initialStateSkill } from "../initialStatesNSchemas/initialStates";
import { PencilSimple } from "@phosphor-icons/react";
interface Props {
  skills: Skill[];
  updateCV?: boolean;
  translateCV: boolean;
  addSkills: boolean;
  dispatchSkills: React.Dispatch<any>;
}

const SkillSection = ({
  updateCV,
  translateCV,
  addSkills,
  dispatchSkills,
  skills,
}: Props) => {
  const [newSkill, setSkill] = useState<Skill>(initialStateSkill);

  const [updateSkills, setUpdateSkills] = useState<boolean>(false);
  const addNResetSkills = () => {
    dispatchSkills({ type: "add", skill: newSkill });
    setSkill(initialStateSkill);
  };
  const addProficiency = (usedSkill: Skill, proficiency: number) => {
    dispatchSkills({
      type: "patch",
      skill: { skill: usedSkill.skill },
      proficiency: proficiency,
    });
  };

  const handleSkillChange = (index: number, newSkillName: string) => {
    const skill = skills[index];
    dispatchSkills({
      type: "patch",
      skill: { skill: skill.skill },
      newSkillName: newSkillName,
    });
  };

  return (
    <div>
      <h3 className="text-center">Teknisk kompetens</h3>
      <div className="flex flex-wrap justify-center relative">
        {(updateCV || translateCV) && !updateSkills && (
          <div className="bg-white text-MyBlue rounded-full h-6 w-6 mx-8 flex justify-center">
            <PencilSimple
              size={20}
              className="pt-1"
              onClick={() => {
                setUpdateSkills((prevState) => !prevState);
              }}
            />
          </div>
        )}
        {skills?.map((skill, index) => (
          <p key={index}>
            {skill.skill} ({skill.proficiency}) &nbsp;{" "}
          </p>
        ))}
      </div>

      <div>
        <div>
          {updateSkills && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 my-2 ">
              {skills?.map((skill, skillIndex) => (
                <div className="flex" key={`newCV-skill-${skillIndex}`}>
                  <input
                    className="bg-slate-100 justify-center py-2 px-4 rounded-sm shadow-md text-sm m-2 font-medium text-slate-800 cursor-pointer "
                    value={skill.skill}
                    onChange={(e) =>
                      handleSkillChange(skillIndex, e.target.value)
                    }
                    name={skill.skill}
                  />
                  <span>
                    <select
                      className="bg-slate-100 justify-center py-2 px-4 rounded-sm shadow-md text-sm my-2 font-medium text-slate-800 "
                      style={{ height: "2.5rem" }}
                      onChange={(event) =>
                        addProficiency(skill, parseInt(event.target.value))
                      }
                      value={
                        skill.proficiency === 0 ? "default" : skill.proficiency
                      }
                    >
                      <option value="default">Välj</option>
                      {[1, 2, 3, 4, 5].map((value) => (
                        <option key={value} value={value}>
                          {value}
                        </option>
                      ))}
                    </select>
                  </span>
                </div>
              ))}{" "}
            </div>
          )}
        </div>

        {addSkills && (
          <div className="mx-32">
            <label className=" self-center "> Ny skill:</label>
            <input
              name="extraSkillOther"
              className="form-input"
              value={newSkill.skill}
              type="text"
              id="extraSkillOther"
              onChange={(e) => setSkill({ ...newSkill, skill: e.target.value })}
            />
            <label className=" self-center "> kategori: </label>
            <select
              name="nySkillCategory"
              className="form-input"
              defaultValue={newSkill.categories[0]}
              onChange={(e) =>
                setSkill({ ...newSkill, categories: [e.target.value] })
              }
            >
              <option value="UNDEFINED">ej angiven</option>
              <option value="standards">Webstandard</option>
              <option value="languages">Utvecklingsspråk</option>
              <option value="frames">Ramverk</option>
              <option value="tools">Verktyg</option>
              <option value="methods">Metod</option>
            </select>

            <label className=" self-center "> skicklighet: </label>

            <span>
              <select
                className="bg-slate-100 justify-center py-2 px-4 rounded-sm shadow-md text-sm my-2 font-medium text-slate-800 "
                style={{ height: "2.5rem" }}
                onChange={(e) =>
                  setSkill({
                    ...newSkill,
                    proficiency: parseInt(e.target.value),
                  })
                }
                value={
                  newSkill.proficiency === 0 ? "default" : newSkill.proficiency
                }
              >
                <option value="default">Välj</option>
                {[1, 2, 3, 4, 5].map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </span>
            <div className="flex  align-middle items-center md:justify-center">
              <button className="btn" type="button" onClick={addNResetSkills}>
                Lägg till
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SkillSection;
