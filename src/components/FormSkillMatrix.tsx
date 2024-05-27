import React from "react";
import { Skill } from "../../types";
import { useState } from "react";
import SkillMatrix from "./SKillMatrix";

interface FormSkillsProps {
  skills: Skill[];
  dispatchSkills: React.Dispatch<any>;
}

export const FormSkillMatrix: React.FC<FormSkillsProps> = ({
  skills,
  dispatchSkills,
}) => {
  const [usedSkills, setUsedSkills] = useState<Skill[]>([]);

  const sortedSkills = () => {
    return skills.slice().sort((a, b) => {
      return a.skill.localeCompare(b.skill);
    });
  };
  const addUsedSkill = (newSkill: Skill) => {
    setUsedSkills((prevSkills) => [...prevSkills, newSkill]);
  };

  const addProficiency = (usedSkill: Skill, proficiency: number) => {
    const parsedProficiency = isNaN(proficiency) ? undefined : proficiency;
    dispatchSkills({
      type: "patch",
      skill: { skill: usedSkill.skill },
      proficiency:parsedProficiency,
    });
  };

  return (
    <div className="form-section">
      <div>
        <p className="form-head-of-section">Skillmatrix</p>
      </div>

      <p>
        Välj vilka av dina skills du vill visa i matrixen, sedan kan du ange
        proffesionlitäts leveln till den
      </p>

      <div className="-mx-6 lg:-mx-9 -mb-3 px-6 lg:px-9 py-3">
        <div className="flex flex-wrap">
          {sortedSkills().map((skill, index) => (
            <button
              key={index}
              type="button"
              className="btn-outlined mr-2 mt-2"
              onClick={() => addUsedSkill(skill)}
            >
              {skill.skill}
            </button>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mt-8">
        {usedSkills.map((skill, index) => (
          <div key={index} className="flex flex-grow justify-between">
            <p className=" mt-4">{skill.skill}</p>

            <span>
              <select
                className="form-input"
                id={`skill.proficiency.${index}`}
                onChange={(event) => addProficiency(skill, parseInt(event.target.value))}
              >
          
                   <option value="default"> Välj </option>
                   {[0, 1, 2, 3, 4, 5].map((value) => (
                     <option key={value} value={value}>
                       {value}
             
                  </option>
                ))}
              </select>
            </span>
          </div>
        ))}
      </div>

      <div>
        <SkillMatrix skills={skills} />
      </div>
    </div>
  );
};
