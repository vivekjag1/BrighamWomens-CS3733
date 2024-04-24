import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePickerProps } from "@mui/x-date-pickers/DateTimePicker";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("America/New_York");

const CustomDatePicker: React.FC<DateTimePickerProps<Dayjs>> = (props) => {
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateTimePicker
          label="Service Time *"
          className="bg-gray-50"
          {...props}
          sx={{
            width: "25rem",
            padding: 0,
            "& *": { fontFamily: "Poppins, sans-serif" },
            "& .MuiInputLabel-root": { fontFamily: "Poppins, sans-serif" },
            "& .MuiOutlinedInput-root": { fontFamily: "Poppins, sans-serif" },
            "& .MuiPickerStaticWrapper-staticWrapper": {
              fontFamily: "Poppins, sans-serif",
            },
            "& .MuiDateTimePickerToolbar-toolbar": {
              fontFamily: "Poppins, sans-serif",
            },
            "& .MuiPickersDay-day": { fontFamily: "Poppins, sans-serif" },
            "& .MuiPickersDay-daySelected": {
              fontFamily: "Poppins, sans-serif",
            },
            "& .MuiPickersDay-dayDisabled": {
              fontFamily: "Poppins, sans-serif",
            },
            "& .MuiPickersYear-yearSelected": {
              fontFamily: "Poppins, sans-serif",
            },
            "& .MuiPickersYear-yearDisabled": {
              fontFamily: "Poppins, sans-serif",
            },
          }}
        />
      </LocalizationProvider>
    </>
  );
};

export default CustomDatePicker;
