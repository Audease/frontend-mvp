import Image from "next/image";
import React, { useState } from "react";
import { DeleteLearnerButton } from "../../(adminPersonaScreens)/recruiter-dashboard/components/RecruiterButtons";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import useGetFolders from "../utils/useGetFolders";
import convertDate from "../utils/convertDate";

type Props = {};

const FolderTableList = (props: Props) => {
  const [arrowdown, setArrowDown] = useState(false);
  const { folderData, loading, error } = useGetFolders();
  console.log(folderData);

  const toggleArrow = () => {
    setArrowDown((prev) => !prev);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="mt-4">
      {folderData && folderData.length > 0 ? (
        folderData.map((folder: any) => (
          <div
            key={folder.id}
            className="flex flex-row justify-between border-2 border-gray-50 px-4 py-2 rounded-lg shadow-sm mt-4"
          >
            <div className="flex flex-row text-center items-center space-x-6">
              <Image
                src={"/folder_icon.png"}
                alt={"folder icon"}
                height={10}
                width={30}
              ></Image>
              <p className="text-sm text-dashboardButtons">{folder.name}</p>
            </div>
            <div className="flex flex-row space-x-4 text-sm text-center items-center font-normal text-[#3A3A49] justify-between">
              <p className="">{convertDate(folder.createdAt).newDate}</p>
              <p>{convertDate(folder.createdAt).newTime}</p>
            </div>
            <div className="flex flex-row text-center items-center">
              <DeleteLearnerButton onDeleteClick={undefined} />
              {arrowdown && (
                <MdOutlineKeyboardArrowRight
                  className="w-10 h-10 text-gray-400"
                  onClick={toggleArrow}
                />
              )}
              {!arrowdown && (
                <MdOutlineKeyboardArrowDown
                  className="w-10 h-10 text-gray-400"
                  onClick={toggleArrow}
                />
              )}
            </div>
          </div>
        ))
      ) : (
        <div>No folders found.</div>
      )}
    </div>
  );
};

export default FolderTableList;
