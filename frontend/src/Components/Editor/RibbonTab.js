import React from "react";

const RibonTab = ({ title, children }) => {
  return (
    <div className="ribbon-tab">
      <div className="tab-title">{title}</div>
      <div className="tab-content">{children}</div>
    </div>
  );
};

export default {RibonTab};
