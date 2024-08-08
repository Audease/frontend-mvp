"use client";

import { useState, useEffect } from "react";
import DefaultLeft from "./DefaultLeft";
import SetUpAccount from "./SetUpAccount";
import CreateRole, { AddAuditLearnerModal, RoleCreated } from "./CreateRole";
import Staff from "./Staff";
import Workflow from "../workflows/Workflow";
import CreateWorkflow, { WorkflowCreated } from "../workflows/CreateWorkflow";
import Rightside from "./Rightside";
import AddLearnerModal, { LearnerCreated } from "../learners/learnerModal";
import axios from "axios";

export default function Role() {
  const [currentComponent, setCurrentComponent] = useState("Default");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isWorkflowModalOpen, setIsWorkflowModalOpen] = useState(false);
  const [isRoleSuccessModal, setIsRoleSuccessModal] = useState(false);
  const [isWorkflowSuccessModal, setIsWorkflowSuccessModal] = useState(false);
  const [learnerCreateModalState, setLearnerCreateModalState] = useState(false);
  const [learnerSuccessModal, setLearnerSuccessModal] = useState(false);
  const [addAuditLearnerModal, setAddAuditLearnerModal] = useState(false);
  const [availablePermissions, setAvailablePermissions] = useState([]);

  const closeLearnerCreateModal = () => {
    console.log("closed");
    setLearnerCreateModalState(false);
  };

  const onCreateClick = () => {
    setLearnerCreateModalState(false);
    setLearnerSuccessModal(true);
  };

  const closeLearnerSuccessModal = () => {
    setLearnerSuccessModal(false);
  };

  const [roleFormData, setRoleFormData] = useState({
    roleName: "",
    permission: "",
  });

  const showComponent = (componentName) => {
    setCurrentComponent(componentName);
  };

  const onBackClick = () => {
    setCurrentComponent("Default");
  };

  const onClickSetUpAcct = () => {
    showComponent("SetUpAccount");
  };

  const onStaffClick = () => {
    showComponent("Staff");
  };

  const onRoleClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const onLearnerClick = () => {
    setLearnerCreateModalState(true);
  };

  const closeRoleSuccessModal = () => {
    setIsRoleSuccessModal(false);
    setRoleFormData({
      roleName: "",
      permission: "",
    });
  };

  const roleCreate = () => {
    setRoleFormData({
      roleName: "",
      permission: "",
    });
    if (roleFormData.permission === "Audit" || roleFormData.permission === "") {
      setAddAuditLearnerModal(true);
      setIsModalOpen(false);
    } else {
      setIsRoleSuccessModal(true);
      setIsModalOpen(false);
    }

    
      const fetchStaffData = async () => {
        try {
          const response = await axios.get('/api/getPermissions');
          if (response.status === 200) {
            setAvailablePermissions(response.data);
            console.log(response.data) 
          } else {
            console.error('Failed to fetch staff data:', response.data.message);
          }
        } catch (error) {
          console.error('Error fetching staff data:', error);
        }
      };
  
      fetchStaffData();
      console.log(availablePermissions)

    console.log(roleFormData.permission);
  };

  const onWorkflowClick = () => {
    setIsWorkflowModalOpen(true);
  };

  const closeWorkflowModal = () => {
    setIsWorkflowModalOpen(false);
  };

  const closeWorkflowSuccessModal = () => {
    setIsWorkflowSuccessModal(false);
  };

  const workflowCreate = () => {
    console.log(roleFormData);
    setIsWorkflowSuccessModal(true);
    setIsWorkflowModalOpen(false);
    setRoleFormData({
      roleName: "",
      permission: "",
    });
  };

  const onResourcesClick = () => {
    console.log("Resources Clicked");
  };

  const onFormClick = () => {
    console.log("Forms Clicked");
  };

  const closeAuditLearnerModal = () => {
    setAddAuditLearnerModal(false);
  };

  const renderComponent = () => {
    switch (currentComponent) {
      case "SetUpAccount":
        return <SetUpAccount onClick={onBackClick} />;
      case "Staff":
        return <Staff onClick={onBackClick} />;
      case "Workflow":
        return <Workflow onClick={onBackClick} />;
      default:
        return <DefaultLeft onClickSetUpAcct={onClickSetUpAcct} />;
    }
  };

  // const onTesting = async () => {
  //   console.log("here I am");

  //   const refreshToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJmMDBjMGEyZi1lNGMzLTRhNjAtYmUyNS00N2IyMTY5Njk0NWIiLCJyb2xlX2lkIjoiMTljYzRjOTUtNTc2Yi00NzE3LTljNWItNzVmNzNiZDI4MmEzIiwiZXhwIjoxNzIzNTYwMzY3LCJpYXQiOjE3MjI5NTU1NjcsInR5cGUiOiJyZWZyZXNoIn0.T0zspbdBL7fRG9LHv3Xoc4RYsWuHYeZHdwpfF2AmjnU"; // Add your refresh token here

  //   const payload = {
  //     refreshToken,
  //   };

  //   try {
  //     const response = await axios.post(
  //       "/api/refresh-token",
  //       payload,
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );
  //     // document.cookie = `accessToken=${response.data.token}; path=/; max-age=${12 * 60 * 60}`;
  //     console.log("Token refreshed:", response.data);
  //   } catch (error) {
  //     console.error("Error refreshing token:", error);
  //   }
  // };

  return (
    <div>
      {/* Body section  */}
      <div className="flex flex-row space-x-12">
        {/* left side  */}
        <div className="w-3/4">
          {renderComponent()}
          {/* Modal */}
          <CreateRole
            show={isModalOpen}
            onClose={closeModal}
            onClick={roleCreate}
            formData={roleFormData}
            setFormData={setRoleFormData}
          />
          <RoleCreated
            show={isRoleSuccessModal}
            onClose={closeRoleSuccessModal}
          />

          {/* Create Workflow Modal  */}
          <CreateWorkflow
            show={isWorkflowModalOpen}
            onClose={closeWorkflowModal}
            onClick={workflowCreate}
            formData={roleFormData}
            setFormData={setRoleFormData}
          />
          {/* Workflow Success Modal */}
          <WorkflowCreated
            show={isWorkflowSuccessModal}
            onClose={closeWorkflowSuccessModal}
          />

          <AddLearnerModal
            show={learnerCreateModalState}
            onClose={closeLearnerCreateModal}
            onCreateClick={onCreateClick}
          />

          <LearnerCreated
            show={learnerSuccessModal}
            onClose={closeLearnerSuccessModal}
          />

          <AddAuditLearnerModal
            show={addAuditLearnerModal}
            onClose={closeAuditLearnerModal}
          />
        </div>

        {/* right side  */}
        <div className="w-1/4">
          <Rightside
            onRoleClick={onRoleClick}
            onStaffClick={onStaffClick}
            onWorkflowClick={onWorkflowClick}
            onLearnerClick={onLearnerClick}
            onResourcesClick={onResourcesClick}
            onFormClick={onFormClick}
          />

          {/* <h3 onClick={onTesting}>Here</h3> */}
        </div>
      </div>
    </div>
  );
}
