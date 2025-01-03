import Image from "next/image";
import React from "react";

type Props = {createFolder: () => void };

const EmptyScreen = ({ createFolder }: Props) => {
  return (
    <div className="h-[25rem] overflow-y-hidden flex flex-col items-center justify-center space-y-8">
      <Image
        src={"/empty.png"}
        width={200}
        height={200}
        alt="Empty illustrator"
      ></Image>
      <div className="text-center space-y-2">
        <h3 className="font-medium text-lg">No folder created</h3>
        <p className="font-normal text-sm text-tgrey3">
          Create a folder using <span className="text-dashboardButtons" onClick={createFolder}> +Create Folder </span> button
        </p>
      </div>
    </div>
  );
};

export default EmptyScreen;
