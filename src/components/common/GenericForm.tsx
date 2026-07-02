import { type ChangeEvent, type FormEvent, useId, useMemo, useRef } from "react";
import UploadFileRoundedIcon from "@mui/icons-material/UploadFileRounded";
import {
  Box,
  Button,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { entranceSx, hoverLiftSx } from "../../theme/animations";

export type GenericFormFieldOption = {
  label: string;
  value: string;
};

export type GenericFormField<TValues extends Record<string, unknown>> = {
  accept?: string;
  helperText?: string;
  label: string;
  name: keyof TValues;
  options?: GenericFormFieldOption[];
  placeholder?: string;
  required?: boolean;
  rows?: number;
  span?: 1 | 2;
  type?: "date" | "email" | "file" | "number" | "select" | "text" | "textarea";
};

type GenericFormProps<TValues extends Record<string, unknown>> = {
  cancelLabel?: string;
  cancelOnLeft?: boolean;
  fields: GenericFormField<TValues>[];
  onCancel: () => void;
  onChange: <K extends keyof TValues>(name: K, value: TValues[K]) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  submitLabel?: string;
  subtitle?: string;
  submitting?: boolean;
  title?: string;
  values: TValues;
  errors?: Partial<Record<keyof TValues, string>>;
};

export function GenericForm<TValues extends Record<string, unknown>>({
  cancelLabel = "Cancel",
  cancelOnLeft = true,
  fields,
  onCancel,
  onChange,
  onSubmit,
  submitLabel = "Save",
  subtitle,
  submitting = false,
  title,
  values,
  errors,
}: GenericFormProps<TValues>) {
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});
  const formId = useId();

  const gridTemplateColumns = useMemo(
    () => ({
      xs: "1fr",
      md: "repeat(2, minmax(0, 1fr))",
    }),
    [],
  );

  return (
    <Paper
      component="form"
      onSubmit={onSubmit}
      sx={[
        {
          border: "1px solid rgba(21, 101, 192, 0.12)",
          borderRadius: 2,
          boxShadow: "0 12px 30px rgba(13, 71, 161, 0.08)",
          p: { xs: 2, md: 3 },
        },
        hoverLiftSx,
        entranceSx(70),
      ]}
      noValidate
    >
      <Stack spacing={0.75}>
        {title ? (
          <Typography component="h3" variant="h6">
            {title}
          </Typography>
        ) : null}
        {subtitle ? (
          <Typography color="text.secondary" variant="body2">
            {subtitle}
          </Typography>
        ) : null}
      </Stack>

      <Box
        sx={{
          display: "grid",
          gap: 2,
          gridTemplateColumns,
          mt: 3,
        }}
      >
        {fields.map((field, fieldIndex) => {
          const fieldId = `${formId}-${String(field.name)}`;
          const fieldValue = values[field.name];
          const fieldError = errors?.[field.name];
          const isFullWidth = field.span === 2;

          if (field.type === "file") {
            const fileName =
              fieldValue instanceof File ? fieldValue.name : typeof fieldValue === "string" ? fieldValue : "";

            return (
              <Box
                key={fieldId}
                sx={[
                  {
                    gridColumn: isFullWidth ? { md: "1 / -1" } : undefined,
                  },
                  entranceSx(120 + fieldIndex * 28),
                ]}
              >
                <Stack spacing={1}>
                  <Typography sx={{ fontWeight: 700 }}>
                    {field.label}
                    {field.required ? " *" : null}
                  </Typography>
                  <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={1.5}
                    sx={{ alignItems: { xs: "stretch", sm: "center" } }}
                  >
                    <Button
                      component="label"
                      startIcon={<UploadFileRoundedIcon />}
                      variant="outlined"
                    >
                      Upload file
                      <input
                        hidden
                        accept={field.accept}
                        id={fieldId}
                        ref={(node) => {
                          fileInputRefs.current[String(field.name)] = node;
                        }}
                        type="file"
                        onChange={(event) => {
                          const selectedFile = event.target.files?.[0] ?? null;
                          onChange(field.name, selectedFile as TValues[typeof field.name]);
                        }}
                      />
                    </Button>
                    <Typography color={fileName ? "text.primary" : "text.secondary"} variant="body2">
                      {fileName || "No file selected"}
                    </Typography>
                    {fieldValue ? (
                      <Button
                        onClick={() => {
                          const input = fileInputRefs.current[String(field.name)];
                          if (input) {
                            input.value = "";
                          }
                          onChange(field.name, null as TValues[typeof field.name]);
                        }}
                        size="small"
                        variant="text"
                      >
                        Remove
                      </Button>
                    ) : null}
                  </Stack>
                  {fieldError ? (
                    <Typography color="error" variant="caption">
                      {fieldError}
                    </Typography>
                  ) : field.helperText ? (
                    <Typography color="text.secondary" variant="caption">
                      {field.helperText}
                    </Typography>
                  ) : null}
                </Stack>
              </Box>
            );
          }

          const commonTextFieldProps = {
            fullWidth: true,
            id: fieldId,
            label: field.label,
            placeholder: field.placeholder,
            required: field.required,
            value:
              typeof fieldValue === "string" || typeof fieldValue === "number"
                ? fieldValue
                : fieldValue === null || fieldValue === undefined
                  ? ""
                  : String(fieldValue),
            onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
              const nextValue = event.target.value;
              onChange(field.name, nextValue as TValues[typeof field.name]);
            },
            error: Boolean(fieldError),
            helperText: fieldError ?? field.helperText,
            size: "small" as const,
          };

          return (
            <Box
              key={fieldId}
              sx={[
                {
                  gridColumn: isFullWidth ? { md: "1 / -1" } : undefined,
                },
                entranceSx(120 + fieldIndex * 28),
              ]}
            >
              {field.type === "select" ? (
                <TextField select {...commonTextFieldProps}>
                  {(field.options ?? []).map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              ) : (
                <TextField
                  {...commonTextFieldProps}
                  multiline={field.type === "textarea"}
                  rows={field.type === "textarea" ? field.rows ?? 3 : undefined}
                  slotProps={field.type === "date" ? { inputLabel: { shrink: true } } : undefined}
                  type={
                    field.type === "textarea"
                      ? undefined
                      : field.type ?? "text"
                  }
                />
              )}
            </Box>
          );
        })}
      </Box>

      <Stack
        direction={{ xs: "column-reverse", sm: "row" }}
        spacing={1.5}
        sx={{
          alignItems: "center",
          justifyContent: cancelOnLeft ? "space-between" : "flex-end",
          mt: 3,
        }}
      >
        <Button
          color="inherit"
          onClick={onCancel}
          sx={{ minWidth: { xs: "100%", sm: 140 } }}
          variant="outlined"
        >
          {cancelLabel}
        </Button>
        <Button
          disabled={submitting}
          sx={{ minWidth: { xs: "100%", sm: 160 } }}
          type="submit"
          variant="contained"
        >
          {submitLabel}
        </Button>
      </Stack>
    </Paper>
  );
}
