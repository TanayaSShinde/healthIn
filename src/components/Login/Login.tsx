import { useState, type ChangeEvent, type FormEvent } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  TextField,
  Typography,
  alpha,
} from "@mui/material";
import {
  Favorite,
  Healing,
  LocalHospital,
  MedicalServices,
  MonitorHeart,
  Science,
  Vaccines,
} from "@mui/icons-material";
import { motion } from "framer-motion";

type LoginValues = {
  name: string;
  email: string;
};

type LoginProps = {
  onLogin: (values: LoginValues) => void;
};

const initialValues: LoginValues = {
  name: "Dr. Maya Patel",
  email: "doctor@healthin.io",
};

const floatingIcons = [
  { icon: <Favorite sx={{ fontSize: 24, color: "#ff5d8f" }} />, position: { top: "13%", left: "8%" } },
  { icon: <MedicalServices sx={{ fontSize: 24, color: "#0f4c81" }} />, position: { top: "24%", right: "9%" } },
  { icon: <Science sx={{ fontSize: 24, color: "#16b8e0" }} />, position: { bottom: "18%", left: "12%" } },
  { icon: <Vaccines sx={{ fontSize: 24, color: "#2ec4b6" }} />, position: { bottom: "12%", right: "11%" } },
];

export function Login({ onLogin }: LoginProps) {
  const [values, setValues] = useState<LoginValues>(initialValues);
  const [errors, setErrors] = useState<{ name: string; email: string }>({ name: "", email: "" });

  const validate = (nextValues: LoginValues) => {
    const nextErrors = { name: "", email: "" };

    if (!nextValues.name.trim()) {
      nextErrors.name = "Full name is required";
    }

    if (!nextValues.email.trim()) {
      nextErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(nextValues.email)) {
      nextErrors.email = "Enter a valid email address";
    }

    return nextErrors;
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);

    if (nextErrors.name || nextErrors.email) {
      return;
    }

    onLogin(values);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f4fbff 0%, #e6f7ff 45%, #ecfdf5 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        position: "relative",
        px: { xs: 2, md: 4 },
        py: { xs: 3, md: 4 },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(circle at top left, rgba(22,184,224,0.18), transparent 35%), radial-gradient(circle at bottom right, rgba(15,76,129,0.16), transparent 32%)",
          pointerEvents: "none",
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Card
            elevation={0}
            sx={{
              borderRadius: 5,
              overflow: "hidden",
              background: "rgba(255,255,255,0.86)",
              backdropFilter: "blur(18px)",
              border: "1px solid rgba(255,255,255,0.7)",
              boxShadow: "0 30px 60px rgba(15, 76, 129, 0.15)",
            }}
          >
            <Box sx={{ display: "flex", flexWrap: "wrap" }}>
              <Box sx={{ width: { xs: "100%", md: "50%" } }}>
                <Box
                  sx={{
                    position: "relative",
                    minHeight: { xs: 320, md: 620 },
                    p: { xs: 3, md: 5 },
                    background: "linear-gradient(135deg, rgba(15,76,129,0.96) 0%, rgba(22,184,224,0.9) 100%)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    color: "white",
                  }}
                >
                  {floatingIcons.map((item, index) => (
                    <motion.div
                      key={`${item.position.top}-${index}`}
                      animate={{ y: [0, -12, 0], rotate: [0, 6, 0] }}
                      transition={{ duration: 4 + index, repeat: Infinity, ease: "easeInOut" }}
                      style={{
                        position: "absolute",
                        top: item.position.top,
                        right: item.position.right,
                        bottom: item.position.bottom,
                        left: item.position.left,
                        width: 48,
                        height: 48,
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "rgba(255,255,255,0.16)",
                        backdropFilter: "blur(10px)",
                      }}
                    >
                      {item.icon}
                    </motion.div>
                  ))}

                  <motion.div
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    <Box
                      sx={{
                        width: { xs: 240, sm: 320 },
                        height: { xs: 260, sm: 320 },
                        borderRadius: "32px",
                        background: "rgba(255,255,255,0.13)",
                        border: "1px solid rgba(255,255,255,0.25)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "0 20px 45px rgba(0, 0, 0, 0.16)",
                        position: "relative",
                        overflow: "hidden",
                      }}
                    >
                      <motion.div
                        animate={{ y: [0, -8, 0], rotate: [0, 2, 0] }}
                        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
                        style={{ position: "relative", width: "100%", height: "100%" }}
                      >
                        <Box
                          sx={{
                            position: "absolute",
                            inset: "8% 8% 10% 8%",
                            borderRadius: 4,
                            background: "rgba(255,255,255,0.12)",
                            border: "1px solid rgba(255,255,255,0.18)",
                          }}
                        />

                        <motion.div
                          animate={{ scale: [1, 1.04, 1], y: [0, -4, 0] }}
                          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                          style={{
                            position: "absolute",
                            top: "12%",
                            left: "50%",
                            transform: "translateX(-50%)",
                            width: 72,
                            height: 72,
                            borderRadius: "50%",
                            background: "#ffe7c2",
                            border: "4px solid rgba(255,255,255,0.8)",
                            boxShadow: "0 10px 24px rgba(0,0,0,0.16)",
                          }}
                        />

                        <Box
                          sx={{
                            position: "absolute",
                            top: "34%",
                            left: "50%",
                            transform: "translateX(-50%)",
                            width: 96,
                            height: 120,
                            borderRadius: "30px",
                            background: "linear-gradient(135deg, #0f4c81 0%, #166ea1 100%)",
                            boxShadow: "0 14px 30px rgba(0,0,0,0.2)",
                          }}
                        />

                        <motion.div
                          animate={{ rotate: [0, -8, 0] }}
                          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                          style={{
                            position: "absolute",
                            top: "41%",
                            left: "34%",
                            width: 44,
                            height: 14,
                            borderRadius: 999,
                            background: "#fef3c7",
                            transformOrigin: "left center",
                          }}
                        />

                        <motion.div
                          animate={{ rotate: [0, 10, 0] }}
                          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                          style={{
                            position: "absolute",
                            top: "48%",
                            left: "44%",
                            width: 56,
                            height: 10,
                            borderRadius: 999,
                            background: "white",
                            transformOrigin: "left center",
                          }}
                        />

                        <Box
                          sx={{
                            position: "absolute",
                            top: "44%",
                            left: "50%",
                            transform: "translateX(-50%)",
                            width: 84,
                            height: 10,
                            borderRadius: 999,
                            background: "rgba(255,255,255,0.2)",
                          }}
                        />

                        <motion.div
                          animate={{ scale: [1, 1.08, 1] }}
                          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                          style={{
                            position: "absolute",
                            bottom: "20%",
                            left: "50%",
                            transform: "translateX(-50%)",
                            width: 92,
                            height: 42,
                            borderRadius: 999,
                            background: "rgba(255,255,255,0.18)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <MonitorHeart sx={{ fontSize: 24, color: "#fef3c7" }} />
                        </motion.div>

                        <motion.div
                          animate={{ y: [0, -4, 0], opacity: [0.7, 1, 0.7] }}
                          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                          style={{
                            position: "absolute",
                            top: "16%",
                            right: "12%",
                            width: 44,
                            height: 44,
                            borderRadius: "50%",
                            background: "rgba(255,255,255,0.16)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <LocalHospital sx={{ fontSize: 22, color: "#ffffff" }} />
                        </motion.div>
                      </motion.div>
                    </Box>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    style={{ marginTop: 28, textAlign: "center" }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1 }}>
                      <MonitorHeart sx={{ fontSize: 28, color: "#fef3c7" }} />
                      <Typography variant="body1" sx={{ fontWeight: 600 }}>
                        Healing with precision and speed
                      </Typography>
                    </Box>
                  </motion.div>
                </Box>
              </Box>

              <Box sx={{ width: { xs: "100%", md: "50%" } }}>
                <CardContent sx={{ p: { xs: 3, sm: 4, md: 5 }, background: "rgba(255,255,255,0.7)" }}>
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 1.5 }}>
                      <Avatar sx={{ bgcolor: alpha("#0f4c81", 0.12), color: "#0f4c81", width: 56, height: 56 }}>
                        <Healing sx={{ fontSize: 30 }} />
                      </Avatar>
                      <Typography variant="h4" sx={{ color: "#0f4c81", fontWeight: 800 }}>
                        Patient Management System
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                        Welcome back, Doctor. Manage your patients efficiently and securely.
                      </Typography>
                    </Box>
                  </motion.div>

                  <Divider sx={{ my: 3 }} />

                  <Box component="form" onSubmit={handleSubmit} noValidate>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 2.2 }}>
                      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                        <TextField
                          fullWidth
                          label="Full Name"
                          name="name"
                          value={values.name}
                          onChange={handleChange}
                          error={Boolean(errors.name)}
                          helperText={errors.name}
                          variant="outlined"
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              borderRadius: 3,
                              transition: "all 0.2s ease",
                              "&:hover fieldset": { borderColor: "#16b8e0" },
                              "&.Mui-focused fieldset": { borderColor: "#0f4c81", borderWidth: 2 },
                            },
                          }}
                        />
                      </motion.div>

                      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                        <TextField
                          fullWidth
                          label="Email Address"
                          name="email"
                          type="email"
                          value={values.email}
                          onChange={handleChange}
                          error={Boolean(errors.email)}
                          helperText={errors.email}
                          variant="outlined"
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              borderRadius: 3,
                              transition: "all 0.2s ease",
                              "&:hover fieldset": { borderColor: "#16b8e0" },
                              "&.Mui-focused fieldset": { borderColor: "#0f4c81", borderWidth: 2 },
                            },
                          }}
                        />
                      </motion.div>

                      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                        <Button
                          type="submit"
                          fullWidth
                          size="large"
                          component={motion.button}
                          whileHover={{ scale: 1.01, y: -2 }}
                          whileTap={{ scale: 0.98 }}
                          sx={{
                            py: 1.3,
                            borderRadius: 3,
                            textTransform: "none",
                            fontWeight: 700,
                            background: "linear-gradient(135deg, #0f4c81 0%, #16b8e0 100%)",
                            boxShadow: "0 16px 36px rgba(22,184,224,0.22)",
                            color: "white",
                            transition: "all 0.2s ease",
                            "&:hover": {
                              background: "linear-gradient(135deg, #0b3a66 0%, #11a6ca 100%)",
                              boxShadow: "0 20px 40px rgba(22,184,224,0.25)",
                            },
                          }}
                        >
                          Login
                        </Button>
                      </motion.div>
                    </Box>
                  </Box>
                </CardContent>
              </Box>
            </Box>
          </Card>
        </motion.div>
      </Container>
    </Box>
  );
}

export type { LoginValues };
