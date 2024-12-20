import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers";

export default function BasicDateCalendar() {
  const Styles = {
    list: {
      width: "100%",
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
      "& .MuiPickersDay-today": {
        backgroundColor: "#7EACB5 ",
      },
      "& .MuiPickersYear-yearButton.Mui-selected": {
        backgroundColor: "#7EACB5 ",
      },
    },
  };

  return (
    <article className="rounded-[10px]">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div className="w-full bg-[#F0F5F8] rounded-[30px]">
          <DateCalendar sx={Styles.list} />
        </div>
      </LocalizationProvider>
    </article>
  );
}
