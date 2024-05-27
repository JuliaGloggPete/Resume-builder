import React from "react";
import { useState, useEffect } from "react";
import { Skill, Client } from "../../types";
import WorkExperience from "./WorkExperience";
import { ClientSchema } from "../initialStatesNSchemas/Schema";
import { z } from "zod";
import InputComponent from "./InputComponent";
import ButtonComponent from "./ButtonComponent";

import { Trash } from "@phosphor-icons/react";

interface FormProps {
  skills: Skill[];
  works?: Client[];
  update?: boolean;
  dispatchWorks: React.Dispatch<any>;
}

export const FormWorkExperience: React.FC<FormProps> = ({
  skills,
  works,
  dispatchWorks,
}) => {
  const [technologies, setTechnologies] = useState<string[]>([]);
  const [showAll, setShowAll] = useState<boolean>(false);
  const [clientErrors, setClientErrors] = useState<{ [key: string]: any }>({});
  const [client, setClient] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [roles, setRoles] = useState<string[]>([]);
  const [workPeriod, setWorkPeriod] = useState<string>("");
  const [workScope, setWorkScope] = useState<string>("100%");

  useEffect(() => {}, [technologies]);

  useEffect(() => {
    addWork();
  }, [roles]);

  const [assignementDescription, setAssignementDescription] =
    useState<string>("");

  const sortedSkills = () => {
    return skills.slice().sort((a, b) => {
      return a.skill.localeCompare(b.skill);
    });
  };

  const addRole = (role: string) => {
    if (role !== "") {
      setRoles([...roles, role.trim()]);
      setRole("");
    }
  };
  const deleteRole = (index: number) => {
    setRoles(roles.filter((_, i) => i !== index));
  };
  const addTechnology = (checked: boolean, technology: string) => {
    if (technology !== "" && checked == true) {
      setTechnologies([...technologies, technology]);
    }
    if (technology !== "" && checked == false) {
      setTechnologies(technologies.filter((item) => item !== technology));
    }
  };

  const errorMessages: { [key: string]: string } = {};
  const parseErrorMessages = (errors: any) => {
    for (const error of errors) {
      const fieldName = error.path.join(".");
      errorMessages[fieldName] = error.message;
    }

    return errorMessages;
  };

  const addWorkExperience = () => {
    if (!roles || roles.length === 0) {
      if (role !== "") {
        console.log("1st", role);
        setRoles([role]);
        console.log(roles);
        setRole("");
      } else {
        alert("Roll måste fyllas i");
        return;
      }
    } else {
      addWork();
    }
  };

  const addWork = () => {
    console.log("after", roles);
    const newWorkExperience: Client = {
      client: client,
      roles: roles,
      technologies: technologies,
      timeSpan: workPeriod,
      scope: workScope,
      assignmentDescription: assignementDescription,
    };

    console.log(newWorkExperience);

    try {
      ClientSchema.parse(newWorkExperience);
      dispatchWorks({ type: "ADD_CLIENT", payload: newWorkExperience });
      setClient("");
      setRole("");
      setRoles([]);
      setWorkPeriod("");
      setWorkScope("100%");
      setTechnologies([]);
      setAssignementDescription("");
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMessages = parseErrorMessages(error.errors);
        setClientErrors(errorMessages);
        console.log(errorMessages);
      }
    }
  };

  return (
    <div>
      <div className="md:grid grid-cols-4 gap-4">
        <div className="col-span-3">
          <InputComponent
            value={client}
            placeholder="Uppdragsgivarensnamn"
            name="client"
            labelText="Uppdrag hos*"
            errorMessages={clientErrors}
            setFunction={(e) => setClient(e.target.value)}
          />
        </div>

        <div>
          <label>Anställningsomfattning</label>
          <select
            name="employmentType"
            onChange={(e) => setWorkScope(e.target.value)}
            className="form-input"
            id="scopeOfWork"
          >
            <option value="100%">100%</option>
            <option value="80%">80%</option>
            <option value="75%">75%</option>
            <option value="50%">50%</option>
            <option value="30%">30%</option>
            <option value="25%">25%</option>
            <option value="20%">20%</option>
          </select>
        </div>
      </div>
      <div>
        <div className="grid md:grid-cols-3">
          <div className="col-span-2 ">
            <InputComponent
              value={role}
              placeholder="t.ex. Frontend developper"
              name="role"
              labelText="Roll(er) hos kunden/arbetsgivaren"
              errorMessages={clientErrors}
              setFunction={(e) => setRole(e.target.value)}
              keyDown={(e) => {
                if (e.key === "Enter") {
                  addRole(role);
                }
              }}
            />
          </div>
          <ButtonComponent
            setFunction={() => addRole(role)}
            position="center"
          />
        </div>
      </div>

      <div>
        {roles?.map((role, index) => (
          <div className="flex  items-center mb-2" key={index}>
            <Trash
              size={32}
              className="delete mr-4 "
              onClick={() => deleteRole(index)}
            />{" "}
            <p className="mr-8 font-semibold">{role}</p>
          </div>
        ))}
      </div>

      <div className="md:grid md:grid-cols-2 md:gap-4 mt-4">
        <InputComponent
          name="scope"
          setFunction={(e) => setWorkPeriod(e.target.value)}
          value={workPeriod}
          placeholder="08/2024 - pågående"
          labelText="Arbetsperioden (MM/YYYY - MM/YYY)"
          errorMessages={clientErrors}
        />
      </div>

      <div className="my-4">
        <label>Tekniker/Metoder som användes:</label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {sortedSkills &&
            sortedSkills().map((skill, index) => (
              <div key={index}>
                <div>
                  <input
                    className="mr-2 "
                    type="checkbox"
                    checked={technologies.includes(skill.skill)}
                    onChange={(e) =>
                      addTechnology(e.target.checked, skill.skill)
                    }
                    id={`skill-${index}`}
                  />
                  <label htmlFor={`skill-${index}`}>{skill.skill}</label>
                </div>
              </div>
            ))}
        </div>
      </div>

      <div>
        <label>Sammanfattande arbetsuppdrag</label>

        <textarea
          name="description"
          className="form-input"
          cols={30}
          rows={10}
          value={assignementDescription}
          onChange={(e) => setAssignementDescription(e.target.value)}
          id="assignementDescription"
        />
        {clientErrors["assignmentDescription"] && (
          <div id="assignment-description-error" className="error-message">
            {clientErrors["assignmentDescription"]}
          </div>
        )}
      </div>
      <div className="flex justify-center">
        <button className="btn" type="button" onClick={addWorkExperience}>
          {" "}
          Lägg till Updrag
        </button>
      </div>
      {works && works?.length > 0 && (
        <div className="mx-auto my-5">
          <button
            className="btn-outlined"
            type="button"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? "Minimera" : "Se alla"}
          </button>
        </div>
      )}

      {works &&
        works.map((work, index) => (
          <div
            className="bg-MyBlue text-white  -mx-6 lg:-mx-9 -mb-3 px-6 lg:px-9 py-3"
            key={index}
          >
            {showAll && (
              <div>
                <WorkExperience work={work} />
              </div>
            )}
          </div>
        ))}
    </div>
  );
};
