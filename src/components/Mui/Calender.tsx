import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers";

export default function BasicDateCalendar() {
  const Styles = {
    list: {
      width: "100%",
      borderRadius: "10px",
      bgcolor: "#F0F5F8",
      "& .MuiPickersDay-root.Mui-selected": {
        backgroundColor: "#7EACB5 !important",
        "&:hover": {
          backgroundColor: "#7EACB5 ",
        },
      },
      "& .MuiPickersDay-root:focus": {
        backgroundColor: "#7EACB5 !important",
        "&:hover": {
          backgroundColor: "#7EACB5 !important",
        },
      },
      "& .MuiPickersDay-today": {},
      "& .MuiPickersYear-yearButton.Mui-selected": {
        backgroundColor: "#7EACB5 !important",
      },
    },
  };

  return (
    <article className="shadow-2xl rounded-[10px]">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar sx={Styles.list} />
      </LocalizationProvider>
    </article>
  );
}
