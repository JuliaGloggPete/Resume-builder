import { Skill } from "../../types";

interface FormProps {
  skills: Skill[];
}

const SkillMatrix = ({ skills }: FormProps) => {
  return (
    <div>
      <h2>Skill matrix</h2>
      <div className="max-w-2xl mx-auto">
        <div className="mt-8 grid  px-4 py-2 grid-cols-2 border-4 bg-MyBlue text-white text-center">
          <div>Skills</div>
          <div>Proficiency (1-5)</div>
        </div>
        {skills.map(
          (skill, index) =>
            skill.proficiency > 0 &&
            skill.proficiency !== 0 && (
              <div
                key={index}
                className="grid  px-4 py-2 grid-cols-2 border-4 bg-white text-black"
              >
                <div>{skill.skill}</div>
                <div className="text-center">
                  {"*".repeat(skill.proficiency)}
                </div>
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default SkillMatrix;
