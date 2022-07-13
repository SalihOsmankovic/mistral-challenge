import { NextPage } from "next";
import { useRouter } from "next/router";
import axios from "axios";
import Button from "components/Button";
import Input from "components/Input";
import Layout from "layouts/Layout";
import { FormEvent, useEffect, useState } from "react";
import { User } from "pages";
import Modal from "components/Modal/Modal";

const Edit: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [status, setStatus] = useState<string>("");

  const [firstNameError, setFirstNameError] = useState<string>("");
  const [lastNameError, setLastNameError] = useState<string>("");
  const [usernameError, setUsernameError] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [statusError, setStatusError] = useState<string>("");

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingUser, setIsLoadingUser] = useState<boolean>(true);
  const [isLoadingDelete, setIsLoadingDelete] = useState<boolean>(false);

  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetcher = async () => {
      setIsLoadingUser(true);

      const { data } = await axios.get<User>(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/${id}`
      );

      setFirstName(data.first_name);
      setLastName(data.last_name);
      setUsername(data.username);
      setEmail(data.email);
      setStatus(data.status);

      setIsLoadingUser(false);
    };
    id && fetcher();
  }, [id]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${id}`, {
        firstName,
        lastName,
        username,
        email,
        status,
      });

      setIsSuccessModalOpen(true);
    } catch (error: any) {
      if (error.response) {
        const {
          data: { errors },
        } = error.response;

        errors.map(({ field, message }: { field: string; message: string }) => {
          switch (field) {
            case "firstName":
              setFirstNameError(message);
              break;
            case "lastName":
              setLastNameError(message);
              break;
            case "username":
              setUsernameError(message);
              break;
            case "email":
              setEmailError(message);
              break;
            case "status":
              setStatusError(message);
              break;
            default:
              break;
          }
        });
      }
    }

    setIsLoading(false);
  };

  const deleteUser = async () => {
    setIsLoadingDelete(true);

    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${id}`);
      router.push("/");
    } catch (error) {
      throw error;
    }

    setIsLoadingDelete(false);
    setIsDeleteModalOpen(false);
  };

  return (
    <Layout
      title={`Edit User: #${id}`}
      previousPage={{ href: "/", label: "Dashboard" }}
      isLoading={isLoadingUser}
    >
      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 mb-6 lg:grid-cols-2">
          <Input
            label="First Name"
            placeholder="John"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
            error={firstNameError}
          />
          <Input
            label="Last Name"
            placeholder="Doe"
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
            error={lastNameError}
          />
          <Input
            label="Username"
            placeholder="john.doe"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            error={usernameError}
          />
          <Input
            label="Email"
            placeholder="john@doe.com"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            error={emailError}
          />
          <Input
            label="Status"
            placeholder="Active"
            value={status}
            onChange={(event) => setStatus(event.target.value)}
            error={statusError}
          />
        </div>
        <div className="w-full flex">
          <Button type="submit" isLoading={isLoading}>
            Submit changes
          </Button>
          <Button
            onClick={() => setIsDeleteModalOpen(true)}
            className="bg-red-500 text-white hover:bg-red-600 ml-3"
          >
            Delete User
          </Button>
        </div>
      </form>
      <Modal isOpen={isSuccessModalOpen} setIsOpen={setIsSuccessModalOpen}>
        Changes saved successfully
      </Modal>
      <Modal isOpen={isDeleteModalOpen} setIsOpen={setIsDeleteModalOpen}>
        <p>Are you sure you want to delete this user?</p>
        <br />
        <Button
          isLoading={isLoadingDelete}
          onClick={deleteUser}
          className="bg-red-500 text-white hover:bg-red-600 mx-auto"
        >
          Delete User
        </Button>
      </Modal>
    </Layout>
  );
};

export default Edit;
