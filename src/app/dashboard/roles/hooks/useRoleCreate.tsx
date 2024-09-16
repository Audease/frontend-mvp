import { useState, useEffect } from "react";

export const useCreateRole = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRoleSuccessModal, setIsRoleSuccessModal] = useState(false);
  const [roleFormData, setRoleFormData] = useState({
    roleName: "",
    permission: [],
  });
  const [endPointPermissions, setEndPointPermissions] = useState([]);

  // Fetch and cache permissions
  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        const response = await fetch("/api/getPermissions", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          // console.log(data)
          setEndPointPermissions(data); 
        } else {
          console.error("Failed to fetch permissions.");
        }
      } catch (error) {
        console.error("Error fetching permissions:", error);
      }
    };

    if (endPointPermissions.length === 0) {
      fetchPermissions(); 
    }
  }, [endPointPermissions]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const closeRoleSuccessModal = () => {
    setIsRoleSuccessModal(false);
    setRoleFormData({ roleName: "", permission: []});
  };

  const roleCreate = async () => {
    console.log(roleFormData)
    try {
      const selectedPermission = endPointPermissions.filter(
        (perm) => roleFormData.permission.includes(perm.name)
      );

      console.log(selectedPermission);

      if (!selectedPermission) {
        console.error("Permission not found for the selected role.");
        return;
      }

      const payload = {
        permission_ids: selectedPermission.map(perm => perm.id),
        role: roleFormData.roleName,
      };

      console.log(payload)

      const assignResponse = await fetch("/api/createRole", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      console.log(assignResponse)

      if (assignResponse.ok) {
        return true
      } else {
        return false
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
    endPointPermissions, 
  };
};
