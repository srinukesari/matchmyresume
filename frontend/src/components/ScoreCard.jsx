import React from "react";
import PropTypes from "prop-types";
import { Box, Typography, List, ListItem, ListItemText } from "@mui/material";
import { useState } from "react";
import { IconButton, Collapse } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function ScoreCard({ scores, missingKeywords, suggestions }) {
  const sortedScores = Object.entries(scores || {}).sort((a, b) => b[1] - a[1]);
  const colors = ["#4caf50", "#ff9800", "#f44336"]; // Green, Orange, Red
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const topScorer = sortedScores[0];
  return (
    <Box
      sx={{
        width: "100%",
        marginTop: 4,
        padding: 2,
        backgroundColor: "#f9f9f9",
        borderRadius: 2,
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      }}>
      <Typography
        variant="h5"
        gutterBottom
        sx={{ fontWeight: "bold", color: "#333" }}>
        Scores
      </Typography>
      {topScorer && (
        <Box
          sx={{
            marginTop: 2,
            marginBottom: 2,
            padding: 2,
            backgroundColor: "#e8f5e9",
            borderRadius: 2,
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}>
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", color: "#2e7d32" }}>
            Matched Resume: {topScorer[0]}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="body2" sx={{ marginRight: 1, color: "#666" }}>
              Show Analysis
            </Typography>
            <IconButton
              onClick={handleExpandClick}
              sx={{
                transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.3s",
              }}>
              <ExpandMoreIcon />
            </IconButton>
          </Box>
        </Box>
      )}
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Box
          sx={{
            marginTop: 2,
            marginBottom: 2,
            padding: 2,
            backgroundColor: "#f1f8e9",
            borderRadius: 2,
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          }}>
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: "bold", marginTop: 2 }}>
            Missing Keywords:
          </Typography>
          <List>
            {missingKeywords?.map((keyword, index) => (
              <ListItem key={index}>
                <ListItemText primary={keyword} />
              </ListItem>
            ))}
          </List>
          <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
            Suggestions:
          </Typography>
          <List>
            {suggestions?.map((suggestion, index) => (
              <ListItem key={index}>
                <ListItemText primary={suggestion} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Collapse>
      <List
        sx={{
          maxHeight: 300,
          overflowY: "auto",
          border: "1px solid #ddd",
          borderRadius: 1,
          backgroundColor: "#fff",
        }}>
        {sortedScores.map(([filename, score], index) => (
          <ListItem
            key={filename}
            sx={{
              borderBottom: "1px solid #eee",
              "&:last-child": { borderBottom: "none" },
            }}>
            <ListItemText
              primary={
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: "bold",
                  }}>
                  {filename}
                </Typography>
              }
              secondary={
                <Typography
                  variant="body2"
                  sx={{
                    color: colors[index] || "#666", // Default to gray if out of range
                  }}>
                  Score:{" "}
                  <Typography
                    component="span"
                    sx={{
                      fontSize: `${
                        1.2 + 0.2 * (sortedScores.length - index)
                      }rem`,
                      fontWeight: "bold",
                      display: "inline",
                    }}>
                    {score}
                  </Typography>
                </Typography>
              }
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
ScoreCard.propTypes = {
  scores: PropTypes.object,
  missingKeywords: PropTypes.arrayOf(PropTypes.string),
  suggestions: PropTypes.arrayOf(PropTypes.string),
};

export default ScoreCard;
