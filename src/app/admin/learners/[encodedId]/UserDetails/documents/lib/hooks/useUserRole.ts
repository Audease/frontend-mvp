import { useState, useEffect } from 'react';
import { useAppSelector } from '@/redux/store';
import { usePathname } from 'next/navigation';

export const useUserRole = () => {
  const [userRole, setUserRole] = useState('');
  const userPermissions = useAppSelector(
    (state) => state.authReducer.value.userPermission
  );
  const pathname = usePathname();

  useEffect(() => {
    const determineUserRole = () => {
      if (userPermissions.length > 4) {
        return pathname === '/admin/accessor-dashboard' ? 'accessor' : 'Admin';
      }
      if (userPermissions.includes('Student/Learner')) return 'learner';
      if (userPermissions.includes('Approve/reject application')) return 'accessor';
      return '';
    };

    setUserRole(determineUserRole());
  }, [userPermissions, pathname]);

  return userRole;
};