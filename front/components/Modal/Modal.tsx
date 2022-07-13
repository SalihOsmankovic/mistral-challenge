import { FunctionComponent } from "react";
import { ModalProps } from "./types";

const Modal: FunctionComponent<ModalProps> = ({
  children,
  isOpen = false,
  setIsOpen,
}) => {
  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 w-screen h-screen overflow-x-hidden overflow-y-auto flex bg-black bg-opacity-50 ${
        !isOpen && "hidden"
      }`}
    >
      <div className="relative w-full max-w-md p-4 m-auto">
        <div className="relative bg-white rounded-lg shadow">
          <button
            type="button"
            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
            data-modal-toggle="popup-modal"
            onClick={() => setIsOpen(false)}
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
          <div className="p-6 text-center">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
