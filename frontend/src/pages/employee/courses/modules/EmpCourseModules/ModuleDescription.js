import React, { useState, useEffect } from "react";
import { FiZoomIn, FiZoomOut } from "react-icons/fi";
import screenfull from "screenfull"; // Optional library to handle full screen mode
import Switch from "react-switch";

const ModuleDescription = ({ data, subModuleDescription, setActiveSubmodule }) => {
    const [isZoomed, setZoomed] = useState(false);
    const [currentPage, setCurrentPage] = useState(0); // Current content page index
    const [fullscreen, setFullscreen] = useState(false); // Handle fullscreen mode
    const [allDescriptions, setAllDescriptions] = useState([]); // State to store all descriptions
    const [activeSubModuleId, setActiveSubModuleId] = useState(null);
    const [toggleSwitch, setToggleSwitch] = useState(false); // Toggle switch state
    const [progress, setProgress] = useState(0); // State to track progress

    // Combine all module descriptions into one array
    useEffect(() => {
        if (data?.modules && Array.isArray(data.modules)) {
            // Flatten descriptions from all modules
            const descriptionsList = data.modules.flatMap((module) =>
                module.module?.flatMap((subModule) =>
                    subModule?.descriptions?.flatMap((description) => [{ moduleId: subModule?._id, Id: description?._id, content: description?.content }] || [])
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
    }, [subModuleDescription, allDescriptions]);

    useEffect(() => {
        setActiveSubmodule(allDescriptions[currentPage]);
    }, [currentPage]);


    const toggleZoom = () => {
        setZoomed(!isZoomed);
        if (screenfull.isEnabled) {
            fullscreen ? screenfull.exit() : screenfull.request();
            setFullscreen(!fullscreen);
        }
    };

    // Handle Escape key to exit fullscreen
    useEffect(() => {
        const handleEscKey = (event) => {
            if (event.key === "Escape" && fullscreen) {
                toggleZoom(); // Exit zoom when Esc is pressed
            }
        };

        // Attach keydown event listener
        window.addEventListener("keydown", handleEscKey);

        // Clean up the event listener on component unmount
        return () => {
            window.removeEventListener("keydown", handleEscKey);
        };
    }, [fullscreen]); // Only re-attach if fullscreen state changes

    // Handle previous and next pagination for submodule descriptions
    const handlePrevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
            updateProgress(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < allDescriptions.length - 1) {
            setCurrentPage(currentPage + 1);
            updateProgress(currentPage + 1);
        }
    };

    // Update the progress as per the current page
    const updateProgress = (page) => {
        const newProgress = ((page + 1) / allDescriptions.length) * 100;
        setProgress(newProgress);
    };

    // Toggle switch state change handler
    const handleToggleSwitch = () => {
        setToggleSwitch(!toggleSwitch);
    };

    return (
        <div className={`col-lg-12 col-md-12 ${fullscreen ? "fullscreen" : ""}`}>
            <div className="main_tab_content">
                <div className="tab-content">
                    {/* Header with Zoom Controls */}
                    {!fullscreen &&
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
                            <div className="d-flex align-items-center" title="Hide modules and notes">
                                <Switch
                                    checked={toggleSwitch}
                                    onChange={handleToggleSwitch}
                                    onColor="#4CAF50"
                                    offColor="#ccc"
                                    title="Hide modules and notes"
                                    placeholder="Hide modules and notes"
                                />
                            </div>

                            {/* Zoom Control */}
                            <button onClick={toggleZoom} className="btn btn-sm">
                                {isZoomed || fullscreen ? <FiZoomOut /> : <FiZoomIn />}
                            </button>
                        </div>
                    }

                    {/* Module Description Content */}
                    <div className={`module-description-content ${fullscreen ? "fullscreen-content" : ""}`}>
                        {allDescriptions && allDescriptions.length > 0 ? (
                            <>
                                {/* Display the current page's content */}
                                <div className={`description-content ${isZoomed ? "zoomed" : ""}`}>
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: allDescriptions[currentPage]?.content, // Display current content block
                                        }}
                                    ></div>
                                </div>

                                {/* Pagination controls */}
                                <div className="pagination-controls">
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
        </div >
    );
};

export default ModuleDescription;
