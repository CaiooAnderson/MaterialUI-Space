import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Fade,
  Card,
  CardContent,
  Typography,
  Backdrop,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Planet from "./Planet";
import AnimatedStars from "./AnimatedStars";
import AnimatedLight from "./AnimatedLight";
import CameraZoom from "./CameraZoom";
import { useThemeCustom } from "../context/useThemeCustom";
import CloseIcon from "@mui/icons-material/Close";
import Alerta from "./Alert";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";

const infoMap = {
  LIneA: [
    {
      label: "Centro de Dados",
      description:
        "85 Tflops (Floating-point Operations Per Second) +1 PB de armazenamento.",
    },
    {
      label: "Missão Principal",
      description:
        "Apoiar a participação de pesquisadores brasileiros no projeto Legacy Survey of Space and Time (LSST).",
    },
    {
      label: "Especialidades",
      description: "Big Science e Big Data.",
    },
  ],
  SysMap: [
    {
      label: "Serviços",
      description:
        "Design Thinking, UX e Design, Web e Mobile, Agile, Cloud, API Management, MicroServices, ChatBot, E-Commerce, DevOps, PowerBI, Big Data, ...",
    },
    {
      label: "Parcerias",
      description:
        "Microsoft, Salesforce, UI Path, Azure, Google Cloud, Amazon Web Services e Alteryx",
    },
    {
      label: "Especialidades",
      description:
        "Metodologia ágil, UI/UX Design, DevOps, Arquitetura, IA, Desenvolvimento e automação de testes e Sustentação.",
    },
    {
      label: "Experiências",
      description:
        "Telecom e mídia, E-learning e educação, Indústria e cosméticos, Varejo e serviços, Saúde e seguros e Serviços financeiros.",
    },
  ],
};

export default function SpaceView() {
  const { planet } = useParams<{ planet?: string }>();
  const initialPlanet = planet?.toLowerCase() === "sysmap" ? "SysMap" : "LIneA";
  const [selectedPlanet, setSelectedPlanet] = useState<"LIneA" | "SysMap">(
    initialPlanet
  );

  const location = useLocation();
  const navigate = useNavigate();
  const { darkMode } = useThemeCustom();
  const theme = useTheme();
  const telasMenores = useMediaQuery(theme.breakpoints.down("sm"));

  const [start, setStart] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertContent, setAlertContent] = useState<{
    label: string;
    description: string;
  }>({
    label: "",
    description: "",
  });

  useEffect(() => {
    if (location.state?.start !== undefined) {
      setStart(location.state.start);
      setSelectedPlanet(initialPlanet);
    }
    if (location.state?.showInfo !== undefined) {
      setShowInfo(location.state.showInfo);
    }
  }, [location.state, initialPlanet]);

  useEffect(() => {
    setShowInfo(false);
    setShowAlert(false);
    setAlertContent({ label: "", description: "" });
  }, [location.pathname]);

  const handleAlertOpen = (label: string, description: string) => {
    setAlertContent({ label, description });
    setShowAlert(true);
  };
  const handleAlertClose = () => setShowAlert(false);

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        position: "relative",
        backgroundColor: darkMode ? "#000" : "#333",
      }}
    >
      {start && !(telasMenores && showInfo) && (
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/", { state: { start: false } })}
          sx={{
            position: "fixed",
            top: 10,
            left: 10,
            zIndex: 5,
            borderRadius: 2,
          }}
        >
          <ArrowBack />
        </Button>
      )}
      {!start && (
        <Box
          sx={{
            position: "absolute",
            top: 16,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: 2,
            zIndex: 10,
          }}
        >
          {(["LIneA", "SysMap"] as const).map((p) => (
            <Button
              key={p}
              variant={selectedPlanet === p ? "contained" : "outlined"}
              onClick={() => setSelectedPlanet(p)}
            >
              {p}
            </Button>
          ))}
        </Box>
      )}

      <Canvas camera={{ position: [0, 0, 3], fov: 75 }}>
        <CameraZoom start={start} />
        <AnimatedStars darkMode={darkMode} />
        <ambientLight intensity={darkMode ? 0.5 : 0.7} />
        <AnimatedLight darkMode={darkMode} />
        {!showInfo && start && (
          <Planet
            start={start}
            darkMode={darkMode}
            planetName={selectedPlanet}
          />
        )}
        <OrbitControls />
      </Canvas>

      {!start && (
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            padding: 3,
            borderRadius: 2,
          }}
        >
          <Button
            variant="contained"
            color="info"
            sx={{ fontSize: "1.2rem" }}
            onClick={() =>
              navigate(`/${selectedPlanet.toLowerCase()}`, {
                state: { start: true, showInfo: false },
              })
            }
          >
            Iniciar
          </Button>
        </Box>
      )}

      {start && !showInfo && (
        <Box
          sx={{
            position: "absolute",
            bottom: 75,
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          <Button
            variant="contained"
            color="info"
            onClick={() => setShowInfo(true)}
          >
            Informações
          </Button>
        </Box>
      )}

      {showInfo && (
        <Fade in={showInfo}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "60%",
              maxWidth: 600,
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 3,
              borderRadius: 2,
            }}
          >
            <Card>
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <Typography variant="h5">{selectedPlanet}</Typography>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => setShowInfo(false)}
                  >
                    <CloseIcon />
                  </Button>
                </Box>
                <Typography variant="subtitle1" sx={{ mb: 2 }}>
                  {selectedPlanet === "LIneA"
                    ? "Laboratório Interinstitucional de e-Astronomia."
                    : "Inovação, solução e entrega de serviços."}
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  {infoMap[selectedPlanet].map((item, idx) => (
                    <Box key={idx} sx={{ mb: 1 }}>
                      <Button
                        onClick={() =>
                          handleAlertOpen(item.label, item.description)
                        }
                      >
                        {item.label}
                      </Button>
                    </Box>
                  ))}
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    mt: 2,
                  }}
                >
                  <Button
                    variant="contained"
                    color="info"
                    onClick={() =>
                      navigate(`/${selectedPlanet.toLowerCase()}/cursos`, {
                        state: { start: true },
                      })
                    }
                  >
                    Cursos
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Fade>
      )}

      {alertContent.label && showAlert && (
        <>
          {telasMenores ? (
            <Backdrop
              open={showAlert}
              sx={{
                zIndex: 1000,
                color: "#fff",
                backgroundColor: "rgba(0,0,0,0.7)",
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  width: "80%",
                  border: "2px solid",
                  borderColor: darkMode ? "#fff" : "#000",
                  backgroundColor: "background.paper",
                  boxShadow: 24,
                  borderRadius: 1,
                }}
              >
                <Alerta
                  label={alertContent.label}
                  description={alertContent.description}
                  onClose={handleAlertClose}
                />
              </Box>
            </Backdrop>
          ) : (
            <Box
              sx={{
                position: "absolute",
                top: "calc(50% + 220px)",
                left: "50%",
                transform: "translateX(-50%)",
                width: "60%",
                maxWidth: 600,
                mt: 2,
              }}
            >
              <Alerta
                label={alertContent.label}
                description={alertContent.description}
                onClose={handleAlertClose}
              />
            </Box>
          )}
        </>
      )}
    </Box>
  );
}
