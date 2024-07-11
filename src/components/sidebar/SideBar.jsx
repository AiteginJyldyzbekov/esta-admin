import React from "react";
import css from "./SideBar.module.css";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import CommuteIcon from "@mui/icons-material/Commute";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logout } from "../../firebase/firebase";

const links = [
  {
    path: "/",
    title: "Каталог ",
    Icon: CommuteIcon,
  },
  {
    path: "/product",
    title: "Готовая продукция ",
    Icon: CommuteIcon,
  },
  {
    path: "/news",
    title: "Новости ",
    Icon: CommuteIcon,
  },
  {
    path: "/feedback",
    title: "Отзывы ",
    Icon: CommuteIcon,
  },
  {
    path: "/ad",
    title: "Реклама ",
    Icon: CommuteIcon,
  },
];

function SideBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const onLogout = () => {
    logout().then(() => navigate("/"))
  }
  return (
    <div className={css.wrapper}>
      <div className={css.logo}>Ago in style</div>
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
