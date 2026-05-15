import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";

const useRole = () => {
  const { user, loading } = useAuth();
  const axiosPublic = useAxiosPublic();

  const { data: role = null, isLoading: isRoleLoading } = useQuery({
    queryKey: [user?.email, "role"],
    enabled: !loading && !!user?.email, // Only run when auth loading is finished and user exists
    queryFn: async () => {
      console.log("Fetching role for:", user?.email);
      const res = await axiosPublic.get(`/user/role/${user?.email}`);
      return res.data?.role || "student";
    },
  });

  return [role, isRoleLoading];
};

export default useRole;
