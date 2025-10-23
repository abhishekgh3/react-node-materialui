import { Box, Button, Container, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function InternalError() {
  const navigate = useNavigate();
  const handleGoHome = () => {
    navigate("/");
  };
  return (
    <>
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "#f7f7f7",
        }}
      >
        <Paper
          sx={{
            padding: 4,
            textAlign: "center",
            backgroundColor: "#fff",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
          }}
        >
          <Box
            component="img"
            src={`500.png`}
            alt="Maintenance"
            sx={{
              maxWidth: "100%",
              height: "auto",
            }}
          />
          <Typography
            variant="h4"
            component="h1"
            sx={{
              marginBottom: 2,
              color: "#2196F3",
            }}
          >
            Internal Server Error!!
          </Typography>
          <Typography
            variant="body1"
            sx={{
              marginBottom: 1,
              fontSize: "1.2em",
            }}
          >
            There is some error while doing the transaction, please try after
            some time while we are working on it.
          </Typography>
          <Typography
            variant="body1"
            sx={{
              marginBottom: 1,
              fontSize: "1.2em",
            }}
          >
            <Button variant="contained" color="primary" onClick={handleGoHome}>
              Refresh
            </Button>
          </Typography>
        </Paper>
      </Container>
    </>
  );
}
