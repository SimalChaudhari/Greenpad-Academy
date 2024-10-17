import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiZoomIn, FiZoomOut } from "react-icons/fi";
import screenfull from "screenfull"; // Optional library to handle full screen mode
import Switch from "react-switch";

// Importing the static image
const programTitleImage = '/assets/modules_images/program_title.png';

const ModuleDescription = ({ data, subModuleDescription, setActiveSubmodule, programTitle, setProgramTitle, showContent, toggleContent }) => {
    const dispatch = useDispatch();
    const [isZoomed, setZoomed] = useState(false);
    const [currentPage, setCurrentPage] = useState(0); // Current content page index
    const [fullscreen, setFullscreen] = useState(false); // Handle fullscreen mode
    const [allDescriptions, setAllDescriptions] = useState([]); // State to store all descriptions
    const [toggleSwitch, setToggleSwitch] = useState(false); // Toggle switch state
    const [progress, setProgress] = useState(0); // State to track progress

    const progress_list = useSelector((state) => state?.employeemodule?.progress_list || []);

    // Combine all module descriptions into one array
    useEffect(() => {
        if (programTitle) {
            setCurrentPage(0);
        }
    }, [programTitle]);

    useEffect(() => {
        const newProgress = ((progress_list.length) / allDescriptions.length) * 100;
        setProgress(newProgress);
    }, [progress_list, allDescriptions]);

    useEffect(() => {
        if (data?.modules && Array.isArray(data.modules)) {
            const descriptionsList = data.modules.flatMap((module) =>
                module.module?.flatMap((subModule) =>
                    subModule?.descriptions?.map((description) => ({
                        courseId: data?._id,
                        moduleId: module?._id,
                        subModuleId: subModule?._id,
                        Id: description?._id,
                        content: description?.content
                    }))
                )
            );
            setAllDescriptions(descriptionsList.filter(Boolean)); // Remove any undefined or null values
        }
    }, [data]);

    // Handle setting current page when clicking on a submodule
    useEffect(() => {
        if (subModuleDescription && subModuleDescription[0]) {
            const foundIndex = allDescriptions.findIndex(
                (item) => item.Id === subModuleDescription[0]._id
            );

            setActiveSubmodule(allDescriptions.find((item) => item.Id === subModuleDescription[0]._id));

            if (foundIndex !== -1) {
                setCurrentPage(foundIndex); // Set current page to the correct submodule description
            }
        }
    }, [subModuleDescription, allDescriptions, setActiveSubmodule]);

    useEffect(() => {
        setActiveSubmodule(allDescriptions[currentPage]);
    }, [currentPage, allDescriptions, setActiveSubmodule]);

    // Function to toggle zoom and fullscreen
    const toggleZoom = () => {
        setZoomed(false);

        if (screenfull.isEnabled) {
            if (!fullscreen) {
                screenfull.request().then(() => setFullscreen(true));
            } else {
                screenfull.exit().then(() => setFullscreen(false));
            }
        }
    };

    // Listen for fullscreen change events (to sync state correctly)
    useEffect(() => {
        const handleFullscreenChange = () => {
            if (screenfull.isEnabled) {
                setFullscreen(screenfull.isFullscreen);
            }
        };

        screenfull.on("change", handleFullscreenChange);

        // Clean up the event listener on unmount
        return () => screenfull.off("change", handleFullscreenChange);
    }, []);

    // Handle Escape key to exit fullscreen
    useEffect(() => {
        const handleEscKey = (event) => {
            if (event.key === "Escape" && fullscreen) {
                screenfull.exit().then(() => setFullscreen(false));
            }
        };

        window.addEventListener("keydown", handleEscKey);

        // Clean up the event listener on unmount
        return () => window.removeEventListener("keydown", handleEscKey);
    }, [fullscreen]);

    // Reset the fullscreenExited state when fullscreen is toggled
    useEffect(() => {
        if (!fullscreen) {
            const timeoutId = setTimeout(() => {
                const topElement = document.getElementById("Top");
                if (topElement) {
                    topElement.scrollIntoView({ behavior: "smooth", block: "start" });
                }
            }, 100); // 100ms delay

            return () => clearTimeout(timeoutId); // Cleanup timeout on unmount
        }
    }, [fullscreen]);

    // Handle previous and next pagination for submodule descriptions
    const handlePrevPage = () => {
        if (currentPage == 1) {
            setProgramTitle(true);
            setCurrentPage(0);
        } else {
            if (currentPage > 0) {
                setCurrentPage(currentPage - 1);
            }
        }
    };

    const handleNextPage = () => {
        if (programTitle) {
            setProgramTitle(false);
            setCurrentPage(0);
        } else {

            if (currentPage < allDescriptions.length - 1) {
                setCurrentPage(currentPage + 1);
            }
        }
    };

    // Toggle switch state change handler
    const handleToggleSwitch = () => {
        toggleContent();
        setToggleSwitch(!toggleSwitch);
    };

    return (
        <div className={`col-lg-12 col-md-12 ${fullscreen ? "fullscreen" : ""}`}>
            <div className="main_tab_content">
                <div className="tab-content">
                    {/* Header with Zoom Controls */}
                    {!fullscreen && (
                        <div className="mb-3 site_bg pr-3 pl-3 pt-1 pb-1 color_white heading_tabs d-flex justify-content-between align-items-center">
                            <span>{data?.name || "Module Description"}</span>
                            {/* Progress Bar */}
                            <div className="align-items-center">
                                <div className="progress" style={{ height: "10px" }}>
                                    <div
                                        className="progress-bar"
                                        style={{
                                            width: `${progress}%`,
                                            backgroundColor: "#4CAF50",
                                        }}
                                    ></div>
                                </div>
                                <span>{`Progress: ${Math.round(progress)}%`}</span>
                            </div>

                            {/* Toggle Switch */}
                            <div className="d-flex align-items-center sm" title="Hide modules and notes">
                                <Switch
                                    checked={showContent}
                                    onChange={() => toggleContent(!showContent)}
                                    onColor="#4CAF50"
                                    offColor="#ccc"
                                    title="Hide modules and notes"
                                />
                            </div>

                            {/* Zoom Control */}
                            <button onClick={toggleZoom} className="btn btn-sm">
                                {isZoomed || fullscreen ? (
                                    <FiZoomOut style={{ color: '#fff', fontSize: '22px' }} /> // Change color and size as needed
                                ) : (
                                    <FiZoomIn style={{ color: '#fff', fontSize: '22px' }} /> // Change color and size as needed
                                )}
                            </button>
                        </div>
                    )}

                    {/* Module Description Content */}
                    <div className={`module-description-content ${fullscreen ? "fullscreen-content" : ""}`}>
                        {allDescriptions && allDescriptions.length > 0 ? (
                            <>
                                {/* Display the current page's content */}
                                <div className={`description-content ${isZoomed ? "zoomed" : ""}`}>
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: programTitle
                                                ? `<img src="${programTitleImage}" alt="Program Title" />`
                                                : allDescriptions[currentPage]?.content, // Display current content block
                                        }}
                                    ></div>
                                </div>

                                {/* Pagination controls */}
                                <div className="pagination-controls mt-3">
                                    <button
                                        onClick={handlePrevPage}
                                        disabled={currentPage === 0} // Disable if on the first page
                                        className="btn btn-secondary mx-2"
                                    >
                                        Previous
                                    </button>
                                    <span>
                                        Page {currentPage + 1} of {allDescriptions.length}
                                    </span>
                                    <button
                                        onClick={handleNextPage}
                                        disabled={currentPage === allDescriptions.length - 1} // Disable if on the last page
                                        className="btn btn-secondary mx-2"
                                    >
                                        Next
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="no-content">No description available.</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModuleDescription;
