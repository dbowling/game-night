import {
  AppBar,
  Button,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import { styled, useTheme } from "@material-ui/core/styles";
import { signIn, signOut, useSession } from "next-auth/client";
import Link from "next/link";
import React, { Fragment } from "react";
import MobileMenu from "./MobileMenu";

const Title = styled(Typography)({
  flexGrow: 1,
  textDecoration: "none",
  color: "white",
  fontWeight: 700,
  fontSize: "1.5rem",
});

const StyledAppBar = styled(AppBar)({
  marginBottom: "2rem",
});

const adminLinks = [];

const userLinks = [
  {
    title: "Home",
    url: "/",
  },
  {
    title: "Events",
    url: "/events",
  },
  {
    title: "My Profile",
    url: "/profile",
  },
  {
    title: "Games",
    url: "/games",
  },
];

const MainAppBar = () => {
  const [session] = useSession();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

  return (
    <StyledAppBar position="sticky">
      <Toolbar>
        <Link href="/" passHref>
          <Title component={"a"}>Game Night</Title>
        </Link>
        {isMobile && (
          <MobileMenu
            session={session}
            userLinks={userLinks}
            adminLinks={adminLinks}
            signIn={signIn}
            signOut={signOut}
          />
        )}
        {!isMobile && !session && (
          <Button color="inherit" onClick={signIn}>
            Login
          </Button>
        )}
        {/* User links */}
        {!isMobile && session && (
          <Fragment>
            {userLinks.map(({ title, url }) => (
              <Link key={title} href={url}>
                <Button color="inherit">{title}</Button>
              </Link>
            ))}
            <Button
              color="inherit"
              onClick={() => {
                signOut({ callbackUrl: process.env.BASE_URL });
              }}
            >
              Log Out
            </Button>
          </Fragment>
        )}
        {/* Admin links */}
        {/* TODO: Secure admin routes on client and server side*/}
        {!isMobile &&
          adminLinks.map(({ title, url }) => (
            <Link key={title} href={url}>
              <Button color="inherit">{title}</Button>
            </Link>
          ))}
      </Toolbar>
    </StyledAppBar>
  );
};

export default MainAppBar;
