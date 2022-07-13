import axios from "axios";
import Button from "components/Button";
import Input from "components/Input";
import Layout from "layouts/Layout";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { User } from "pages";
import { FormEvent, useState } from "react";

const New: NextPage = () => {
  const router = useRouter();

  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [firstNameError, setFirstNameError] = useState<string>("");
  const [lastNameError, setLastNameError] = useState<string>("");
  const [usernameError, setUsernameError] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [statusError, setStatusError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const { data } = await axios.post<User>(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users`,
        {
          firstName,
          lastName,
          username,
          email,
          status,
          password,
        }
      );

      router.push(`/${data.id}`);
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
            case "password":
              setPasswordError(message);
              break;
            default:
              break;
          }
        });
      }
    }

    setIsLoading(false);
  };

  return (
    <Layout title="New User" previousPage={{ href: "/", label: "Dashboard" }}>
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
          <Input
            label="Password"
            placeholder="****************"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            error={passwordError}
          />
        </div>
        <Button type="submit" isLoading={isLoading}>
          Create New User
        </Button>
      </form>
    </Layout>
  );
};

export default New;
