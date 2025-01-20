import { useState, useEffect } from "react";
import Td from "../content-management/components/table/td";
import Th from "../content-management/components/table/th";
import Thead from "../content-management/components/table/thead";
import {
  fetchUser,
  deleteUser,
  updateUser,
} from "./service/user.service";
import EditModal from "./editModal";

export default function TableVideo({ isDataUpdated }) {
  const [ users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchData = async () => {
    try {
      const response = await fetchUser();
      const uniqueusers = Array.from(
        new Set(response.map((user) => user.id))
      ).map((id) => response.find((video) => video.id === id));

      console.log("video: ",uniqueusers);

      setUsers(uniqueusers);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };


  const handleEdit = (user) => {
    // console.log(user);
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    await fetchData();
    setIsModalOpen(false);
  };

  useEffect(() => {
    console.log(users);
  }, [users])

  useEffect(() => {
    fetchData();
  }, [isDataUpdated]);

  return (
    <div>
      <table className="w-full table-fixed">
        <Thead>
          <tr>
            <Th>Username</Th>
            <Th>Email</Th>
            <Th>Role</Th>
            <Th>Actions</Th>
          </tr>
        </Thead>
        <tbody>
          {users?.map((user) => (
            <tr key={user.id}>
              <Td>{user.username}</Td>
              <Td>{user.email}</Td>{" "}
              <Td>{user.Roles.name}</Td>{" "}
              <Td>
                <div className="flex gap-4">
                  <a
                    href="#"
                    className="text-blue-500 underline"
                    onClick={() => handleEdit(user)}
                  >
                    Edit
                  </a>
                </div>
              </Td>
            </tr>
          ))}
        </tbody>
      </table>

      <EditModal
        isOpen={isModalOpen}
        userData={selectedUser}
        closeModal={() => setIsModalOpen(false)}
        onSave={handleSave}
      />
    </div>
  );
}
