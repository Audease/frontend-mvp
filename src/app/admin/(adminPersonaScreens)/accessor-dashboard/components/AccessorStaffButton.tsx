import React, { useState } from 'react'
import AccessorStaffModal from '../accessorModal';

const AccessorStaffButton = () => {
    const [showBKSDStaffModal, setShowBKSDStaffModal] = useState(false);
    const onViewStaffClick = () => {
        setShowBKSDStaffModal(true);
      }

      const closeBKSDStaffModal = () => {
        setShowBKSDStaffModal(false);
      }
  return (
    <div>
    <button
      className="flex flex-row rounded-md py-[0.4rem] px-4 bg-black text-white font-medium text-sm"
      onClick={onViewStaffClick}
    >
      View staff
    </button>

     {/* The view staff modal  */}
     <AccessorStaffModal show={showBKSDStaffModal} onClose={closeBKSDStaffModal}/>
  </div>
  )
}

export default AccessorStaffButton