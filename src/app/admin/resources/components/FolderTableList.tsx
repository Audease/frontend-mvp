import Image from 'next/image'
import React, { useState } from 'react'
import { DeleteLearnerButton } from '../../(adminPersonaScreens)/recruiter-dashboard/components/RecruiterButtons'
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowRight } from "react-icons/md";


type Props = {}

const FolderTableList = (props: Props) => {
    const [arrowdown, setArrowDown] = useState(false);

    const toggleArrow = () => {
        setArrowDown(prev => !prev)
    }
  return (
    <div className='flex flex-row justify-between border-2 border-gray-50 px-4 py-2 rounded-lg shadow-sm mt-4'>
        <div className='flex flex-row text-center items-center space-x-6'>
        <Image src={'/folder_icon.png'} alt={'folder icon'} height={10} width={30}></Image>
        <p className='text-sm text-dashboardButtons'>Folder 1</p>
        </div>
        <div className='flex flex-row space-x-4 text-sm text-center items-center font-normal'>
            <p>Date</p>
            <p>Time</p>
        </div>
        <div className='flex flex-row text-center items-center'>
            <DeleteLearnerButton onDeleteClick={undefined} />
            {arrowdown && <MdOutlineKeyboardArrowRight className='w-10 h-10 text-gray-400' onClick={toggleArrow}/>}
            {!arrowdown && <MdOutlineKeyboardArrowDown className='w-10 h-10 text-gray-400' onClick={toggleArrow}/>
            }
        </div>
    </div>
  )
}

export default FolderTableList