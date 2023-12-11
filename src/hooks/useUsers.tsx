import { toast } from "@components/ui/use-toast";
import {useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

// Implement to call the API endpoints

export interface User {
  id: number;
  name?: string;
  avatar?: string;
  status?: boolean;
}

type GetUsers = () => Promise<User[]>;
type GetUser = (id: string) => Promise<User>;
type EditUser = (userBody: User) => Promise<User>;

const getUsers: GetUsers = async () => {
  const res = await axios.get<User[]>('/users');
  return res.data;
};

const getUser: GetUser = async (id: string) => {
  const res = await axios.get<User>(`/users/${id}`);
  return res.data;
}

const createUser = async (userBody: User) => {
  try {
    const res = await axios.post('/users', userBody);
    return res.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

const editUser: EditUser = async (userBody: User) => {
  try {
    const res = await axios.put(`/users/${userBody.id}`, userBody);
    return res.data;

  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

const deleteUser = async (id: string) => {
  try {
    const res = await axios.patch(`/users/${id}`, { status: false });
    return res.data;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
}

// Implement to use React Query

export const useUsers = (searchTerm?: string) => {
  return useQuery({
    queryKey: ['GET_ALL_USERS', searchTerm],
    queryFn: async () => {
      const data = await getUsers();
      if (searchTerm) {
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        return data.filter(user => user.name && user.name.toLowerCase().includes(lowerCaseSearchTerm));
      }
      return data;
    },
    // staleTime: 1000,
  });
};


export const useUser = (id: string) => {
  return useQuery({
    queryKey: ['GET_USER_ID', id],
    queryFn: async () => {
      const data = await getUser(id);
      return data;
    },
  });
}

export const useCreateUser = () => {
  const client = useQueryClient();
  const { mutate: createUserInfo } =useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['GET_ALL_USERS'] });
      toast({
        variant: "success",
        title: "Created Profile",
        description: "We've created your profile",
      })
    },
    onError: (error) => {
      console.error('Error creating user:', error);
      toast({
        variant: "destructive",
        title: "Create Failed",
        description: "We've failed to create your profile",
      })
    },
  })

  return createUserInfo;
}


export const useUpdateUser = () => {
  const client = useQueryClient();
  const { mutate: updateUserInfo } = useMutation(
    {
      mutationFn: editUser,
      onMutate: async (newUserData: User) => {
        const previousUserData = client.getQueryData<User>(['GET_ALL_USERS']);
        client.setQueryData<User>(['GET_ALL_USERS', newUserData.id], newUserData);
        return { previousUserData };
      },
      onSuccess: () => {
        client.invalidateQueries({ queryKey: ['GET_ALL_USERS'] });
        toast({
          variant: "success",
          title: "Updated Profile",
          description: "We've updated your profile",
        })
      },
      onError: (error) => {
        console.error('Error updating user:', error);
        toast({
          variant: "destructive",
          title: "Update Failed",
          description: "We've failed to update your profile",
        })
      },
    }
  );

  return updateUserInfo;
};

export const useDeleteUser = () => {
  const client = useQueryClient();
  const { mutate: deleteUserMutation } = useMutation(
    {
      mutationFn: deleteUser,
      onSuccess: () => {
        client.invalidateQueries({ queryKey: ['GET_ALL_USERS'] });
        toast({
          variant: "success",
          title: "Deleted Profile",
          description: "We've deleted your profile",
        })
      },
      onError: (error) => {
        console.error('Error deleting user:', error);
        toast({
          variant: "destructive",
          title: "Delete Failed",
          description: "We've failed to delete your profile",
        })
      },
    }
  );

  return deleteUserMutation;
}
