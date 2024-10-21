'use client';

import React, { useState } from 'react'
import { Type2Button } from '../../../../../../components/dashboard/Button'
import { RoleCreatedModal } from './RoleCreatedModal'
import CreateRoleModal from './CreateRoleModal'

type Props = {}

function CreateRole({ }: Props) {
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false)
  const [success, setSuccess] = useState(false)

  const onRoleClick = () => {
    setIsRoleModalOpen(true)
  }

  const closeRoleModal = () => {
    setIsRoleModalOpen(false)
  }

  const closeSuccessModal = () => {
    setIsRoleModalOpen(false)
    setSuccess(false)
  }

  return (
    <>
      <Type2Button
        leftIcon={"/role.png"}
        buttonText={"Role"}
        onClick={onRoleClick}
      />
      {!success ? (
        <CreateRoleModal {...{ isRoleModalOpen, closeRoleModal, setSuccess }} />
      ) : (
        <RoleCreatedModal {...{ success, closeSuccessModal }} />
      )}
    </>
  )
}

export default CreateRole