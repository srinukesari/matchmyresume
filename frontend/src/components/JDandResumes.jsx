import React from "react";
import PropTypes from "prop-types";
import {
  Box,
  Typography,
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

function JDandResumes({ setJdText, resumeFiles = [], setResumeFiles }) {
  const handleResumeChange = (e) => {
    setResumeFiles([...e.target.files]);
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        gap: 2,
        marginBottom: 2,
      }}>
      <Box sx={{ flex: 1 }}>
        <Typography variant="body1" gutterBottom>
          Paste Job Description:
        </Typography>
        <TextField
          multiline
          rows={15}
          variant="outlined"
          placeholder="Paste job description here..."
          onChange={(e) => setJdText(e.target.value)}
          fullWidth
        />
      </Box>
      <Box sx={{ flex: 1 }}>
        <Typography variant="body1" gutterBottom>
          Upload Resumes (multiple):
        </Typography>
        <Button variant="outlined" component="label" fullWidth>
          {resumeFiles?.length > 0
            ? `${resumeFiles.length} file(s) selected`
            : "Choose Files"}
          <input
            type="file"
            hidden
            multiple
            accept=".pdf,.docx,.txt"
            onChange={(e) => {
              handleResumeChange(e);
              e.target.value = null; // Reset the file input value
            }}
          />
        </Button>
        {resumeFiles && resumeFiles?.length > 0 && (
          <Box sx={{ marginTop: 2 }}>
            <Typography variant="body2" gutterBottom>
              Uploaded Files:
            </Typography>
            <List
              sx={{
                maxHeight: 300,
                overflowY: "auto",
                borderRadius: 1,
              }}>
              {resumeFiles.map((file, index) => (
                <ListItem
                  sx={{
                    border: "1px solid #ccc",
                    marginTop: "4px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                  key={index}>
                  <ListItemText primary={file.name} />
                  <Button
                    variant="text"
                    color="error"
                    onClick={() => {
                      const updatedFiles = resumeFiles.filter(
                        (_, i) => i !== index
                      );
                      setResumeFiles(updatedFiles);
                    }}>
                    X
                  </Button>
                </ListItem>
              ))}
            </List>
          </Box>
        )}
      </Box>
    </Box>
  );
}
JDandResumes.propTypes = {
  setJdText: PropTypes.func.isRequired,
  resumeFiles: PropTypes.arrayOf(PropTypes.object).isRequired,
  setResumeFiles: PropTypes.func.isRequired,
};

export default JDandResumes;
