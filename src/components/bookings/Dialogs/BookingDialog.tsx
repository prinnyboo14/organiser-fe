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
import { useEffect, useState } from "react";

import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import { defaultBookingValues } from "@/domain/bookings/bookingDefaults";
import { red } from "@mui/material/colors";
import { useForm } from "react-hook-form";
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
  const { register, handleSubmit, reset } = useForm<BookingSchemaType>({
    resolver: zodResolver(bookingSchema),
    defaultValues: defaultBookingValues,
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (open) reset(initialValues ?? defaultBookingValues);
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
        onSubmit={handleSubmit(onSave)}
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
