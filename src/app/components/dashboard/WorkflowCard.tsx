export default function WorkflowCard({ card }) {
  const { id, roleName, rolePermission, profilePics } = card;
  return (
    <div key={id} className="p-4 m-4 border rounded-lg shadow-md w-[15rem]">
      <div className="flex flex-row justify-between">
        <h3 className="text-black font-bold text-base">{roleName}</h3>
        <p className="text-tgrey3">...</p>
      </div>
      <div className="">
        <p className="text-tgrey3 text-sm font-medium">{rolePermission}</p>
      </div>
      <p>{profilePics}</p>
    </div>
  );
}
