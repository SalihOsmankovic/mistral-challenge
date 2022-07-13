import Link from "next/link";
import { User } from "pages";
import { FunctionComponent } from "react";
import { TableColumnProps, UserTableProps } from "./types";

const UserTable: FunctionComponent<UserTableProps> = ({ users }) => {
  const TableColumn: FunctionComponent<TableColumnProps> = ({ user }) => {
    return (
      <tr className="bg-white border-b">
        <td className="px-6 py-4">{user.id}</td>
        <td className="px-6 py-4">{user.first_name}</td>
        <td className="px-6 py-4">{user.last_name}</td>
        <td className="px-6 py-4">{user.username}</td>
        <td className="px-6 py-4">{user.email}</td>
        <td className="px-6 py-4">{user.status}</td>
        <td className="px-6 py-4 text-right">
          <Link href={`/${user.id}`}>
            <a className="font-medium text-blue-600 hover:underline">Edit</a>
          </Link>
        </td>
      </tr>
    );
  };

  const renderTableColumns = (user: User, index: number) => (
    <TableColumn key={index} user={user} />
  );

  return (
    <div className="relative overflow-x-auto shadow rounded-md">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th className="px-6 py-3">ID</th>
            <th className="px-6 py-3">First Name</th>
            <th className="px-6 py-3">Last Name</th>
            <th className="px-6 py-3">Username</th>
            <th className="px-6 py-3">Email</th>
            <th className="px-6 py-3">Status</th>
            <th className="px-6 py-3">
              <span className="sr-only">Edit</span>
            </th>
          </tr>
        </thead>
        <tbody>{users.map(renderTableColumns)}</tbody>
      </table>
    </div>
  );
};

export default UserTable;
