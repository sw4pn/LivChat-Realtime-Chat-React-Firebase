import Cloud from "./Cloud";

const Clouds = () => {
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
