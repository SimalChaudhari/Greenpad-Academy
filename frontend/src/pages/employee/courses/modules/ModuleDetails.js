import React from "react";
import ModuleExam from "./ModuleExam";

const ModuleDetails = ({ moduleData }) => {
  const [isModuleComplete, setIsModuleComplete] = useState(false);

  // Call this function when the user completes the module
  const completeModule = () => {
    setIsModuleComplete(true);
  };

  return (
    <div>
      <h1>{moduleData.title}</h1>
      <p>{moduleData.description}</p>

      {/* Render the complete button */}
      {!isModuleComplete && (
        <button onClick={completeModule}>Complete Module</button>
      )}

      {/* Render the exam once the module is completed */}
      {isModuleComplete && <ModuleExam moduleId={moduleData._id} />}
    </div>
  );
};

export default ModuleDetails;
