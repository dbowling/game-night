import { Button, TextField } from "@material-ui/core";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/User";
import useUser from "../util/useUser";

const LoginForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const { loginUser } = useContext(UserContext);

  const [user] = useUser();

  useEffect(() => {
    if (user) router.push("/");
  }, [user]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsFetching(true);
    loginUser(email, password);
  };

  return (
    <form onSubmit={handleLogin}>
      <TextField
        name="email"
        required
        id="email"
        label="Email"
        placeholder="Enter email"
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
        variant="outlined"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        name="password"
        required
        type="password"
        id="password"
        label="Password"
        placeholder="Enter password"
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
        variant="outlined"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button
        type="submit"
        size="large"
        fullWidth
        color="secondary"
        variant="contained"
        disabled={isFetching}
      >
        Log In
      </Button>
    </form>
  );
};

export default LoginForm;
