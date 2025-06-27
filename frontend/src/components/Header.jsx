import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { motion } from "framer-motion";
import JoinInnerOutlinedIcon from "@mui/icons-material/JoinInnerOutlined";

const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: "#ffffff", // white background for neutrality
        borderBottom: "1px solid #ddd", // subtle border
      }}>
      <Toolbar>
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          sx={{ flexGrow: 1, textAlign: isMobile ? "center" : "left" }}>
          <Typography
            variant={isMobile ? "h5" : "h4"}
            fontWeight="700"
            sx={{
              fontFamily: "cursive, sans-serif",
              color: "#333333",
              letterSpacing: 1,
              userSelect: "none",
              display: "flex",
              alignItems: "center",
              marginLeft: isMobile ? 0 : 4,
            }}>
            <JoinInnerOutlinedIcon sx={{ fontSize: "inherit" }} />
            matchMYresume
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
