"use client";

import SelectDateComponent from "./SelectDateComponent";
import SelectedTime from "./SelectedTime";

const TimeComponent = () => {
  return (
    <div className="w-full">
      <div className="w-full overflow-hidden">
        <SelectDateComponent />
      </div>
      <div className="">
        <SelectedTime />
      </div>
    </div>
  );
};

export default TimeComponent;
