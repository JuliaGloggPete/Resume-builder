import type { ConsultantInfo } from "../../types";
import { useEffect, useState } from "react";
import InputComponent from "./InputComponent";
//import { string } from "zod";

interface Props {
  cvLanguage: string;
  setCVLanguage: (language: string) => void;
  consultantInfo: ConsultantInfo;
  dispatchConsultantInfo: React.Dispatch<any>;
  errorMessages: { [key: string]: string };
  file: File | null;
  setFile: (file: File | null) => void;
  imageUrl: string;
  setImageUrl: (imageUrl: string) => void;
}

export const FormGeneralInfo = ({
  consultantInfo,
  dispatchConsultantInfo,
  errorMessages,
  cvLanguage,
  setCVLanguage,
  imageUrl,
  setImageUrl,
  setFile,
}: Props) => {
  const [firstName, setFirstName] = useState<string>(consultantInfo.firstName);
  const [lastName, setLastName] = useState<string>(consultantInfo.lastName);
  const [skillLevel, setSkillLevel] = useState<string>(
    consultantInfo.skillLevel
  );
  const [role, setRole] = useState<string>(consultantInfo.role);
  const [yearsOfExperience, setYearsOfExperience] = useState<number>(
    consultantInfo.yearsOfExperience
  );
  const [salesDescription, setSalesDescription] = useState<string>(
    consultantInfo.salesDescription
  );

  const kammarkollegiet ="  https://www.redpill-linpro.com/sv/kammarkollegiet-kompetensnivaer-konsulttjanster-programvarulosningar"

  useEffect(() => {
    const data: ConsultantInfo = {
      firstName,
      lastName,
      role,
      yearsOfExperience,
      skillLevel,
      salesDescription,
      imageUrl,
    };
    dispatchConsultantInfo({ type: "UPDATE", payload: data });
  }, [
    firstName,
    lastName,
    skillLevel,
    role,
    yearsOfExperience,
    salesDescription,
  ]);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (files && files.length > 0) {
      const selectedFile = files[0];
      setFile(selectedFile);
      setImageUrl("");
      setImageUrl(URL.createObjectURL(selectedFile));
    } else {
      setImageUrl("");
      setFile(null);
    }
  }

  return (
    <div>
      <div className="form-section relative">
        <div>
          <p className="form-head-of-section">Allmänt</p>
        </div>

        <div className="my-4">
          <label>Språket CV:t skrivas i: </label>
          <select
            onChange={(e) => {
              setCVLanguage(e.target.value);
            }}
            defaultValue={cvLanguage}
            className=" bg-slate-100 justify-center py-2 px-4 rounded-sm shadow-md text-sm my-2 font-medium text-slate-800 cursor-pointer"
          >
            <option value="se">Svenska</option>
            <option value="en">English</option>
          </select>
        </div>

        <div className="md:grid md:grid-cols-2 md:gap-4">
          <InputComponent
            value={firstName}
            name="firstName"
            labelText="Förnamn*"
            errorMessages={errorMessages}
            setFunction={(e) => setFirstName(e.target.value)}
          />
          <InputComponent
            value={lastName}
            name="lastName"
            labelText="Efternamn*"
            errorMessages={errorMessages}
            setFunction={(e) => setLastName(e.target.value)}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <InputComponent
            value={role}
            name="role"
            labelText="Jobtitel*"
            errorMessages={errorMessages}
            setFunction={(e) => setRole(e.target.value)}
          />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="flex items-center justify-between">
                <label>Kompetenslevel</label>
                <a
                  href={kammarkollegiet}  className="text-xs text-blue-500 underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  osäker?
                </a>
              </div>
              <select
                name="skillLevel"
                className="form-input"
                id="skillLevel"
                onChange={(e) => setSkillLevel(e.target.value)}
              >
                <option value="UNDEFINED">ej angiven</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
              {errorMessages["skillLevel"] && (
                <div id="skill-level-error" className="error-message">
                  {errorMessages["skillLevel"]}
                </div>
              )}
            </div>

            <InputComponent
              value={yearsOfExperience}
              name="yearsOfExperience"
              labelText="Års erfarenhet*"
              errorMessages={errorMessages}
              type="number"
              setFunction={(e) =>
                setYearsOfExperience(parseInt(e.target.value))
              }
            />
          </div>

          <div>
            <label>Bild</label>

            <input
              type="file"
              name="pic"
              onChange={handleFileChange}
              id="pic"
              accept="image/png, image/gif, image/jpeg, image/webp"
              className="w-full"
            />
          </div>
          <div className="flex justify-center ">
            <div className="w-48 h-48 flex overflow-hidden items-center justify-center border-solid border-2  border-gray-300 rounded-full">
              <img
                src={imageUrl}
                alt="Img"
                className="font-semibold object-cover "
              />
            </div>
          </div>
        </div>

        <label>Kort beskrivning om en själv</label>
        <textarea
          name="salesDescription"
          className="form-input"
          cols={30}
          rows={10}
          onChange={(e) => {
            setSalesDescription(e.target.value);
          }}
          id="salesDescription"
          value={salesDescription}
        />
        {errorMessages["salesDescription"] && (
          <div id="sales-description-error" className="error-message">
            {errorMessages["salesDescription"]}
          </div>
        )}
      </div>
    </div>
  );
};
