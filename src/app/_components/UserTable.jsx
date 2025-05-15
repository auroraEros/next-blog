// components/UserTable.jsx
'use client';
import { Table } from 'flowbite-react';
import { FaCheck, FaTimes } from 'react-icons/fa';

export default function UserTable({ users }) {
  return (
    <Table hoverable className="shadow-md">
      <Table.Head>
        <Table.HeadCell>Date created</Table.HeadCell>
        <Table.HeadCell>User image</Table.HeadCell>
        <Table.HeadCell>Username</Table.HeadCell>
        <Table.HeadCell>Email</Table.HeadCell>
        <Table.HeadCell>Admin</Table.HeadCell>
      </Table.Head>
      <Table.Body className="divide-y">
        {users.map((user) => (
          <Table.Row key={user._id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell>
              {new Date(user.createdAt).toLocaleDateString()}
            </Table.Cell>
            <Table.Cell>
              <img
                src={user.profilePicture}
                alt={user.username}
                className="w-10 h-10 object-cover bg-gray-500 rounded-full"
              />
            </Table.Cell>
            <Table.Cell>{user.username}</Table.Cell>
            <Table.Cell>{user.email}</Table.Cell>
            <Table.Cell>
              {user.isAdmin ? (
                <FaCheck className="text-green-500" />
              ) : (
                <FaTimes className="text-red-500" />
              )}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}