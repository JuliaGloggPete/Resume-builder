import { Course } from "../../types";
import { Trash } from "@phosphor-icons/react";
import React, { useState } from "react";
import { initialStateCourse } from "../initialStatesNSchemas/initialStates";
import InputComponent from "./InputComponent";
import ButtonComponent from "./ButtonComponent";
interface Props {
  courses: Course[];
  dispatchCourses: React.Dispatch<any>;
}

const AddCoursesSection = ({ courses, dispatchCourses }: Props) => {
  const [course, setCourse] = useState<Course>(initialStateCourse);

  const addCourse = () => {
    dispatchCourses({ type: "ADD", payload: course });
    setCourse(initialStateCourse);
  };

  return (
    <div>
            <InputComponent
          value={course.date}
          name="courseName"
          type="date"
          labelText="Perioden där kursen hölls"

          setFunction={(e) =>
            setCourse({ ...course, date: e.target.value })
          }
        />

        <InputComponent
          value={course.courseName}
          name="courseName"
          labelText="Kursens namn"
          placeholder="Titel"
          setFunction={(e) =>
            setCourse({ ...course, courseName: e.target.value })
          }
        />
        <InputComponent
          value={course.courseDescription}
          name="courseDescription"
          labelText="Kort beskrivning/extra info"
          placeholder="Kurs beskrivning"
          setFunction={(e) =>
            setCourse({ ...course, courseDescription: e.target.value })
          }
        />
      
  
      <ButtonComponent setFunction={addCourse} />
      <ul>
        {courses.map((course, index) => (
          <li key={index} className="flex mt-3 ">
            <Trash
              size={32}
              className="delete mr-4"
              onClick={() =>
                dispatchCourses({ type: "DELETE", payload: course })
              }
            />{" "}
            {course.courseName}: {course.courseDescription}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddCoursesSection;
