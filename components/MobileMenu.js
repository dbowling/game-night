import { IconButton, Menu, MenuItem } from "@material-ui/core";
import { Menu as MenuIcon } from "@material-ui/icons";
import { useRouter } from "next/router";
import React, { Fragment, useState } from "react";

const MobileMenu = ({ session, userLinks, adminLinks, signOut }) => {
  const router = useRouter();
  // https://material-ui.com/components/app-bar/#app-bar-with-menu
  const [anchorEl, setAnchorEl] = useState(null);
  const isMobileMenuOpen = Boolean(anchorEl);
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  return (
    <Fragment>
      <IconButton
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={handleMenuOpen}
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={isMobileMenuOpen}
        onClose={handleMenuClose}
      >
        {session?.user.id && (
          <div>
            {userLinks.map(({ url, title }, index) => (
              <MenuItem
                key={index}
                onClick={() => {
                  handleMenuClose();
                  router.push(url);
                }}
              >
                {title}
              </MenuItem>
            ))}
            <MenuItem
              onClick={() => {
                handleMenuClose();
                signOut();
              }}
            >
              Log Out
            </MenuItem>
          </div>
        )}
        {/* TODO: Protect admin link routes */}
        {adminLinks.map(({ title, url }, index) => (
          <MenuItem
            key={index}
            onClick={() => {
              handleMenuClose();
              router.push(url);
            }}
          >
            {title}
          </MenuItem>
        ))}
        {!session && (
          <MenuItem
            onClick={() => {
              handleClose();
              router.push("/auth/login");
            }}
          >
            Login/Register
          </MenuItem>
        )}
      </Menu>
    </Fragment>
  );
};

export default MobileMenu;