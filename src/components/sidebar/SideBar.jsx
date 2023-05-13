import React from "react";
import css from "./SideBar.module.css";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import CommuteIcon from "@mui/icons-material/Commute";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link, useLocation } from "react-router-dom";
import { logout } from "../../firebase/firebase";

const links = [
  {
    path: "/",
    title: "Услуги по web разработке ",
    Icon: CommuteIcon,
  },
  {
    path: "/designService",
    title: "Услуги по ux/ui design ",
    Icon: CommuteIcon,
  },
  {
    path: "/mobileService",
    title: "Услуги по мобильной разработке ",
    Icon: CommuteIcon,
  },
  {
    path: "/mvpService",
    title: "Услуги по разработке MVP",
    Icon: CommuteIcon,
  },
  {
    path: "/chatService",
    title: "Услуги по разработке чатов",
    Icon: CommuteIcon,
  },
  {
    path: "/technologies",
    title: "Технологии",
    Icon: CommuteIcon,
  },
  {
    path: "/feedback",
    title: "Отзывы",
    Icon: CommuteIcon,
  },
  {
    path: "/our-team",
    title: "Коллектив",
    Icon: CommuteIcon,
  },
  {
    path: "/projects",
    title: "Проекты",
    Icon: CommuteIcon,
  },
];

function SideBar() {
  const location = useLocation();
  const onLogout = () => {
    logout()
  }
  return (
    <div className={css.wrapper}>
      <div className={css.logo}>Solid devs</div>
      <List>
        {links.map(({ path, title, Icon }) => (
          <ListItem
            key={path}
            selected={path === location.pathname}
            classes={{ selected: css.selected }}
            disablePadding
            component={Link}
            to={path}
          >
            <ListItemButton>
              <ListItemIcon>
                <Icon style={path === location.pathname ? { color: '#fff' } : {}} />
              </ListItemIcon>
              <ListItemText primary={title} />
            </ListItemButton>
          </ListItem>
        ))}
        <br />
        <br />
        <ListItem disablePadding onClick={onLogout}>
          <ListItemButton>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary={"Выйти"} />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );
}

export default SideBar;
