import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { useprofileModalStore } from "../../store/store";
import Modal from "../Modal/ProfileModal";

// 친구목록에 사용하는 리스트 MUI
export default function CheckboxListSecondary() {
  const [checked, setChecked] = React.useState([1]);

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
  const [x, setX] = React.useState(0);
  const type = useprofileModalStore((s) => s.type);
  const open = useprofileModalStore((s) => s.open);

  const handleItemClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    open("list");
    setX(Math.floor(rect.top + window.scrollY) - 295);
  };
  return (
    <div className="relative ">
      <List
        id="mainListModal"
        dense
        sx={{
          width: "100%",
          maxWidth: 360,
          bgcolor: "background.paper",
          height: 205,
          overflowY: "scroll",
        }}
      >
        {[0, 1, 2, 3, 4, 5].map((value) => {
          const labelId = `checkbox-list-secondary-label-${value}`;
          return (
            <ListItem
              key={value}
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
                onClick={(e) => {
                  e.stopPropagation();
                  handleItemClick(e);
                }}
              >
                <ListItemAvatar>
                  <Avatar
                    alt={`Avatar n°${value + 1}`}
                    src={`/static/images/avatar/${value + 1}.jpg`}
                  />
                </ListItemAvatar>
                <ListItemText id={labelId} primary={`Line item ${value + 1}`} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
      {type === "list" && <Modal y={-19} x={x} />}
    </div>
  );
}
