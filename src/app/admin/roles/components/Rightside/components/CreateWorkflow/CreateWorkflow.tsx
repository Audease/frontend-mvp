'use client';

import React from 'react'
import { Type2Button } from '../../../../../../components/dashboard/Button'
import CreateWorkflowModal from './CreateWorkflowModal'

type Props = {}

function CreateWorkflow({ }: Props) {
  const [isModalOpen, setIsModalOpen] = React.useState(false)

  const onWorkflowClick = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  return (
    <>
      <Type2Button
        leftIcon={"/worflow.png"}
        buttonText={"Workflow"}
        onClick={onWorkflowClick}
        disabled={true}
      />
      {/* <CreateWorkflowModal {...{ isModalOpen, closeModal }} /> */}
    </>
  )
}

export default CreateWorkflow