import { Close, Settings } from "@mui/icons-material";
import {
  Avatar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import axiosInstance from "../../api/BaseUrl/axiosInstance";
import { useEffect, useState } from "react";
import { UserInterface } from "../../interfaces/UserInterface";

const UserManagementPage = () => {
  const [Users, setUsers] = useState<UserInterface[]>([]);
  const [Query, setQuery] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState("");

  const fetchUser = async () => {
    try {
      const { data } = await axiosInstance.get(`/all-users`);
      setUsers(data.users);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);

  // Search functionality
  const filteredUsers = Users.filter((user) =>
    user.name.toLowerCase().includes(Query.toLowerCase())
  );

  //handleRolechange
  const handleRolechange = async (userId: string, role: string) => {
    try {
      await axiosInstance.put(`/update-user-role/${userId}`, { role });
      fetchUser();
    } catch (error) {
      console.log(error);
    }
  };

  //confirmDelete
  const confirmDelete = async (userId: string) => {
    try {
      await axiosInstance.delete(`/delete-user/${userId}`);

      fetchUser();
    } catch (error) {
      console.log(error);
    }
    setOpenDialog(false);
  };

  //deleting user
  const handleDelete = (userId: string) => {
    setSelectedUserId(userId);
    setOpenDialog(true);
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <div className="flex justify-end pr-4 mb-5">
        <input
          type="search"
          className="block p-2.5 z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-100 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
          placeholder="Search"
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="p-4">
              <div className="flex items-center">
                <input
                  id="checkbox-all-search"
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label className="sr-only">checkbox</label>
              </div>
            </th>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              User Role
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length === 0 ? (
            <tr className=" bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td colSpan={4} className="px-6 py-5 text-center">
                No users found matching the search criteria.
              </td>
            </tr>
          ) : (
            filteredUsers.map((user) => (
              <tr
                key={user._id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="w-4 p-4">
                  <div className="flex items-center">
                    <input
                      id="checkbox-table-search-1"
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label className="sr-only">checkbox</label>
                  </div>
                </td>
                <td
                  scope="row"
                  className="px-6 py-5 font-medium text-gray-900 whitespace-nowrap dark:text-white flex items-center gap-3"
                >
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      className="w-14 h-14 rounded-full object-cover"
                    />
                  ) : (
                    <Avatar />
                  )}
                  {user.name}
                </td>
                <td
                  scope="row"
                  className="px-6 py-5 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <span
                    className={`px-6 py-2 rounded-3xl ${
                      user.role === "admin"
                        ? "bg-green-600 "
                        : "bg-yellow-500 text-black"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-5 space-x-6">
                  <a href="#" className="space-x-1.5">
                    <Settings />
                    {/* <span className="text-xs">Modify UserRole</span> */}
                    <select
                      value={user.role}
                      name=""
                      id=""
                      onChange={(e) =>
                        handleRolechange(user._id, e.target.value)
                      }
                      className="bg-transparent"
                    >
                      <option value="user">user</option>
                      <option value="admin">admin</option>
                    </select>
                  </a>
                  <a href="#" className="space-x-1.5">
                    <Close onClick={() => handleDelete(user._id)} />
                    <span className="text-xs">Remove User</span>
                  </a>
                  <Dialog
                    open={openDialog}
                    onClose={() => setOpenDialog(false)}
                  >
                    <DialogTitle>Confirm Delete</DialogTitle>
                    <DialogContent>
                      <DialogContentText>
                        Are you sure you want to delete this user?
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <button
                        onClick={() => setOpenDialog(false)}
                        className="px-4 py-2 mr-2 text-gray-600 bg-gray-300 rounded"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => confirmDelete(selectedUserId)}
                        className="px-4 py-2 text-white bg-red-500 rounded"
                      >
                        Delete
                      </button>
                    </DialogActions>
                  </Dialog>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagementPage;
