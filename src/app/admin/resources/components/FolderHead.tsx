import React from 'react'
import { FaPlus } from 'react-icons/fa'

type Props = {createFolder: () => void}

const FolderHead = ({createFolder}: Props) => {
  return (
    <div className="flex flex-row justify-between space-y-8">
        <div>
          <h3 className="font-medium text-lg">Resources</h3>
          <p className="font-normal text-sm text-tgrey3">
            Create folders and stored all documents here
          </p>
        </div>

        {/* Create Folder  */}
        <div className="flex flex-row text-center justify-center">
          <button
            className="flex flex-row rounded-md py-1 px-3 bg-dashboardButtonsBg text-dashboardButtons font-medium text-sm"
            onClick={createFolder}
          >
            <span>
              <FaPlus className="text-dashboardButtons my-1 mr-2" />
            </span>{" "}
            Create Folder
          </button>
        </div>
      </div>
  )
}

export default FolderHead