import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

interface DurationPickerProps {
  hours: number;
  minutes: number;
  onChange: (hours: number, minutes: number) => void;
  disabled: boolean;
}

export const DurationPicker = ({
  hours,
  minutes,
  onChange,
  disabled,
}: DurationPickerProps) => {
  const hourOptions = Array.from({ length: 24 }, (_, i) => i);
  const minuteOptions = [0, 15, 30, 45];

  return (
    <div className="flex space-x-2 items-center">
      <FormControl size="small">
        <InputLabel>Hours</InputLabel>
        <Select
          value={hours}
          label="Hours"
          onChange={(e) => onChange(Number(e.target.value), minutes)}
          disabled={disabled}
        >
          {hourOptions.map((h) => (
            <MenuItem key={h} value={h}>
              {h}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl size="small">
        <InputLabel>Minutes</InputLabel>
        <Select
          value={minutes}
          label="Minutes"
          onChange={(e) => onChange(hours, Number(e.target.value))}
          disabled={disabled}
        >
          {minuteOptions.map((m) => (
            <MenuItem key={m} value={m}>
              {m}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};
