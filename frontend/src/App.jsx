import { useState } from "react";
import { Box, Typography, Button, CircularProgress } from "@mui/material";
import JDandResumes from "./components/JDandResumes";
import ScoreCard from "./components/ScoreCard";
import JoinInnerOutlinedIcon from "@mui/icons-material/JoinInnerOutlined";
import HowItWorks from "./components/HowItWorks";
import Headers from "./components/Header";
import Footer from "./components/Footer";

export default function App() {
  const [resumeFiles, setResumeFiles] = useState([]);
  const [jdText, setJdText] = useState(null);
  const [scores, setScores] = useState(null);
  const [missingKeywords, setMissingKeywords] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (jdText?.length == 0 || resumeFiles?.length === 0) {
      alert("Please upload resumes and a job description.");
      return;
    }
    setLoading(true);

    try {
      // Step 1: Upload resumes
      const resumesForm = new FormData();
      resumeFiles.forEach((file) => resumesForm.append("files", file));
      const res1 = await fetch(`${BASE_URL}/upload-resumes/`, {
        method: "POST",
        body: resumesForm,
      });
      const resumesData = await res1.json();

      // Step 2: Score resumes
      const analysisRes = await fetch(`${BASE_URL}/score/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resumes: resumesData.resumes,
          job_description: jdText,
        }),
      });

      const analysis = await analysisRes.json();
      setScores(analysis?.results);
      setMissingKeywords(analysis?.missing_keywords || []);
      setSuggestions(analysis?.suggestions || []);
    } catch (error) {
      alert("Error: " + error.message);
    }
    setLoading(false);
  };

  return (
    <>
      <Headers />
      <HowItWorks />
      <Box
        sx={{
          maxWidth: 800,
          margin: "auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 4,
          gap: 3,
          // backgroundColor: "#f9f9f9",
          borderRadius: 4,
          // boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        }}>
        <form
          onSubmit={handleSubmit}
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}>
          <JDandResumes
            setJdText={setJdText}
            resumeFiles={resumeFiles}
            setResumeFiles={setResumeFiles}
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={loading}
            fullWidth
            sx={{
              padding: "12px 0",
              fontSize: "16px",
              fontWeight: "bold",
              backgroundColor: "#b94a01",
              "&:hover": { backgroundColor: "#a53f00" },
            }}>
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Get Scores"
            )}
          </Button>
        </form>

        {scores && (
          <ScoreCard
            scores={scores}
            missingKeywords={missingKeywords}
            suggestions={suggestions}
            sx={{
              marginTop: 3,
              width: "100%",
              backgroundColor: "#ffffff",
              borderRadius: 4,
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              padding: 2,
            }}
          />
        )}
      </Box>
      <Footer />
    </>
  );
}
