import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { useEffect, useState } from "react";
import { useprofileModalStore } from "../../store/store";
import { axiosInstance } from "../../api/axios";
import { userType } from "../../api/api";
import Modal from "../Modal/ProfileModal";
import default_profile from "../../asset/default_profile.png";

// 친구목록에 사용하는 리스트 MUI
export default function CheckboxListSecondary() {
  // 모달 창 store
  const { type, open, modal, close } = useprofileModalStore();
  const [x, setX] = useState(0);
  const [onlineFullname, setOnlineFullname] = useState("");
  const [onlineCoverImg, setOnlineCoverImg] = useState("");
  const [onlineId, setOnlineId] = useState("");

  const handleItemClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    fullname: string,
    coverImg: string,
    id: string
  ) => {
    setOnlineFullname(() => fullname);
    setOnlineCoverImg(() => coverImg);
    setOnlineId(() => id);

    const rect = e.currentTarget.getBoundingClientRect();
    if (!modal) {
      open("list");
    } else {
      close();
      setTimeout(() => {
        open("list");
      }, 100);
    }
    setX(Math.floor(rect.top + window.scrollY) - 270);
  };

  const styles = {
    list: {
      width: "100%",
      maxWidth: 400,
      position: "relative",
      overflow: "auto",
      maxHeight: 180,
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
    const onlineUserData = await await axiosInstance.get(
      `${import.meta.env.VITE_API_URL}/users/online-users`
    );
    setOnlineUser(onlineUserData.data);
  };

  useEffect(() => {
    getOnlineUser();
    const onlineUserInterval = setInterval(() => {
      getOnlineUser();
    }, 5000);

    return () => clearInterval(onlineUserInterval);
  }, []);

  return (
    <div className="relative  mt-2">
      <List id="mainListModal" dense sx={styles.list}>
        {onlineUser.map((value) => {
          const labelId = `checkbox-list-secondary-label-${value._id}`;

          if (value.username && typeof value.username === "string")
            value.username = JSON.parse(value.username);

          return (
            <ListItem key={value._id} disablePadding>
              <ListItemButton
                key={value._id}
                onClick={(e) => {
                  e.stopPropagation();
                  handleItemClick(
                    e,
                    value.fullName,
                    value.image ? value.image : default_profile,
                    value._id
                  );
                }}
              >
                <ListItemAvatar>
                  <Avatar
                    alt={`Avatar n°${value._id + 1}`}
                    src={
                      value.image
                        ? value.image
                        : `/src/asset/default_profile.png`
                    }
                    className="relative"
                  />
                  <article className="w-[10px] h-[10px] rounded-full bg-green-500 absolute bottom-[10px]"></article>
                </ListItemAvatar>
                <ListItemText
                  id={labelId}
                  sx={{
                    "& .MuiListItemText-primary": {
                      fontWeight: "bold",
                      fontFamily: "S-CoreDream-3Light",
                    },
                    "& .MuiListItemText-secondary": {
                      fontFamily: "S-CoreDream-3Light",
                    },
                  }}
                  primary={
                    value.username
                      ? typeof value.username !== "string" &&
                        value.username?.username
                      : "유저"
                  }
                  secondary={value.fullName}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
      {modal && type === "list" && (
        <Modal
          y={-42}
          x={x}
          onlineFullname={onlineFullname}
          onlineCoverImg={onlineCoverImg}
          onlineId={onlineId}
        />
      )}
    </div>
  );
}
