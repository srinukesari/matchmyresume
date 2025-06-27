import React from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  Container,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { motion } from "framer-motion";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import NotesOutlinedIcon from "@mui/icons-material/NotesOutlined";
import GeneratingTokensOutlinedIcon from "@mui/icons-material/GeneratingTokensOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

const steps = [
  {
    number: "01",
    title: "Upload Resumes",
    desc: "Upload multiple resumes in various formats such as PDF, DOC, or TXT.",
    bg: "#ffffff",
    icon: <CloudUploadOutlinedIcon sx={{ fontSize: 36, mr: 2 }} />,
  },
  {
    number: "02",
    title: "Enter Job Description",
    desc: "Provide the job description or job requirements for which you want to evaluate the resumes.",
    bg: "#fcd9b1",
    icon: <NotesOutlinedIcon sx={{ fontSize: 36, mr: 2 }} />,
  },
  {
    number: "03",
    title: "Generate ATS Score",
    desc: "Our system will analyze each resume against the job description using ATS algorithms to generate an ATS score.",
    bg: "#ffffff",
    icon: <GeneratingTokensOutlinedIcon sx={{ fontSize: 36, mr: 2 }} />,
  },
  {
    number: "04",
    title: "View Results",
    desc: "Easily view the ATS scores for each resume and identify the best matches for the job.",
    bg: "#fcd9b1",
    icon: <VisibilityOutlinedIcon sx={{ fontSize: 36, mr: 2 }} />,
  },
];

const HowItWorks = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box sx={{ backgroundColor: "#e8f5e9", py: 6 }}>
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            gap: 4,
          }}>
          {/* Left Content */}
          <Box
            flex={1}
            sx={{
              justifyContent: "center",
              textAlign: "center",
              mb: isMobile ? 4 : 0,
              alignContent: "center",
            }}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              Discover the Power of Our Products
            </Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>
              MatchMyResume helps you select the best version of your resume for
              a given job description based on ATS scores. Improve your chances
              of getting noticed by choosing the resume that fits the job
              requirements best.
            </Typography>
          </Box>

          {/* Right Zig-Zag Cards */}
          <Box
            flex={1}
            sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {steps.map((step, index) => {
              const alignSelf = isMobile
                ? "center"
                : index % 2 === 0
                ? "flex-start"
                : "flex-end";

              const transform = isMobile
                ? "none"
                : index % 2 === 0
                ? "rotate(-1deg)"
                : "rotate(1deg)";

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}>
                  <Paper
                    elevation={3}
                    sx={{
                      p: 2,
                      backgroundColor: step.bg,
                      borderRadius: 2,
                      maxWidth: "90%",
                      alignSelf: alignSelf,
                      transform: transform,
                      transition: "transform 0.3s ease",
                      "&:hover": {
                        transform: "rotate(0deg)",
                      },
                    }}>
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="space-between">
                      <Box display="flex" alignItems="center">
                        {step.icon}
                        <Box>
                          <Typography variant="h6" fontWeight="bold">
                            {step.title}
                          </Typography>
                          <Typography variant="body2">{step.desc}</Typography>
                        </Box>
                      </Box>
                      <Typography
                        variant="h5"
                        fontWeight="bold"
                        sx={{ opacity: 0.3 }}>
                        {step.number}
                      </Typography>
                    </Box>
                  </Paper>
                </motion.div>
              );
            })}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default HowItWorks;
