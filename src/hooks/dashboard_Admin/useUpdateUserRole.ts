import { updateUserRoleAction } from "@/src/actions/updateUserRoleAction";
import { AdminUserRole } from "@/src/types/Admin_Dashboard/AdminUsers";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateUserRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      role,
    }: {
      id: number | string;
  role: AdminUserRole ;
    }) => updateUserRoleAction(id, role),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin-users"],
      });
    },
  });
};