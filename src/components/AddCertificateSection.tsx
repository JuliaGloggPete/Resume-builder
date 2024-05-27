import { Certificate } from "../../types";
import { Trash } from "@phosphor-icons/react";
import React, { useState } from "react";
import { initialStateCertificate } from "../initialStatesNSchemas/initialStates";
import InputComponent from "./InputComponent";
import ButtonComponent from "./ButtonComponent";

interface Props {
  certificates: Certificate[];
  dispatchCertificates: React.Dispatch<any>;
}

const AddCertificateSection = ({
  certificates,
  dispatchCertificates,
}: Props) => {
  const [certificate, setCertificate] = useState<Certificate>(
    initialStateCertificate
  );

  const addCertificate = () => {
    dispatchCertificates({ type: "ADD", payload: certificate });
    setCertificate(initialStateCertificate);
  };

  return (
    <div>
      <div>
        <InputComponent
          value={certificate.year}
          name="certificateYear"
          labelText="År"
          type = "number"
          setFunction={(e) =>
            setCertificate({ ...certificate, year: parseInt(e.target.value) })
          }
        />

        <InputComponent
          value={certificate.certificateName}
          name="certificateName"
          labelText="Certificering"
          placeholder="t.ex. Certificate, Java Programmer"
          setFunction={(e) =>
            setCertificate({
              ...certificate,
              certificateName: e.target.value,
            })
          }
        />

        <InputComponent
          value={certificate.description}
          name="description"
          labelText="Beskrivning (optional)"
          placeholder="Fördjupande kurs React"
          setFunction={(e) =>
            setCertificate({
              ...certificate,
              description: e.target.value,
            })
          }
        />
      </div>
      <ButtonComponent setFunction={addCertificate} />
      <ul>
        {certificates.map((certificate, index) => (
          <li key={index} className="flex mt-3 items-center">
            <Trash
              size={32}
              className="delete mr-4"
              onClick={() =>
                dispatchCertificates({ type: "DELETE", payload: certificate })
              }
            />{" "}
            {certificate.certificateName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddCertificateSection;
