import { Client } from "../../types";
import { Check, PencilSimple } from "@phosphor-icons/react";
import { useState, useEffect } from "react";
import InputComponent from "./InputComponent";
import ButtonComponent from "./ButtonComponent";

interface FormProps {
  work: Client;
  workIndex?: number;
  translate?: boolean;
  update?: boolean;

  dispatchWorks?: React.Dispatch<any>;
}

const WorkExperience = ({
  work,
  translate,

  workIndex,
  update,
  dispatchWorks,
}: FormProps) => {
  const [showAll, setShowAll] = useState<boolean>(false);
  const [translateRoles, setTranslateRoles] = useState<boolean>(false);
  const [updateClient, setUpdateClient] = useState<boolean>(false);
  const [translateClient, setTranslateClient] = useState<boolean>(false);
  const [updateTime, setUpdateTime] = useState<boolean>(false);

  const [updateTechnologies, setUpdateTechnologies] = useState<boolean>(false);

  const [initialDescription, setInitialDescription] = useState<string>(
    work.assignmentDescription
  );
  const [updatedDescription, setUpdatedDescription] = useState<string>(
    work.assignmentDescription
  );
  const [workScope, setWorkScope] = useState<string>(work.scope);
  const [updatedClient, setUpdatedClient] = useState<string>(work.client);
  const [updatedRoles, setUpdatedRoles] = useState<string[]>(work.roles);
  const [updatedTime, setUpdatedTime] = useState<string>(work.timeSpan);
  const [updatedTechnologies, setUpdatedTechnologies] = useState<string[]>(
    work.technologies
  );

  useEffect(() => {
    console.log("here", updatedDescription);
  }, [updatedRoles, updatedDescription, updatedClient]);

  const handleSave = () => {
    if (dispatchWorks) {
      dispatchWorks({
        type: "PATCH_CLIENT",
        payload: {
          client: updatedClient,
          updates: {
            assignmentDescription: updatedDescription,
            scope: workScope,
            client: updatedClient,
            roles: updatedRoles,
            timeSpan: updatedTime,
            technologies: updatedTechnologies,
          },
        },
      });
    }
    setUpdateClient(false);
  };

  return (
    <div className="border-2 bg-white text-black my-4 border-[#B27E8E] relative">
      {update && (
        <div className="bg-MyBlue text-white rounded-full h-8 w-8  flex justify-center absolute top-2 right-2 ">
          <PencilSimple
            size={26}
            className="pt-1"
            onClick={() => {
              setUpdateClient((prevState) => !prevState);
            }}
          />
        </div>
      )}
      <div className="p-4">
        <div className="flex items-center">
          {translate && (
            <div
              className="bg-MyBlue text-white rounded-full h-7 w-7  flex justify-center mr-2"
              onClick={() => {
                setTranslateClient((prevState) => !prevState);
              }}
            >
              <PencilSimple size={22} className="pt-1" />
            </div>
          )}
          {!translateClient && !updateClient && (
            <p className="text-2xl font-semibold">{updatedClient}</p>
          )}
          {(translateClient || updateClient) && (
            <div className="flex items-center">
              <label htmlFor="translateClient" className="text-2xl">
                {" "}
                Kund:
              </label>
              <InputComponent
                value={updateClient ? updatedClient : ""}
                name="translateClient"
                setFunction={(e) => {
                  setUpdatedClient(e.target.value);
                }}
              />
            </div>
          )}
        </div>

        <div className="flex items-center">
          <label>Roll(er):</label>
          {!translateRoles &&
            !updateClient &&
            updatedRoles.map((translatedRole, index) => (
              <p key={index}>{translatedRole}</p>
            ))}
          {(translateRoles || updateClient) &&
            updatedRoles.map((translatedRole, index) => (
              <div key={index} className="flex-1 mr-2">
                <InputComponent
                  value={translatedRole}
                  name="translateClient"
                  setFunction={(e) => {
                    setUpdatedRoles(e.target.value);
                  }}
                />
              </div>
            ))}

          {translate && !translateRoles && (
            <div
              className="text-MyBlue bg-white rounded-full border border-MyBlue h-6 w-6  flex justify-center ml-2"
              onClick={() => {
                setTranslateRoles((prevState) => !prevState);
              }}
            >
              <PencilSimple size={18} className="pt-1" />
            </div>
          )}
          {translate && translateRoles && (
            <div
              className="text-green-800 bg-white rounded-full border border-green-800 h-6 w-6  flex justify-center ml-2"
              onClick={() => {
                setTranslateRoles((prevState) => !prevState);
              }}
            >
              <Check size={18} className="pt-1" />
            </div>
          )}
        </div>
        <div className="flex items-center">
          <label>Tidsperiod:</label>
          {!updateClient && <p>{work.timeSpan}</p>}{" "}
          {updateClient && (
            <InputComponent
              value={updatedTime}
              name="translateTime"
              setFunction={(e) => {
                setUpdatedTime(e.target.value);
              }}
            />
          )}{" "}
          {update && (
            <div>
              {!updateTime && (
                <div
                  className="text-MyBlue bg-white rounded-full border border-MyBlue h-6 w-6  flex justify-center ml-2"
                  onClick={() => {
                    setUpdateTime((prevState) => !prevState);
                  }}
                >
                  <PencilSimple size={18} className="pt-1" />
                </div>
              )}
              {updateTime && (
                <div>
                  {" "}
                  <Check
                    size={28}
                    onClick={() => {
                      setUpdateTime((prevState) => !prevState);
                    }}
                  />
                </div>
              )}
            </div>
          )}
        </div>
        <div className="flex items-center">
          <label>Omfattning:</label>
          {!updateClient && <p>{workScope}</p>}
          <div>
            {updateClient && (
              <select
                name="employmentType"
                onChange={(e) => setWorkScope(e.target.value)}
                className="form-input"
                defaultValue={workScope}
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
            )}
          </div>
        </div>
        <div className="flex">
          <label>Tekniker & Metoder:</label>
          {(updateTechnologies || updateClient) &&
            updatedTechnologies.map((technology, index) => (
              <div key={index} className="flex-1 mr-2">
                <InputComponent
                  value={technology}
                  name="translateClient"
                  setFunction={(e) => {
                    setUpdatedTechnologies(e.target.value);
                  }}
                />
              </div>
            ))}
          <div>
            {!translate && !updateClient && (
              <div>
                {work.technologies.map((technology, index) => (
                  <p key={index}>{technology}</p>
                ))}
              </div>
            )}
          </div>
        </div>
        {!translate && !updateClient && (
          <div className="flex">
            <p className="font-bold mr-4">Uppdragsbeskrivning:</p>
            <p>{updatedDescription}</p>
          </div>
        )}

        {updateClient && (
          <textarea
            name="salesDescription"
            className="form-input"
            value={updatedDescription}
            cols={30}
            rows={10}
            onChange={(e) => {
              setUpdatedDescription(e.target.value);
            }}
          />
        )}

        {translate && (
          <div>
            <p className="font-semibold">Din besrkrivning på svenska: </p>{" "}
            {showAll && (
              <div className="my-2 bg-red-200 p-4 ">
                <p>{initialDescription}</p>{" "}
              </div>
            )}
            <div className="flex justify-center">
              <button
                className="btn-outlined"
                type="button"
                onClick={() => setShowAll(!showAll)}
              >
                {showAll ? "Stäng" : "Visa"}
              </button>
            </div>
            <div>
              <textarea
                name="salesDescription"
                className="form-input"
                cols={30}
                rows={10}
                onChange={(e) => setUpdatedDescription(e.target.value)}
              />
            </div>
          </div>
        )}
      </div>

      {(updateClient || translate) && (
        <div className="mb-2">
          <ButtonComponent
            position="center"
            label="Spara"
            setFunction={handleSave}
          />
        </div>
      )}
    </div>
  );
};

export default WorkExperience;
