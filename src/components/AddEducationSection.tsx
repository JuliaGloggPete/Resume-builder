import { Education } from "../../types";
import { Trash } from "@phosphor-icons/react";
import React, { useState } from "react";
import { initialEducationState } from "../initialStatesNSchemas/initialStates";
import InputComponent from "./InputComponent";
import ButtonComponent from "./ButtonComponent";

interface Props {
  educations: Education[];
  dispatchEducations: React.Dispatch<any>;
}

const AddEducationSection = ({ educations, dispatchEducations }: Props) => {
  const [education, setEducation] = useState<Education>(initialEducationState);
  const addEducation = () => {
    dispatchEducations({ type: "ADD", payload: education });
    setEducation(initialEducationState);
  };

  return (
    <div>
      <InputComponent
        value={education.date}
        name="date"
        labelText="Tidsperiod"
        placeholder="t.ex. 2/2017 - 3/2018"
        setFunction={(e) =>
          setEducation({ ...education, date: e.target.value })
        }
      />
      <InputComponent
        value={education.description}
        name="description"
        labelText="Beskrivning"
        placeholder="Utbildnings beteckning"
        setFunction={(e) =>
          setEducation({ ...education, description: e.target.value })
        }
      />
      <InputComponent
        value={education.place}
        name="place"
        labelText="Platsen utbildnigen ägde rum"
        placeholder="t.ex. Lunds Universitet"
        setFunction={(e) =>
          setEducation({ ...education, place: e.target.value })
        }
      />

      <ButtonComponent setFunction={addEducation} />

      <ul>
        {educations.map((education, index) => (
          <li key={index} className="flex mt-3 items-center">
            <Trash
              size={32}
              className="delete mr-4"
              onClick={() =>
                dispatchEducations({
                  type: "DELETE",
                  payload: education.description,
                })
              }
            />
            {education.date} &nbsp;- &nbsp; {education.description},{" "}
            {education.place} &nbsp;
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddEducationSection;
