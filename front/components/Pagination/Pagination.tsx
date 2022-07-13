import Link from "next/link";
import { useRouter } from "next/router";
import { FunctionComponent } from "react";
import { PaginationProps } from "./types";

const Pagination: FunctionComponent<PaginationProps> = ({
  className,
  paginationData,
}) => {
  const router = useRouter();
  const { order_by = "" } = router.query;

  return (
    <div className={className}>
      {paginationData.previous_page_url && (
        <Link
          href={`${paginationData.previous_page_url}${
            order_by && `&order_by=${order_by}`
          }`}
        >
          <a className="cursor-pointer inline-flex items-center py-2 px-4 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700">
            Previous
          </a>
        </Link>
      )}
      {paginationData.next_page_url && (
        <Link
          href={`${paginationData.next_page_url}${
            order_by && `&order_by=${order_by}`
          }`}
        >
          <a className="cursor-pointer inline-flex items-center py-2 px-4 ml-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700">
            Next
          </a>
        </Link>
      )}
    </div>
  );
};

export default Pagination;
