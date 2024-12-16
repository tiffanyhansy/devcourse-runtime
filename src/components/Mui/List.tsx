import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { useprofileModalStore } from "../../store/store";
import Modal from "../Modal/ProfileModal";
import { BorderBottom } from "@mui/icons-material";
import { axiosInstance } from "../../api/axios";
import { useEffect, useState } from "react";
import { userType } from "../../api/api";

// 친구목록에 사용하는 리스트 MUI
export default function CheckboxListSecondary() {
  const [checked, setChecked] = useState([1]);

  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };
  // 모달 창 store
  const { type, open, modal, close } = useprofileModalStore();
  const [x, setX] = useState(0);

  const handleItemClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    if (!modal) {
      open("list");
    } else {
      close();
      setTimeout(() => {
        open("list");
      }, 100);
    }
    console.log(useprofileModalStore.getState());
    setX(Math.floor(rect.top + window.scrollY) - 270);
  };

  const styles = {
    list: {
      width: "100%",
      maxWidth: 360,
      bgcolor: "background.paper",
      position: "relative",
      overflow: "auto",
      maxHeight: 205,
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
      "& ul": { padding: 0 },
      /* 스크롤바 스타일 수정 */
      "&::-webkit-scrollbar": {
        width: "0px",
      },
      "&:hover::-webkit-scrollbar": {
        width: "8px",
      },
      "&::-webkit-scrollbar-track": {
        background: "#f1f1f1",
      },
      "&::-webkit-scrollbar-thumb": {
        background: "#888",
      },
      "&::-webkit-scrollbar-thumb:hover": {
        background: "#555",
      },
    },
  };

  const [onlineUser, setOnlineUser] = useState<userType[] | []>([]);
  const getOnlineUser = async () => {
    const onlineUserData = await axiosInstance.get(
      `${import.meta.env.VITE_API_URL}/users/online-users`
    );
    console.log(onlineUserData.data);
    setOnlineUser(onlineUserData.data);
  };

  useEffect(() => {
    getOnlineUser();
  }, []);

  return (
    <div className="relative ">
      <List id="mainListModal" dense sx={styles.list}>
        {onlineUser.map((value) => {
          const labelId = `checkbox-list-secondary-label-${value._id}`;
          return (
            <ListItem
              key={value._id}
              // secondaryAction={
              //   <Checkbox
              //     edge="end"
              //     onChange={handleToggle(value)}
              //     checked={checked.includes(value)}
              //     inputProps={{ "aria-labelledby": labelId }}
              //   />
              // }
              disablePadding
            >
              <ListItemButton
                key={value._id}
                onClick={(e) => {
                  e.stopPropagation();
                  handleItemClick(e);
                }}
              >
                <ListItemAvatar>
                  <Avatar
                    alt={`Avatar n°${value._id + 1}`}
                    src={`/static/images/avatar/${value._id + 1}.jpg`}
                  />
                </ListItemAvatar>
                <ListItemText id={labelId} primary={`${value.fullName}`} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
      {modal && type === "list" && <Modal y={-42} x={x} />}
    </div>
  );
}
