import { fetchData, updateData } from "@/lib/fetch-utils";
import { useMutation, useQuery, type QueryKey } from "@tanstack/react-query";

const queryKey: QueryKey = ["user"];

export const useUserProfileQuery = () => {
  return useQuery({
    queryKey,
    queryFn: () => fetchData("/users/profile"),
  });
};

export const useChangePassword = () => {
  return useMutation({
    mutationFn: async (data: {
      currentPassword: string;
      newPassword: string;
      confirmPassword: string;
    }) => updateData("/users/change-password", data),
  });
};

export const useUpdateUserProfile = () => {
  return useMutation({
    mutationFn: async (data: {
      name: string;
      profilePicture?: string;
      tagline?: string;
      bio?: string;
    }) => updateData("/users/profile", data),
  });
};