import axios from "axios";
import { FC, useState } from "react";

const Authentication: FC = () => {
  const [username, setUsername] = useState<string>();
  const [password, setPassword] = useState<string>();

  const handleLogin = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/v1/auth/login", {
        username,
        password,
      });

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <label htmlFor="username"></label>
        <input
          type="text"
          name="username"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setUsername(e.target.value)
          }
        />
        <label htmlFor="password"></label>
        <input
          type="text"
          name="password"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
        />
        <button type="submit"> Login </button>
      </form>
    </div>
  );
};

export default Authentication;
