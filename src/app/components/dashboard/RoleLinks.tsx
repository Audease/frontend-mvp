import { useState } from "react";


export default function RoleLinks () {
    const [active, setActive] = useState("")
    const links = ["All", "Recent", "Starred", "Modules", "Folders", "Trash"];

     // Define your click handler functions
  const handleAllClick = () => {
    console.log('All clicked');
  };

  const handleRecentClick = () => {
    console.log('Recent clicked');
  };

  const handleStarredClick = () => {
    console.log('Starred clicked');
  };

  const handleModulesClick = () => {
    console.log('Modules clicked');
  };

  const handleFoldersClick = () => {
    console.log('Folders clicked');
  };

  const handleTrashClick = () => {
    console.log('Trash clicked');
  };

    

    const clickHandlers = {
        All: handleAllClick,
        Recent: handleRecentClick,
        Starred: handleStarredClick,
        Modules: handleModulesClick,
        Folders: handleFoldersClick,
        Trash: handleTrashClick,
      };

    return (
        <div className="flex flex-row font-medium text-tgrey3 text-sm space-x-3">
            {links.map((link) => (
                <p
                  key={link}
                  onClick={() => {
                    setActive(link);
                    clickHandlers[link](); 
                  }}
                  className={`cursor-pointer pb-0 ${
                    active === link ? "border-b-4 border-dashboardButtons" : ""
                  }`}
                >
                  {link}
                </p>
              ))}
        </div>
    )
}