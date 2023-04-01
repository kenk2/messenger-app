import useLogin from "@customHooks/useLogin";
import { Button, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { faker } from "@faker-js/faker";
import { User } from "@customTypes/users";
import { useEffect } from "react";

type ILogin = {
  onLogin: (user: User) => void;
};

export default function LoginScreen(props: ILogin) {
  const { existingUser, query } = useLogin();
  const { onLogin } = props;

  useEffect(() => {
    if (existingUser) {
      onLogin(existingUser);
    }
  }, [existingUser, onLogin]);

  const createUser = async () => {
    const newUser: User = {
      userId: faker.datatype.number(),
      userName: faker.internet.userName(),
      avatar: faker.internet.avatar(),
    };

    await query.mutate(newUser);
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        marginTop: "30%",
      }}
    >
      <Typography>Welcome to the Messenger App!</Typography>
      <Button
        variant="contained"
        color="success"
        sx={{ marginTop: "8px" }}
        onClick={createUser}
        disabled={query.isLoading}
      >
        Login as Guest
      </Button>
    </Box>
  );
}
