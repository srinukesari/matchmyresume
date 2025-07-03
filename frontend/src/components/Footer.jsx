import React from "react";
import {
  Box,
  Typography,
  Link,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import LanguageIcon from "@mui/icons-material/Language";

const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#f5f5f5",
        py: 3,
        mt: 6,
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        alignItems: "center",
        justifyContent: "space-between",
        px: { xs: 2, sm: 6 },
        borderTop: "1px solid #ddd",
      }}>
      <Typography
        variant="body2"
        color="textSecondary"
        sx={{ mb: isMobile ? 1 : 0 }}>
        © {new Date().getFullYear()} Srinukesari
      </Typography>
      <Box>
        <Link
          href="https://www.linkedin.com/in/kesari-lakshmi-srinivas-020705186/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          sx={{ mr: 1 }}>
          <IconButton size="small" title="LinkedIn">
            <LinkedInIcon />
          </IconButton>
        </Link>
        <Link
          href="https://twitter.com/srinukesari"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Twitter"
          sx={{ mr: 1 }}>
          <IconButton size="small" title="Twitter">
            <TwitterIcon />
          </IconButton>
        </Link>
        <Link
          href="https://srinukesari.netlify.app"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Portfolio">
          <IconButton size="small" title="Portfolio">
            <LanguageIcon />
          </IconButton>
        </Link>
      </Box>
    </Box>
  );
};

export default Footer;
