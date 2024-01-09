import React from "react";
import { RibonTab } from "./RibbonTab.js"; // Create a separate component for each tab

const Ribbon = () => {
  return (
    <div className="ribbon">
      <RibonTab title="Home">
        {/* Add buttons and dropdowns for the Home tab */}
      </RibonTab>
      <RibonTab title="Insert">
        {/* Add buttons and dropdowns for the Insert tab */}
      </RibonTab>
      {/* Add more tabs as needed */}
    </div>
  );
};

export default {Ribbon};
