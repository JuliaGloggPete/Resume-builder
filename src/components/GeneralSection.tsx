import { useState } from "react";
import { PencilSimple, Check } from "@phosphor-icons/react";
import type { ConsultantInfo } from "../../types";
import InputComponent from "./InputComponent";
import placeholder from "../../src/assets/placeholder.jpeg";
import ButtonComponent from "./ButtonComponent";

interface Props {
  updateCV?: boolean;
  translateCV?: boolean;
  cvLanguage: string;
  setCVLanguage: (language: string) => void;
  setConsultantInfo: (newConsultantInfo: ConsultantInfo) => void;
  consultantInfo: ConsultantInfo;
  errorMessages: { [key: string]: string };
  file: File | null;
  setFile: (file: File | null) => void;
  imageUrl?: string | undefined;
  setImageUrl: (imageUrl: string) => void;
}
const GeneralSection = ({
  updateCV,
  consultantInfo,
  setConsultantInfo,
  errorMessages,
  cvLanguage,
  translateCV,
  setCVLanguage,
  imageUrl,
  setImageUrl,
  setFile,
}: Props) => {
  const [updateName, setUpdateName] = useState<boolean>(false);
  const [updateRole, setUpdateRole] = useState<boolean>(false);
  const [updateImage, setUpdateImage] = useState<boolean>(false);
  const [updateShortdescription, setUpdateShortdescription] =
    useState<boolean>(false);
  const [oldDescription, setOldDescription] = useState<string>(
    consultantInfo.salesDescription
  );

  const handleChangeSkillLevel = (type: string) => {
    if (type === "decrease") {
      setConsultantInfo({
        ...consultantInfo,
        skillLevel: Math.max(
          parseInt(consultantInfo.skillLevel) - 1,
          0
        ).toString(),
      });
    } else if (type === "increase") {
      setConsultantInfo({
        ...consultantInfo,
        skillLevel: Math.min(
          parseInt(consultantInfo.skillLevel) + 1,
          5
        ).toString(),
      });
    }
  };
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
  const handleChangeYears = (type: string) => {
    if (type === "decrease") {
      setConsultantInfo({
        ...consultantInfo,
        yearsOfExperience: Math.max(consultantInfo.yearsOfExperience - 1, 0),
      });
    } else if (type === "increase") {
      setConsultantInfo({
        ...consultantInfo,
        yearsOfExperience: consultantInfo.yearsOfExperience + 1,
      });
    }
  };

  return (
    <div>
      <div className="grid md:grid-cols-3 gap-8">
        {!updateImage && (
          <div className="relative">
            {consultantInfo.imageUrl && (
              <img src={consultantInfo.imageUrl} alt="PersonsImg" />
            )}
            {!consultantInfo.imageUrl && (
              <img src={placeholder} alt="Placeholder Pic" />
            )}
            {updateCV && (
              <div className="bg-MyBlue text-white rounded-full h-8 w-8 mr-2 flex justify-center absolute right-0 top-0 ">
                <PencilSimple
                  size={26}
                  className="pt-1"
                  onClick={() => {
                    setUpdateImage((prevState) => !prevState);
                  }}
                />
              </div>
            )}
          </div>
        )}
        {updateImage && (
          <div>
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
            <div className=" flex justify-center my-3">
              <div className="w-48 h-48 flex overflow-hidden items-center justify-center border-solid border-2  border-gray-300 rounded-full">
                <img
                  src={imageUrl}
                  alt="Img"
                  className="font-semibold object-cover "
                />
              </div>
            </div>
            <ButtonComponent
              position="center"
              label="Cancel"
              setFunction={() => {
                setUpdateImage((prevState) => !prevState);
              }}
            />
          </div>
        )}
        <div className="col-span-2">
          {updateCV && (
            <div className="my-4">
              <label>Språket CV:t är i: </label>
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
          )}
          {translateCV && (
            <div className="my-4 flex ">
              <label>CV:t översätts till: </label>
              <p className="text-MyBlue font-semibold ">
                {cvLanguage === "se"
                  ? "Svenska"
                  : cvLanguage === "en"
                  ? "Engelska"
                  : "Unknown"}
              </p>
            </div>
          )}

          <div className="flex font-semibold items-center text-xl my-4 ">
            {updateCV && (
              <div className="bg-MyBlue text-white rounded-full h-8 w-8 mr-2 flex justify-center ">
                <PencilSimple
                  size={26}
                  className="pt-1"
                  onClick={() => {
                    setUpdateName((prevState) => !prevState);
                  }}
                />
              </div>
            )}
            {!updateName && (
              <div className="flex">
                <p className="mr-2">{consultantInfo.firstName}</p>
                <p>{consultantInfo.lastName}</p>
              </div>
            )}
            {updateName && (
              <div className="md:grid md:grid-cols-2 md:gap-4">
                <div>
                  <InputComponent
                    value={consultantInfo.firstName}
                    name="firstName"
                    errorMessages={errorMessages}
                    setFunction={(e) =>
                      setConsultantInfo({
                        ...consultantInfo,
                        firstName: e.target.value,
                      })
                    }
                  />
                </div>
                <InputComponent
                  value={consultantInfo.lastName}
                  name="lastName"
                  errorMessages={errorMessages}
                  setFunction={(e) =>
                    setConsultantInfo({
                      ...consultantInfo,
                      lastName: e.target.value,
                    })
                  }
                />
              </div>
            )}
          </div>
          <div className="flex my-2 items-center">
            {updateCV ||
              (translateCV && !updateRole && (
                <div className="bg-MyBlue text-white rounded-full h-7 w-7 mr-2 flex justify-center ">
                  <PencilSimple
                    size={22}
                    className="pt-1"
                    onClick={() => {
                      setUpdateRole((prevState) => !prevState);
                    }}
                  />
                </div>
              ))}
            <p className="mr-2 font-semibold">Roll:</p>
            {!updateRole && <p>{consultantInfo.role}</p>}
            <div className="mr-3 flex-1">
              {updateRole && (
                <InputComponent
                  value={consultantInfo.role}
                  name="role"
                  keyDown={(e) => {
                    if (e.key === "Enter") {
                      setUpdateRole((prevState) => !prevState);
                    }
                  }}
                  setFunction={(e) =>
                    setConsultantInfo({
                      ...consultantInfo,
                      role: e.target.value,
                    })
                  }
                />
              )}{" "}
            </div>

            {updateCV ||
              (translateCV && updateRole && (
                <div className="bg-green-800 text-white rounded-full h-7 w-7 ml-2 flex justify-center ">
                  <Check
                    size={22}
                    className="pt-1"
                    onClick={() => {
                      setUpdateRole((prevState) => !prevState);
                    }}
                  />
                </div>
              ))}
          </div>
          <div className="flex my-2">
            <p className="mr-2 font-semibold">Års erfarenhet:</p>
            {updateCV && (
              <button onClick={() => handleChangeYears("decrease")}>-</button>
            )}
            <p>{consultantInfo.yearsOfExperience}</p>
            {updateCV && (
              <button onClick={() => handleChangeYears("increase")}>+</button>
            )}
          </div>
          <div className="flex my-2">
            <p className="mr-2 font-semibold">Kompetensnvå:</p>
            {updateCV && (
              <button onClick={() => handleChangeSkillLevel("decrease")}>
                -
              </button>
            )}
            <p>{consultantInfo.skillLevel}</p>

            {updateCV && (
              <button onClick={() => handleChangeSkillLevel("increase")}>
                +
              </button>
            )}
          </div>

          <div className="my-2">
            <div className="flex">
              {updateCV ||
                (translateCV && !updateShortdescription && (
                  <div className="bg-MyBlue text-white rounded-full h-7 w-7 mr-2 flex justify-center ">
                    <PencilSimple
                      size={22}
                      className="pt-1"
                      onClick={() => {
                        setUpdateShortdescription((prevState) => !prevState);
                      }}
                    />
                  </div>
                ))}
              {!updateShortdescription && (
                <p>{consultantInfo.salesDescription}</p>
              )}
            </div>
            <div>
              {updateShortdescription && (
                <div>
                  {translateCV && (
                    <div className="">
                      <p>
                        Din beskrivning i{" "}
                        {cvLanguage === "en"
                          ? "Svenska"
                          : cvLanguage === "se"
                          ? "Engelska"
                          : "Unknown"}
                        :{" "}
                      </p>

                      <p className="italic">{oldDescription}</p>
                    </div>
                  )}

                  <div className="flex items-center">
                    <textarea
                      name="salesDescription"
                      className="form-input "
                      cols={30}
                      value={consultantInfo.salesDescription}
                      onChange={(e) =>
                        setConsultantInfo({
                          ...consultantInfo,
                          salesDescription: e.target.value,
                        })
                      }
                      id="salesDescription"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          setUpdateShortdescription((prevState) => !prevState);
                        }
                      }}
                    />

                    {updateCV ||
                      (translateCV && updateShortdescription && (
                        <div className="bg-green-800 text-white rounded-full h-7 w-7 ml-2 flex justify-center ">
                          <Check
                            size={22}
                            className="pt-1"
                            onClick={() => {
                              setUpdateShortdescription(
                                (prevState) => !prevState
                              );
                            }}
                          />
                        </div>
                      ))}
                  </div>
                </div>
              )}{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneralSection;
