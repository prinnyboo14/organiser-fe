import {
  BookingSchemaType,
  bookingSchema,
} from "@/domain/bookings/bookingSchema";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useEffect, useState } from "react";

import CloseIcon from "@mui/icons-material/Close";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { DurationPicker } from "@/components/utils/DurationPicker";
import EditIcon from "@mui/icons-material/Edit";
import dayjs from "dayjs";
import { defaultBookingValues } from "@/domain/bookings/bookingDefaults";
import { red } from "@mui/material/colors";
import { zodResolver } from "@hookform/resolvers/zod";

interface BookingDialogProps {
  open: boolean;
  onClose: () => void;
  initialValues?: BookingSchemaType;
  onSave: (data: BookingSchemaType) => void;
}

export const BookingDialog = ({
  open,
  onClose,
  onSave,
  initialValues,
}: BookingDialogProps) => {
  const { register, handleSubmit, reset, control } = useForm<BookingSchemaType>(
    {
      resolver: zodResolver(bookingSchema),
      defaultValues: defaultBookingValues,
    }
  );

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (open)
      reset(
        initialValues
          ? {
              ...initialValues,
              bookingDate: new Date(initialValues.bookingDate),
              estimatedDuration: initialValues.estimatedDuration ?? 0,
            }
          : defaultBookingValues
      );
  }, [open, initialValues, reset]);

  const handleCancel = () => {
    reset(initialValues ?? defaultBookingValues);
    setIsEditing(false);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <div className="flex justify-end p-2">
        <Button
          type="button"
          variant="outlined"
          onClick={handleCancel}
          sx={{ borderColor: red[500] }}
        >
          <CloseIcon className="text-red-500" />
        </Button>
      </div>
      <DialogTitle>Booking</DialogTitle>
      <form
        onSubmit={handleSubmit((data) => {
          onSave(data);
        })}
        className="flex flex-col space-y-4 p-4"
      >
        <DialogContent className="flex flex-col space-y-4">
          <div className="bg-gray-50 rounded-md p-2">
            <TextField
              label="Service"
              {...register("service")}
              disabled={!isEditing}
              fullWidth
              className="bg-gray-50 rounded-md p-2"
            />
          </div>
          <div className="bg-gray-50 rounded-md p-2">
            <TextField
              label="Notes"
              {...register("notes")}
              disabled={!isEditing}
              fullWidth
              multiline
              minRows={3}
            />
          </div>
          <div className="bg-gray-50 rounded-md p-2">
            <Controller
              name="bookingDate"
              control={control}
              render={({ field }) => (
                <DateTimePicker
                  label="Booking Date"
                  value={field.value ? dayjs(field.value) : null}
                  onChange={(newValue) =>
                    field.onChange(newValue?.toDate() ?? null)
                  }
                  disabled={!isEditing}
                  slotProps={{ textField: { fullWidth: true } }}
                  format="DD/MM/YYYY HH:mm"
                />
              )}
            />
          </div>
          <div className="bg-gray-50 rounded-md p-2">
            <Controller
              name="estimatedDuration"
              control={control}
              render={({ field }) => {
                const value = field.value ?? 0;
                const hours = Math.floor(value / 60);
                const minutes = value % 60;
                return (
                  <DurationPicker
                    hours={hours}
                    minutes={minutes}
                    onChange={(hour, minute) =>
                      field.onChange(hour * 60 + minute)
                    }
                    disabled={!isEditing}
                  />
                );
              }}
            />
          </div>
        </DialogContent>

        {isEditing && (
          <div className="flex justify-center">
            <Button
              type="submit"
              variant="outlined"
              sx={{ minWidth: 120, borderRadius: 1 }}
            >
              Save
            </Button>
          </div>
        )}
      </form>
      {!isEditing && (
        <div className="flex justify-center p-2">
          <Button
            type="button"
            variant="outlined"
            sx={{ minWidth: 80, borderRadius: 1 }}
            onClick={() => setIsEditing(true)}
          >
            <EditIcon />
          </Button>
        </div>
      )}
    </Dialog>
  );
};
