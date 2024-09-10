import { useState } from "react";
import axios from "axios";

export const useCreateRole = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRoleSuccessModal, setIsRoleSuccessModal] = useState(false);
  const [roleFormData, setRoleFormData] = useState({
    roleName: "",
    permission: "",
  });

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const closeRoleSuccessModal = () => {
    setIsRoleSuccessModal(false);
    setRoleFormData({ roleName: "", permission: "" });
  };

  const roleCreate = async () => {
    try {
      const response = await axios.get("/api/getPermissions");
      if (response.status === 200) {
        const fetchedPermissions = response.data;
        console.log(fetchedPermissions)
        const selectedPermission = fetchedPermissions.find(
          (perm) => perm.name === roleFormData.permission
        );

        if (!selectedPermission) {
          console.error("Permission not found for the selected role.");
          return;
        }

        const payload = {
          permission_id: selectedPermission.id,
          role: roleFormData.roleName,
        };

        const assignResponse = await axios.post("/api/createRole", payload, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (assignResponse.status === 201) {
          setIsRoleSuccessModal(true);
          setIsModalOpen(false);
        }
      }
    } catch (error) {
      console.error("Error during role creation:", error);
    }
  };

  return {
    isModalOpen,
    isRoleSuccessModal,
    roleFormData,
    setRoleFormData,
    openModal,
    closeModal,
    closeRoleSuccessModal,
    roleCreate,
  };
};
