import { ReactNode } from "react";
import Cloud from "./Cloud";

const Clouds = () => {
  const cloudClass =
    "absolute bottom-0 w-3 h-3 rounded-full bg-orange-50 -left-1";
  return (
    <div className="absolute w-full h-full   overflow-x-hidden;">
      <Cloud first type="small" />
      <Cloud type="tiny" />
      <Cloud />
      <Cloud type="tiny" />
      <Cloud />
      <Cloud type="small" />
      {/* <Cloud type="large" />
      <Cloud />
      <Cloud type="small" />
      <Cloud type="tiny" /> */}
    </div>
  );
};

export default Clouds;
