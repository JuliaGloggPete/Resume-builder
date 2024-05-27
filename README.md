# React + TypeScript + Vite + TailwindCss

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json", "./tsconfig.node.json"],
    tsconfigRootDir: __dirname,
  },
};
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

### First documentation 20/5 2024
### updates 21/5 2024, 24/5 2004
## Last update 24/5 2024


# Main Components

- **Home**
- **GetCV**
- **FormCV**

# Home Component


## Overview

The `Home` component is a React component used for fetching and displaying a list of resumes from the database. It provides the following functionalities:

- **Search Resumes by Skills:** Users can search for resumes by skills. This feature sorts through the list of all resumes and displays those that have one or more skills in common with the searched ones. Users can select multiple skills. Note: The download button for multiple resumes is not functional as the endpoint is not deployed yet.
- **View and Download Resumes:** Clicking on a specific resume links to the `GetCV` component with the route `/cv/:cvname/download` and type `download`. This displays the selected resume and provides a download button, which is not functional as the endpoint is not deployed yet.
- **Update Resumes:** Users can search resumes by name. This feature sorts through all resumes and displays the matched ones. Clicking on a name links to `GetCV` with the route `/cv/:cvname/update` and type `update`, allowing the user to update the resume.
- **Translate Resumes:** Users can search resumes by name. This feature sorts through all resumes and displays the matched ones. Clicking on a name links to `GetCV` with the route `/cv/:cvname/translate` and type `translate`, allowing the user to translate the resume.

## State Management

- `updateInputValue`: Holds the current input value used to filer through all resumes to update a specific resume.
- `translateInputValue`: Holds the current input value used to filer through all resumes for translating a resume.
- `matchedNamesTranslate`: Contains the matched resumes for translation.
- `matchedNamesUpdate`: Contains the matched resumes for updating.
- `selectedCandidate`: Holds the currently selected candidates.
- `all`: Contains all resumes including their IDs (important when PUT method works properly).
- `allWithOutIDExceptResume`: Contains all resumes without IDs except the resumeID and does so to be able to delete the old one as PUT is not working as anticipated. Currently used for both update and translate
- `neededSkills`: Holds the list of needed skills for filtering resumes.
- `neededSkill`: Holds the current needed skill.
- `matchedCVs`: Contains the CVs that match the search criteria when searching biy skills.
- `loading`: Indicates whether data is being loaded.
- `error`: Holds any error messages.

## Functions

- `getData`: A function that fetches data from an API and sets the `all` and `allWithOutIDExceptResume` state variables. It retries 3 times if not successfull at first.
- `handleSkillChange`, `addNeededSkill`: Functions for handling changes to the needed skill and adding a needed skill.
- `findMatchingNames`: A function that finds matching names in the resumes.
- `handleChoosenCandidate`: A function that handles the selection of a candidate.
- `isSelected`: A function that checks if a resume is selected.
- `filterCVsBySkills`: A function that filters CVs by skills.

## Rendered JSX

The component renders a form for entering skills, a button for adding a skill, and a list of matched CVs. Each CV in the list is accompanied by a check icon, which when clicked, adds or removes the CV from the selected candidates.
The component renders twice a form for entering Names, a button for adding a name, and a list of matched CVs for this name in order to either update or translate a CV.

## Subcomponents

- `InputComponent`: A reusable input component used for inputfields

- `ButtonComponent`: A reusable button component used for buttons

# FormCV

## Overview

The FormCV component is a complex form designed for creating and submitting a resume. It utilizes various hooks and components to manage state and handle form submission. The form captures general information, skills, work experience, certifications, education, courses, and languages which shall be posted to the backend. The **response** from the POST will be transfomed to a Resume without IDs (except the general ID of the resume, resumeID) in order to be changed or translated from the check page.

## Subcomponents

_Detailed information about those components will be found further down_

- `FormGeneralInfo`: Manages the general information section of the form.
- `FormSkills`: Manages the skills section of the form.
- `FormSkillMatrix`: Manages the skill matrix section of the form.
- `FormWorkExperience`: Manages the work experience section of the form.
- `FormOverAllResume`: Manages the overall resume section.
- `ButtonComponent`: A reusable button component used for form actions.

## State Management

- `cVLanguage`: Holds the choosen languge for the CV gets passed down to `FormGeneralInfo` and finaly sets the language string for the `type Resume`
- `file`: Holds the blob that is needed to post a resume and gets transformed to the imageUrl in the backend
- `imageUrl`: holds a placeholder `string` made from the file and gets replaced in the backend gets passed down to `FormGeneralInfo` and is used in the `consultantReducer`
- `allData`-State of `type Resume` for the entire form data and holds everything for the post \*_except_ for file
- `consultantErrors` - Holds a zod error `object` gets passed as a prop to `FormGeneralInfo`

## Reducers

**Sourcecode for Reducers is to be found at src/components/Reducers**
**InitialStates at src/componenents/InitialStatesNSchemas**

- `skills`: Manages skill data of **type skill**, gets passed as a prop to **FormSkills**, **FormSkillMatrix**, as well as **FormWorkExperience**
- `works` Manages work experience data of **type Client** with the key assignmentDescription, gets passed as a propp to **FormWorkExperience** and further from there to _WorkExperience_.

- `certificates`: Manages certificate data of an array of **type Certificate** with the key certificateName, gets passed to **FormOverAllResume** and further from there to _AddCertificate_

- `educations`: Manages certificate data of an array of **type Education** with the key description, gets passed to **FormOverAllResume** and further from there to _AddEducation_

- `courses`: Manages certificate data of an array of **type Courses** with the key courseDescription, gets passed to **FormOverAllResume** and further from there to _AddCourse_

- `language`: Manages certificate data of an array of **type Language** with the key language, gets passed to **FormOverAllResume** and further from there to _AddLanguage_

- `consultantInfo`: Manages consultantInfomatin data of **type ConsultantInfo** gets passed as a prop to **FormGeneralInfo**


# FormGeneralInfo

## Overview

Manages the general information section of the form.

## Props

passed down from **FormCV** further information can be found there

- `cvLanguage`: string;
- `setCVLanguage`: (language: string) => void;
- `consultantInfo`: ConsultantInfo;
- `dispatchConsultantInfo`: React.Dispatch<any>;
- `errorMessages`: { [key: string]: string };
- `file`: File |null;
- `setFile`:(file: File | null) => void;
- `imageUrl`: string;
- `setImageUrl`: (imageUrl: string) => void;

## State Management

- `firstName`:Holds the current value of the firstName and will be dispatched to the ConsultantReducer
- `lastName`:Holds the current value of the lastName and will be dispatched to the ConsultantReducer
- `skillLevel`:Holds the current value of the skillLevel and will be dispatched to the ConsultantReducer
- `role`:Holds the current value of the role and will be dispatched to the ConsultantReducer
- `yearsOfExperience`:Holds the current value of the yearsOfExperience and will be dispatched to the ConsultantReducer
- `salesDescription`:Holds the current value of the sales description and will be dispatched to the ConsultantReducer

## used Reducer

- `ConsultantReducer`takes in the states above

## Functions

- `handleFileChang`handles the given image File and sets file as well as transforms and sets an URL to the ImageURL

# FormSkills

## OverView

Manages the skills section of the form is embedded in the FormCV. The user is able to choose from a prefilled skillset according to profession as well as able to add if missing. The user is also able to delete added skills through unchecking the box or pressing on the skill on the displayed skill array

## Imports

- `React,useEffect, useState` from "react";
- `Skill` from "../../types", which declares the type Skill
- `ButtonComponent` from "./ButtonComponent"; used as a subcomponent
- `skillsDeveloper` from "../assets/skillsDeveloper.json"; skillset for Developer
- `skillsManagement` from "../assets/skillsManagement.json";skillset for Management
- `skillsUX` from "../assets/skillsUX.json"; skillset for skillsUX

## Props

Passed down from `FromCV`

- `skills`: an array of **type Skill** passed down form the **FormCV**
- `dispatchSkills`: adds, updates and deletes Skills

## States

- `extraSkills`: Holds a key value pair of type string to be added to the skilset
- `job`: Holds the value of the chosen job-type
- `categories`: Holds the categories for the choosen job type

## Functions

- `handleCheckboxChange`- handles the change of the checkbox and interacts with _dispatchSkills_ wheter to add or delete a certain Skill from the given list
- `addExtraSkills` - takes in a category and uses the value of extraSkill to add to the skills array through dispatch skills

## Subcomponents

- `ButtonComponent`: A reusable button component used for form actions.
- `InputComponent`: A reusable input component here used for adding new skills.

# FormSkillMatrix

## Overview

Manages the skill matrix section of the form and is embedded in FormCV. Enables the user to add proficiency to his skills.

## Props

Passed down from `FormCV`

- `skills`: an array of **type Skill** passed down form the **FormCV**
- `dispatchSkills`: adds, patches and deletes Skills

will be passed further to `SkillMatrix`

## States

- `usedSkills`: Holds the skills with proficiencies higher than 0

## Funcitons

- `sortedSkills`: takes in skills sorts and returns it A-Z
- `addUsedSkill`: takes in a new Skill and adds it to usesSkills
- `addProficiency`: takes in a Skill and adds the proficiency using the patch method of dispatchSkills

## SubComponent

- `SkillMatrix`: manages the display of the skills in a Matrix

# SkillMatrix

Manages the display of the given Skills in a Matrix is embedded in `FormSkillMatrix` as well as in `GetCV`.

## Props

Passed down from either `GetCV`or `FormSkillMatrix`

- `skills`: Which contains an arrray of **type Skill**

## Rendered JSX

The component renders a Matrix that displays all the skills with a proficiency higher than 0

# FormWorkExperience

Manages the work experience section of the form, is embedded in `FormSkillMatrix` as well as in `GetCV`. Allows to add assignments, type Client. 

## Props

- `skills`: Which contains an array of **type Skill**
- `works`: Which contains an array of **type Client**
- `update`: Contains a boolean
- `dispatchSkills`: adds, patches and deletes works aka assignments

## States

- `technologies`: holds an array of strings
- `showAll`: Holds a boolean that toggles wether you see a **Workexpierience** component for each wokrs or not
- `clientErrors`: Holds a key value pair from the zod Schema for input validation
- `client`: Holds a string with the current client name value
- `role`: Holds the current role value
- `roles`: Holds an array of strings, with the added role values
- `workPeriod`: holds a string with the current value of the given wokPeriod
- ` workScope`: holds a string with the current value of the scope, is 100% by default

## Functions

- `addWorkExpierience` checks if  the roles array is not empty and if empty if there is a value in role that has not been added yet. Returns an alert if both are empty and calls the `addWork` function if this test passes.

- `addWork` creates a newWorkExperience of **type Client** , pares it through the ClientSchema and if successull it calls on `dispatchWorks` to add to the clientlist


## SubComponents


- `ButtonComponent`: A reusable button component used for form actions.
- `InputComponent`: A reusable input component here used to add the different strings required for type Client.
- `WorkExpierience`: A component used to display a Client from the Client list aka works - takes in a work prop and displays


## Rendered JSX

The component renders a form for entering Assignments with the type Client, a button for adding an assignment and a togglebutton to show and hide the WorkExpierienc components for each item in the list.


# WorkExperience

Displays  experience section of the form. is embedded in `FormWorkexpierience` as well as in `GetCV`. Allows to update an existing assignment (used for translation as well)

## Props

- `workIndex`: OPTIONAL number
- `work`: of **type Client**
- `update`: OPTIONAL contains a boolean
- `translate`: OPTIONAL contains a boolean
- `assignments`: Which contains an array of **type Client**
- `setAssignments`: (newValue: Client[]) => void; setting funktion for assignments

## States

- `showAll`: Holds a boolean that toggles whether the user chooses to see the previous assignment description or not when provided with a **translate** prop ; default is false.
- `translateRoles`: Holds a boolean that toggles whether the user choses to **translate or update** the roles of an assignement; default is false. 
- `updateClient`: Holds a boolean that toggles whether the user choses to **translate or update** the name of a Client in  an assignement; default is false. 
- `translateClient`: Holds a boolean that toggles whether the user choses to **translate or update** the name of a Client in  an assignement; default is false. 
- `updateTime`: Holds a boolean that toggles  whether the user choses to **update** the workperiod in  an assignement; default is false. 
- `updateTechnologies`: Holds a boolean that toggles  whether the user choses to **update or translate** the technologies used in  an assignement; default is false. 
- `updtaeRoles`: Holds an array of strings, default set to work prop work.roles
- `initialDescription`: Holds a string, default set to work prop work.description
- `workScope`: Holds a string initial set to the work.scope
- `updatedClient` : Holds a string initial set to work.client
- `updatedRoles`: Holds an array of strings initial set to work.roles;
- `updatedTime` Holds a string initial set to the work.timeSpan;
- `updatedTechnologies` Holds an array of strings initial set to work.technologies
 

## Functions

- `handleTranslationChange` sets the **updated or translated** values and uses the setAssignment funktion from props

## SubComponents


- `ButtonComponent`: A reusable button component used for form actions.
- `InputComponent`: A reusable input component here used to update or translate the different strings required for type Client.



## Rendered JSX

The component renders an Assignments with the type Client, it contains buttons for updating and translating which ar only displayed if given the neccessary props. 

# FormOverAllResume: 

## Overview
Manages the overall resume section. Allows to add certificates, courses, languages and educations


## Props

- `certificates`: an array of **type Certificate** passed down form the **FormCV** ;
- `dispatchCertificates`: adds and deletes Certificates
- `educations`: Education[] **type Education** passed down form the **FormCV** ;
- `dispatchEducations`: adds and deletes Educations
- `courses`: Course[]**type Courses**  passed down form the **FormCV** ;
- `dispatchCourses`: adds and deletes Courses
- `languages`: Language[]  **type Languages** passed down form the **FormCV** ;
- `dispatchLanguages`: adds and deletes Languages
- `cvLanguage` : string passed down form the **FormCV** ;

## Subcomponents

- `AddCertificateSection` which allows to add and delete Certificates and takes in **props** certificate and dispatchCertificate
- `AddCoursesSection` which allows to add and delete Courses and takes in **props** courses and dispatchCourses
- `AddLanguageSection` which allows to add and delete languages and takes in **props** language, cvLanguage and dispatchLanguage
- `AddEducationSection` which allows to add and delete education and takes in **props** education and dispatchEducation

## Rendered JSX

The component renders the subcomponent in a container

# AddCertificateSection Component

## Overview

The `AddCertificateSection` is a React component used for managing and displaying a list of certificates. It allows users to add new certificates and delete existing ones.

## Props

- `certificates`: An array of `Certificate` objects representing the current list of certificates.
- `dispatchCertificates`: A dispatch function for updating the list of certificates.

## State

- `certificate`: A state variable holding the current certificate being added. It is initialized with `initialStateCertificate`.

## Functions

- `addCertificate`: A function that dispatches an "ADD" action to add the current `certificate` to the list of `certificates`, and then resets `certificate` to `initialStateCertificate`.

## Subcomponents

- `InputComponent`: A reusable input component used for entering the year, name, and description of a certificate.
- `ButtonComponent`: A reusable button component used for submitting the form.

## Rendered JSX

The component renders a form for entering certificate details, a button for adding the certificate, and a list of current certificates. Each certificate in the list is accompanied by a trash icon, which when clicked, dispatches a "DELETE" action to remove the certificate from the list.

# AddCoursesSection Component

## Overview

The `AddCoursesSection` is a React component used for managing and displaying a list of courses. It allows users to add new courses and delete existing ones.

## Props

- `courses`: An array of `Course` objects representing the current list of courses.
- `dispatchCourses`: A dispatch function for updating the list of courses.

## State

- `course`: A state variable holding the current course being added. It is initialized with `initialStateCourse`.

## Functions

- `addCourse`: A function that dispatches an "ADD" action to add the current `course` to the list of `courses`, and then resets `course` to `initialStateCourse`.

## Subcomponents

- `InputComponent`: A reusable input component used for entering the year, name, and description of a course.
- `ButtonComponent`: A reusable button component used for submitting the form.

## Rendered JSX

The component renders a form for entering course details, a button for adding the course, and a list of current courses. Each course in the list is accompanied by a trash icon, which when clicked, dispatches a "DELETE" action to remove the course from the list.


- `ButtonComponent`: A reusable button component used for form actions.

# AddEducationSection Component

## Overview

The `AddEducationSection` is a React component used for managing and displaying a list of education. It allows users to add new educations and delete existing ones.

## Props

- `Educations`: An array of `Education` objects representing the current list of educations.
- `dispatchEducations`: A dispatch function for updating the list of educations.

## State

- `education`: A state variable holding the current education being added. It is initialized with `initialStateEducation`.

## Functions

- `addEducation`: A function that dispatches an "ADD" action to add the current `education` to the list of `educations`, and then resets `education` to `initialStateEducation`.

## Subcomponents

- `InputComponent`: A reusable input component used for entering the year, name, and description of a educaiton.
- `ButtonComponent`: A reusable button component used for submitting the form.

## Rendered JSX

The component renders a form for entering education details, a button for adding the education, and a list of current educations. Each certificate in the list is accompanied by a trash icon, which when clicked, dispatches a "DELETE" action to remove the education from the list.


# AddLanguageSection Component

## Overview

The `AddLanguageSection` is a React component used for managing and displaying a list of Language. It allows users to add new languages and delete existing ones.

## Props

- `languages`: An array of `Language` objects representing the current list of languages.
- `dispatchLanguages`: A dispatch function for updating the list of language.
- `cvLanguage`: a string that contains the set Language for the whole cv

## State

- `Language`: A state variable holding the currLanguagee being added. It is initialized with `initialStateLanguage`.

## Functions

- `getTranslatdLevel` : a function that takes in a level and the cvLanguage and translates the level of the choosen language

- `addLanguage`: A function that dispatches an "ADD" action to add the current `Language` to the list of `eLanguage`, and then resets `Language` to `initialStateLanguage`.

## Subcomponents

- `InputComponent`: A reusable input component used for entering the year, name, and description of a ceLanguage.
- `ButtonComponent`: A reusable button component used for submitting the form.

## Rendered JSX

The component renders a form for entering language details, a button for adding the language, and a list of current languages. Each language in the list is accompanied by a trash icon, which when clicked, dispatches a "DELETE" action to remove the language from the list.

## ButtonComponent: 

A reusable button component used for all kinds of actions throughout the app.

## Props

- `label`: OPTIONAL sets the label of the Button, "Lägg till" by default
- `setFunction`: OPTIONAL sets the funktion of the button 
- `position`: OPTIONAL sets the position in the style of a button 


# Get CV

## Overview

The Get CV component is a complex form designed for checking, updating, translating and submitting a updated or translated resume as well as downloading. It utilizes various hooks and components to manage state and handle form submission. 

## Subcomponents

- `GeneralSection`: Manages the general information section of the form.
- `SkillSection`: Manages the skills section of the form.
- `SkillMatrix`: Manages the skill matrix section of the form.
- `WorkExperience`: Manages the work experience section of the form.
- `FormWorkExperience`: Manages the work experience section of the form.
- `SummarySectionCV`: Manages the overall resume section.


## Use Location

- takes the cv parsed from Home

## State Management

-  `updateCV` : Holds a boolean which sets whether the update possibilities are shown or not
-  `translateCV`: Holds a boolean which sets whether the translate possibilities are shown or not
-  `cVLanguage`: Holds a string set by default to cv.language;
-  `addSkills` : Holds a boolean which sets whether the user wants to add a skill and toggles the input visibility
-  `addAssignments`: Holds a boolean which sets whether the user wants to add an assignement and toggles the input visibility
-  `checkCv`: Holds a boolean which sets whether the check possibilities are shown or not
-  `data`: Holds a cv **type Resume** set by default to cv  taken from useLocation;
-  `file`: **type File** or null>(null);

## Functions 

- a useEffect is used with an if-Statement that sets through the parsed type the bools that determine whter a cv shall be checked, translated or updated. 
- `getImage` sets the parsed image to a blob 
- `putData` either posts if type is translate a new (translated version) of an old cv or if type is update posts a new updated version and deletes the old one
- `downloadREsume` not in use as the endpoint is yet to be deployed

## Reducers

**Sourcecode for Reducers is to be found at src/components/Reducers**
**InitialStates at src/componenents/InitialStatesNSchemas**

- `skills`: Manages skill data of **type skill**, gets passed as a prop to **FormSkills**, **FormSkillMatrix**, as well as **FormWorkExperience**
- `works` Manages work experience data of **type Client** with the key assignmentDescription, gets passed as a propp to **FormWorkExperience** and further from there to _WorkExperience_.

- `certificates`: Manages certificate data of an array of **type Certificate** with the key certificateName, gets passed to **FormOverAllResume** and further from there to _AddCertificate_

- `educations`: Manages certificate data of an array of **type Education** with the key description, gets passed to **FormOverAllResume** and further from there to _AddEducation_

- `courses`: Manages certificate data of an array of **type Courses** with the key courseDescription, gets passed to **FormOverAllResume** and further from there to _AddCourse_

- `language`: Manages certificate data of an array of **type Language** with the key language, gets passed to **FormOverAllResume** and further from there to _AddLanguage_

- `consultantInfo`: Manages consultantInfomatin data of **type ConsultantInfo** gets passed as a prop to **FormGeneralInfo**




# GeneralSection


Manages the general information section of **GetCV**.

## Props

passed down from **GetCV** further information can be found there

- `updateCV?`: Optional boolean used for toggeling what is displayed
- `translateCV?`:Optional boolean used for toggeling what is displayed
- `cvLanguage`: string;
- `setCVLanguage`: (language: string) => void;
- `consultantInfo`: ConsultantInfo;
- `dispatchConsultantInfo`: React.Dispatch<any>;
- `errorMessages`: { [key: string]: string };

## State Management

other than the states passed at props

- `updateName`: holds a boolean that for toggeling if the user wants to update the Name

- `updateRole`: holds a boolean that for toggeling if the user wants to update the Roles

- `updateShortDescription`: holds a boolean that for toggeling if the user wants to update the Shrotdescription 
- `oldDescription`:Holds the current value of the sales description

## used Reducer

- `ConsultantReducer`takes in the states above

## Functions

- `handleChangeYears`handles the increase and decrease of years
- `handleChangeSkillLevel`handles the increase and decrease of skilllevel is in a seperate function as skillevel is required as string 

## Subcomponent

- `InputComponent`: A reusable input component used for inputfields

# InputComonent

# SkillSection

# SummarySectionGetCV


## Overview
Manages the overall resume section. Allows to add certificates, courses, languages and educations


## Props

- `cv`: of **type Resume** passed down form the **GetCV**
- `updateCV`:boolean used for toggeling what is displayed
- `translateCV`:boolean used for toggeling what is displayed
- `certificates`: an array of **type Certificate** passed down form the **FormCV** ;
- `dispatchCertificates`: adds and deletes Certificates
- `educations`: Education[] **type Education** passed down form the **FormCV** ;
- `dispatchEducations`: adds and deletes Educations
- `courses`: Course[]**type Courses**  passed down form the **FormCV** ;
- `dispatchCourses`: adds and deletes Courses
- `languages`: Language[]  **type Languages** passed down form the **FormCV** ;
- `dispatchLanguages`: adds and deletes Languages
- `cvLanguage` : string passed down form the 

## States

- `updateCourses`holds a boolean that for toggeling if the user wants to update courses
- `updateCertificates`holds a boolean that for toggeling if the user wants to update certificates
- `updateEducation`holds a boolean that for toggeling if the user wants to update educations
- `updateLanguages`holds a boolean that for toggeling if the user wants to update language
- `updateEducation`holds a boolean that for toggeling if the user wants to update educations
- `skillsByCategory`holds a Record of string, and array of string

## Functions

The UseEffect fires a ForEach that fills the skillsByCategory whyle looping through the skill


## Subcomponents

- `AddCertificateSection` which allows to add and delete Certificates and takes in **props** certificate and dispatchCertificate
- `AddCoursesSection` which allows to add and delete Courses and takes in **props** courses and dispatchCourses
- `AddLanguageSection` which allows to add and delete languages and takes in **props** language, cvLanguage and dispatchLanguage
- `AddEducationSection` which allows to add and delete education and takes in **props** education and dispatchEducation

# InputComponent

A reusable input component used for all kinds inputs throughout the app.


## Props

- `labelText`: OPTIONAL sets the label of the Input component, "Lägg till" by default
- `setFunction`: OPTIONAL sets the onChange prop of the input
- `onKeyDown`: OPTIONAL sets the onKeyDown on the onKeyDown prop of the input
- `type`: Sets the type of the Inputfield, set to text by default
- `errorMessages`: OPTIONAL sets a div if available, with the given errorMessage
- `placeholder`: OPTIONAL sets the placeholder prop in the input


# SkillSection

## OverView

Manages the skills section of the GetCV component. The user is able to upate and add to the given Skills if type "update" is true and is able to translate a Skill if type "translate" is true



## Props

Passed down from `GetCV`

- `skills`: an array of **type Skill** passed down form the **GetCV**
- `dispatchSkills`: adds, updates and deletes Skills
- `addSkills`: a boolean 
- `updateCV`: OPTIONAL boolean
- `translateCV` : OPTIONAL boolean

## States

- `newSkills`: Holds the current value of newSkills is of type Skill and is set to  initialStateSkill by default
- `updateSkills`: Holds a boolean set to false by default that toggles the users view

## Functions


- `addNResetSkills` -  adds a new Skill to the skills array using dispatchSkills
- `addProficiency` uses the patch method of dispatchSkills to update a  certain Skill

- `handleSkilChange`uses the patch method of dispatchSkills to update a  certain Skill


## Subcomponents

- `ButtonComponent`: A reusable button component used for form actions.
- `InputComponent`: A reusable input component here used for adding new skills.



# Unfinished Code, Bugs, and Future Intentions

## Unfinished

- **REDUCERS** the Itemreducer is used for certificates, courses, educations and languages but has _no Patch_ method 

- **FORM VALIDATION ERROR MESSAGES** using zod and a Schema only Client and Customer have errormessages printet att the moment as soon as checked what is required the error messages should be updated

## Known Issues

- The **Image** is not being send to the backend when update or translate. I started a workaround that worked before the backend change. The Issue is known to the backend. 

- The **PUT** method is not functioning correctly. It only allows changing existing content but not adding new items (e.g., a new work experience). A workaround using POST and DELETE is in place. This shall be addressed in the future to avoid residual data issues. _UPDATE 24/5_  **A new version is deployed but not testet yet**
- The **DOWNLOAD** method is not deployed but works on the local server. It shall be integrated into the code once deployed.

- **ROUTES** as of this date the API Call that fetches the data is done once in HOME or FORMCV components but should only contain the params and do a fetch for the one in the route. fetching the specific data by param in the GET component

- **OPTIONALS** as of this date only the imageURl is an optional, but with the last deploy of the backend a lot more types can and should be declared optional and the input of POST needs to be adapted accordingly.

- **Props** in more than one instance props are passed more then one layer down such as in FormCV - FormSkillMatrix - SkillMatrix same with FormCV - FormWorkexpirience - WorkExpierience

- **TEMPLATE ENGLISH** not existent in the backend yet

- **download PROP** is not used shall be checked if it shall be same as check prop in GetCV

- **change Image** is not in place needs to be added to the GeneralSection

## Future Intentions

- **Login**


- **WORKEXKPIERIENCE** already delete- and patchable in the Form

- **Add Text to used Skill** in Work component even if a skill is not already choosen at the skillsection

- **Availability** Cross-checking with a List with its own endpoint to check who is available now, soon and not for long

- **SummarySectionCV and FormOverAllResume** there is no patch solution in place for languages, certificates, coures and educations
