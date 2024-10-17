import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAll,
  updateProgress,
  getModulesProgress,
  editEmployeeNoteById,
  deleteEmployeeNoteById,
} from "../../../../../redux/actions/employee/modulesActions";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Layout from "../../../../../Components/Layout";
import { toast } from "react-toastify";
import DeleteModel from "../../../../../Components/Delete";
import Edit from "../Edit";
import ModulesList from "./ModulesList";
import ModuleDescription from "./ModuleDescription";
import NotesSection from "./NotesSection";
import "./style.css";

const EmpCourseModulesIndex = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data = useSelector((state) => state?.employeemodule?.list?.data || []);
  const authId = useSelector((state) => state?.auth?.user);

  const [activeRow, setActiveRow] = useState("");
  const [innerData, setInnerData] = useState([]);
  const [activeModuleRow, setActiveModuleRow] = useState("");
  const [newNotesContent, setNewNotesContent] = useState("");
  const [saveNotesContent, setSaveNotesContent] = useState("");
  const [activeTab, setActiveTab] = useState("newnotes");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editmodalOpen, setEditModalOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [courseModule_Id, setCourseModule_Id] = useState(null);
  const [showContent, setShowContent] = useState(false);

  const [activeModule, setActiveModule] = useState([]);
  const [subModuleDescription, setSubModuleDescription] = useState("");
  const [programTitle, setProgramTitle] = useState(true);
  const [subModuleImage, setSubModuleImage] = useState(null);
  const [activeSubmodule, setActiveSubmodule] = useState(null);

  const { id } = useParams();
  const location = useLocation();
  const courseId = location?.pathname?.split("/")[4];


  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const topElement = document.getElementById("Top");
      if (topElement) {
        topElement.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100); // 100ms delay

    return () => clearTimeout(timeoutId); // Cleanup timeout on unmount
  }, []);

  useEffect(() => {

    const intervalId = setTimeout(() => {
      if (activeSubmodule?.Id) {
        const formData = {
          descriptionId: activeSubmodule?.Id,
          courseId: activeSubmodule?.courseId,
          moduleId: activeSubmodule?.moduleId,
          subModuleId: activeSubmodule?.subModuleId,
        };
        dispatch(updateProgress(formData));
      }
    }, 0);

    // Clean up the interval when the component unmounts
    return () => {
      clearInterval(intervalId);
    };
  }, [dispatch, activeSubmodule]);

  useEffect(() => {
    dispatch(getAll(id));
    dispatch(getModulesProgress(id));
  }, [dispatch, id]);

  const handleSaveNotes = () => {
    const textareaContent = activeTab === "newnotes" ? newNotesContent : saveNotesContent;
    if (!textareaContent.trim()) {
      toast.warning("Please enter some notes before saving.");
      return;
    }

    const formData = {
      descriptionId: activeSubmodule?.Id,
      courseId: activeSubmodule?.courseId,
      moduleId: activeSubmodule?.moduleId,
      subModuleId: activeSubmodule?.subModuleId,
      notes: textareaContent,
      tag: activeTab,
    };

    // Dispatch action to add or update the note
    dispatch(editEmployeeNoteById(activeSubmodule?.Id, formData)).then(() => {
      toast.success(formData?.notes ? "Note updated successfully" : "Note saved successfully");
      setNewNotesContent("");
      setSaveNotesContent("");
    });
  };

  const toggleContent = () => {
    setShowContent(!showContent);
  };

  const handleDelete = (noteId) => {
    dispatch(deleteEmployeeNoteById(noteId)).then(() => {
      setDeleteModalOpen(false);
      setSelectedNote(null);
      toast.success("Note deleted successfully");
    });
  };

  return (
    <Layout>
      <section className="enrolled_courses grey_bg pt-5 pb-5">
        <div className="container-fluid">
          <div className="row">
            <div id="Top"></div>
            {!showContent && (
              <ModulesList
                data={data}
                activeRow={activeRow}
                innerData={innerData}
                setActiveRow={setActiveRow}
                setInnerData={setInnerData}
                setActiveModuleRow={setActiveModuleRow}
                setActiveModule={setActiveModule}
                courseModule_Id={courseModule_Id}
                setCourseModule_Id={setCourseModule_Id}
                setSubModuleDescription={setSubModuleDescription}
                setProgramTitle={setProgramTitle}
                activeSubmodule={activeSubmodule}
              />
            )}
            <div className={!showContent ? "col-xl-8 mt-2" : "col-xl-12 mt-2"}>
              <ModuleDescription
                data={data}
                activeModuleRow={activeModuleRow}
                activeModule={activeModule}
                subModuleDescription={subModuleDescription}
                subModuleImage={subModuleImage}
                courseId={courseId}
                courseModule_Id={courseModule_Id}
                setActiveSubmodule={setActiveSubmodule}
                programTitle={programTitle}
                setProgramTitle={setProgramTitle}
                showContent={showContent}
                toggleContent={toggleContent}
              />
            </div>
            {!showContent && (
              <NotesSection
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                newNotesContent={newNotesContent}
                setNewNotesContent={setNewNotesContent}
                saveNotesContent={saveNotesContent}
                setSaveNotesContent={setSaveNotesContent}
                handleSaveNotes={handleSaveNotes}
                activeSubmodule={activeSubmodule}
              />
            )}
          </div>
        </div>
      </section>

      {deleteModalOpen && selectedNote && (
        <DeleteModel
          data={selectedNote}
          handleDelete={handleDelete}
          handleCloseModal={() => setDeleteModalOpen(false)}
        />
      )}

      {editmodalOpen && selectedNote && (
        <Edit
          courseData={selectedNote}
          handleCloseModal={() => setEditModalOpen(false)}
        />
      )}
    </Layout>
  );
};

export default EmpCourseModulesIndex;
