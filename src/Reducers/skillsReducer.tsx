
import * as Type from "../../types";
import * as InitialStates from "../initialStatesNSchemas/initialStates";

const skillsReducer = (
  state: Type.Skill[] = InitialStates.initialStateSkills,
  action: any
) => {
  switch (action.type) {
    case "add":
      // Check if the skill already exists
      const skillExists = state.some(
        (s) => s.skill.toUpperCase() === action.skill.skill.toUpperCase()
      );

      if (!skillExists && action.skill.skill != "") {
        return [...state, action.skill];
      }
      return state;

    case "delete":
      const filteredState = state.filter(
        (s) =>
          s.skill !== action.skill.skill ||
          s.categories !== action.skill.categories,
        console.log(state)
      );
      return filteredState.length > -1 ? filteredState : state;

      case "patch":
        return state.map((s) =>
          s.skill.toUpperCase() === action.skill.skill.toUpperCase()
            ? { 
              ...s,
              proficiency: action.proficiency || s.proficiency,
              skill: action.newSkillName || s.skill,
              }
            : s
        );

    default:
      return state;
  }
};

export default skillsReducer;