import Role from "./roles/page";
// import { fetchDropdownOptions } from "../lib/data";

export default async function Dashboard() {
  // const dropDownOptions = await fetchDropdownOptions();

  return (
    <div className="bg-white">
      <Role />
      {/* <p>
        Here is the data:{" "}
        {Array.isArray(dropDownOptions) && dropDownOptions.length > 0
          ? dropDownOptions.map((options) => options.role).join(", ")
          : "No options available"}
      </p> */}
    </div>
  );
}
