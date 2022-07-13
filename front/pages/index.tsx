import axios from "axios";
import Button from "components/Button";
import Pagination, { PaginationData } from "components/Pagination";
import UserTable from "components/UserTable";
import Layout from "layouts/Layout";
import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { FunctionComponent, useEffect, useState } from "react";

export type User = {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  status: string;
};

const Home: NextPage = () => {
  const router = useRouter();
  const { page = 1, order_by = "id" } = router.query;

  const [users, setUsers] = useState<User[]>([]);
  const [paginationData, setPaginationData] = useState<PaginationData>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  type GetUsersResponse = {
    data: User[];
    meta: PaginationData;
  };

  useEffect(() => {
    const fetcher = async () => {
      setIsLoading(true);

      const {
        data: { data, meta },
      } = await axios.get<GetUsersResponse>(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users?page=${page}&order_by=${order_by}`
      );

      setUsers(data);
      setPaginationData(meta);
      setIsLoading(false);
    };
    fetcher();
  }, [page, order_by]);

  const SortDropdown: FunctionComponent = () => {
    return (
      <div className="relative">
        <Button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
          Sort by
        </Button>
        <div
          id="dropdown"
          className={`absolute top-12 left-0 z-10 bg-white divide-y divide-gray-100 rounded shadow w-44 ${
            !isDropdownOpen && "hidden"
          }`}
          onClick={() => setIsDropdownOpen(false)}
        >
          <ul
            className="py-1 text-sm text-gray-700"
            aria-labelledby="dropdownDefault"
          >
            <li>
              <Link href="/?order_by=id">
                <a className="block px-4 py-2 hover:bg-gray-100">ID</a>
              </Link>
            </li>
            <li>
              <Link href="/?order_by=first_name">
                <a className="block px-4 py-2 hover:bg-gray-100">First Name</a>
              </Link>
            </li>
            <li>
              <Link href="/?order_by=last_name">
                <a className="block px-4 py-2 hover:bg-gray-100">Last Name</a>
              </Link>
            </li>
            <li>
              <Link href="/?order_by=username">
                <a className="block px-4 py-2 hover:bg-gray-100">Username</a>
              </Link>
            </li>
            <li>
              <Link href="/?order_by=email">
                <a className="block px-4 py-2 hover:bg-gray-100">Email</a>
              </Link>
            </li>
            <li>
              <Link href="/?order_by=status">
                <a className="block px-4 py-2 hover:bg-gray-100">Status</a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    );
  };

  return (
    <Layout title="Dashboard" isLoading={isLoading}>
      <div className="flex w-full mb-3">
        <SortDropdown />
        <Link href="/new">
          <a className="ml-auto">
            <Button>Creact New</Button>
          </a>
        </Link>
      </div>
      <UserTable users={users} />
      <div className="w-full flex mt-3">
        {paginationData && (
          <Pagination paginationData={paginationData} className="ml-auto" />
        )}
      </div>
    </Layout>
  );
};

export default Home;
