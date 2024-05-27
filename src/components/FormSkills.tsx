import React, { useEffect, useState } from "react";
import { Skill } from "../../types";
import ButtonComponent from "./ButtonComponent";
import skillsDeveloper from "../assets/skillsDeveloper.json";
import skillsManagement from "../assets/skillsManagement.json";
import skillsUX from "../assets/skillsUX.json";

interface FormSkillsProps {
  skills: Skill[];
  dispatchSkills: React.Dispatch<any>;
}
interface Category {
  name: string[];
  skills: string[];
}

const FormSkills = ({ skills, dispatchSkills }: FormSkillsProps) => {
  const [extraSkills, setExtraSkills] = useState<{ [key: string]: string }>({});
  const [job, setJob] = useState<string>("developer");
  const [categories, setCategories] = useState<Category[]>(
    skillsDeveloper.skills
  );

  useEffect(() => {
    switch (job) {
      case "developer":
        setCategories(skillsDeveloper.skills);
        break;
      case "uxDesigner":
        setCategories(skillsUX.skills);
        break;
      case "management":
        setCategories(skillsManagement.skills);
        break;
      default:
        setCategories(skillsDeveloper.skills);
        break;
    }
  }, [job]);

  const handleCheckboxChange = (
    category: string,
    skillName: string,
    checked: boolean
  ) => {
    const actionType = checked ? "add" : "delete";
    let skillToDispatch: Skill | undefined;

    if (actionType === "add") {
      skillToDispatch = {
        skill: skillName,
        categories: [category],
        proficiency: 0,
      };
    } else {
      // Find the skill that you want to delete
      skillToDispatch = skills.find(
        (s) => s.skill?.toUpperCase() === skillName.toUpperCase()
      );
    }

    if (skillToDispatch) {
      dispatchSkills({
        type: actionType,
        skill: skillToDispatch,
      });
    } else if (actionType === "delete") {
      console.error(`Failed to delete skill: ${skillName}`);
    }
  };

  const addExtraSkill = (category: string) => {
    const newSkill: Skill = {
      skill: extraSkills[category] || "",
      categories: [category],
      proficiency: 0,
    };
    dispatchSkills({
      type: "add",
      skill: newSkill,
    });
    setExtraSkills({ ...extraSkills, [category]: "" });
  };
  const handleExtraSkillChange = (category: string, value: string) => {
    setExtraSkills({ ...extraSkills, [category]: value });
  };

  return (
    <div className="form-section">
      <div className="relative">
        <p className="form-head-of-section">Skillset</p>
        <select
          className="absolute top-0 right-0 bg-white justify-center py-2 px-4 rounded-sm  text-sm my-2 font-medium text-slate-800 cursor-pointer"
          onChange={(e) => setJob(e.target.value)}
        >
          <option value="developer">Utvecklare</option>
          <option value="uxDesigner">UX-Designer</option>
          <option value="management">Projektledare / IT Management</option>
        </select>
      </div>
      {categories.map((category, index) => (
        <div key={index}>
          <p className="font-semibold mr-3 mt-4 capitalize">{category.name}:</p>
          <div className="flex flex-wrap my-2">
            {category.skills.map((skill, skillIndex) => (
              <div key={skillIndex}>
                <input
                  type="checkbox"
                  className="mr-2"
                  id={`checkbox-${index}-${skillIndex}`}
                  name={skill}
                  checked={skills?.some(
                    (s) => s.skill?.toUpperCase() === skill.toUpperCase()
                  )}
                  onChange={(e) =>
                    handleCheckboxChange(
                      category.name[0],
                      skill,
                      e.target.checked
                    )
                  }
                />
                <label
                  className="mr-4"
                  htmlFor={`checkbox-${index}-${skillIndex}`}
                >
                  {skill}
                </label>
              </div>
            ))}
          </div>
          <div className="grid md:grid-cols-6 gap-2">
            <label className=" self-center md:col-span-2">
              Ytterliggare {category.name}:
            </label>
            <input
              name={`extra${category.name}`}
              className="form-input md:col-span-3"
              value={extraSkills[category.name[0]] || ""}
              type="text"
              onChange={(e) =>
                handleExtraSkillChange(category.name[0], e.target.value)
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  addExtraSkill(category.name[0]);
                }
              }}
              id={`extra${category.name[0]}`}
            />

            <ButtonComponent
              setFunction={() => addExtraSkill(category.name[0])}
              position="center"
            />
          </div>
        </div>
      ))}
      <div className="grid md:grid-cols-6 gap-2">
        <label className=" self-center md:col-span-2">
          {" "}
          Ytterliggare skillls som ej passar till kategorien ovan:
        </label>
        <input
          name="extraSkillOther"
          value={extraSkills["other"] || ""}
          className="form-input md:col-span-3"
          onChange={(e) => handleExtraSkillChange("other", e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              addExtraSkill("other");
            }
          }}
          type="text"
          id="extraSkillOther"
        />
        <ButtonComponent
          setFunction={() => addExtraSkill("other")}
          position="center"
        />
      </div>
      <div className="bg-MyBlue text-white -mx-6 lg:-mx-9 -mb-3 px-6 lg:px-9 py-3 mt-4">
        <p className="font-semibold">Angivna skills:</p>
        <div className="flex flex-wrap">
          {skills?.map((skill, index) => (
            <p
              key={index}
              onClick={() => {
                dispatchSkills({
                  type: "delete",
                  skill: skill,
                });
              }}
              className="flex items-center hover:text-red-400 "
            >
              {skill.skill},&nbsp;{" "}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FormSkills;
