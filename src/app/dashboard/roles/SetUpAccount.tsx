import { SlArrowLeft } from "react-icons/sl";

export default function SetUpAccount( { onClick } ) {
  return (
    <div className="flex flex-col space-y-4 w-[60rem] font-inter">
      <div>
        <button className="flex flex-row space-x-2 text-tgrey3" type="button" onClick={onClick}>
          <div className="pt-2">
            <SlArrowLeft className="text-tgrey3 h-[0.6rem]" />
          </div>
          <p className="font-medium text-base"> Back </p>
        </button>
      </div>
      <div className="border-2 rounded-lg p-4 space-y-4">
        <div className="flex flex-col space-y-2">
            <h3 className="text-base font-medium">Finish up your account</h3>
            <p className="font-normal text-sm text-tgrey3">Complete this steps to setup your account fully</p>
        </div>
        <hr />
      </div>
    </div>
  );
}
