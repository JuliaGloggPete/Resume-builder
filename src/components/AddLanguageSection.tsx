import { Language } from "../../types";
import { Trash } from "@phosphor-icons/react";
import React, { useState } from "react";
import { initialStateLanguage } from "../initialStatesNSchemas/initialStates";
import InputComponent from "./InputComponent";
import ButtonComponent from "./ButtonComponent";

interface Props {
  cvLanguage: string
  languages: Language[];
  dispatchLanguages: React.Dispatch<any>;
}
const AddLanguageSection = ({ languages, dispatchLanguages, cvLanguage }: Props) => {
  const [language, setLanguage] = useState<Language>(initialStateLanguage);
  const addLanguage = () => {
    dispatchLanguages({ type: "ADD", payload: language });
    setLanguage(initialStateLanguage);
  };
  interface LanguageLevels {
    [key: string]: {
      [key: string]: string;
    };
  }
  

  const languageLevels :LanguageLevels = {
    en: {
      "Mother tongue": "Mother tongue",
      "Fluent": "Fluent",
      "Very good knowledge": "Very good knowledge",
      "Good knowledge": "Good knowledge",
      "Basic knowledge": "Basic knowledge",
    },
    se: {
      "Mother tongue": "Modersmål",
      "Fluent": "Flytande",
      "Very good knowledge": "Mycket goda kunskaper",
      "Good knowledge": "Goda kunskaper",
      "Basic knowledge": "Grundläggande kunskaper",
    },
  };
  const getTranslatedLevel = (level: string, cvLanguage: string) => {
    return cvLanguage === "se" ? languageLevels.se[level] : languageLevels.en[level];
  };

  return (
    <div>
      <InputComponent
        value={language.language}
        name="language"
        labelText="Språk"
        placeholder="svenska"
        setFunction={(e) =>
          setLanguage({ ...language, language: e.target.value })
        }
      />

      <div>
        <label className="mr-2">Nivå</label>
        <select
          name="level"
          className="form-input"
          id="level"
          onChange={(e) => setLanguage({ ...language, level: e.target.value })}
        >
          <option value="default">Välj</option>
          <option value="Mother tongue">Modersmål</option>
          <option value="Fluent">Flytande</option>
          <option value="Very good knowledge">Mycket goda kunskaper</option>
          <option value="Good knowledge">Goda kunskaper</option>
          <option value="Basic knowledge">Grundläggande kunskaper</option>
        </select>
      </div>
      <ButtonComponent setFunction={addLanguage} />
      <ul>
        {languages.map((language, index) => (
          <li key={index} className="flex mt-3">
            <Trash
              size={32}
              className="delete mr-4"
              onClick={() =>
                dispatchLanguages({ type: "DELETE", payload: language })
              }
            />
            <div className="flex">
              {language.language}
              <p className="mx-2">nivå: </p>
              {getTranslatedLevel(language.level, cvLanguage)}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddLanguageSection;
