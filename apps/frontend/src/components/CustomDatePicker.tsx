import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
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
        <DemoContainer
          components={["DateTimePicker"]}
          sx={{ width: "25rem", paddingBottom: ".3rem" }}
        >
          <DateTimePicker
            label="Service Time *"
            className="bg-gray-50"
            {...props}
          />
        </DemoContainer>
      </LocalizationProvider>
    </>
  );
};

export default CustomDatePicker;
