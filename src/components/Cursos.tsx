import {
  Box,
  Typography,
  Button,
  Grow,
  Card,
  CardContent,
  CardMedia,
  Zoom,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useThemeCustom } from "../context/useThemeCustom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SchoolIcon from "@mui/icons-material/School";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";

interface Course {
  titulo: string;
  descricao: string;
  imagem: string;
}

const cursosLinea: Course[] = [
  {
    titulo: "Fundamentos de Programação com Python",
    descricao:
      "Aprenda Python do básico ao avançado com foco em ciência de dados.",
    imagem: "/assets/Python.gif",
  },
  {
    titulo: "Versionamento de código: Git, GitHub e GitFlow",
    descricao:
      "Entenda sobre a utilidade das ferramentas adotadas pela comunidade de desenvolvimento de software.",
    imagem: "/assets/GitHub.gif",
  },
  {
    titulo: "Desenvolvimento de Software Científico",
    descricao:
      "Exercita o aprofundamento em desenvolvimento de software científico.",
    imagem: "/assets/Software.gif",
  },
  {
    titulo: "Fundamentos de Banco de Dados",
    descricao: "Introdução ao SQL, modelagem de dados e consultas otimizadas.",
    imagem: "/assets/SQL.gif",
  },
  {
    titulo: "Fundamentos sobre Jupyter Notebook",
    descricao:
      "Aprendizagem sobre o Jupyter Notebook para análise e visualização de dados.",
    imagem: "/assets/Jupyter.gif",
  },
];

const cursosSysMap: Course[] = [
  {
    titulo: "Back End",
    descricao:
      "Conceitos de Arquitetura, DevOps e Containers, Boas Práticas e Cloud (IaaS, PaaS), Desenvolvimento Back end e APIs, Fila, Mensageria e Cache, Banco de Dados SQL e NoSQL e Desenvolvimento de Software.",
    imagem: "/assets/backend.gif",
  },
  {
    titulo: "Front End",
    descricao:
      "Desenvolvimento de interfaces responsivas, Desenvolvimento Web, Desenvolvimento Front end, Frameworks e Biblioteca de componentes, gerenciamento de estado, otimização de performance, acessibilidade, melhores práticas de UX/UI Design e Testes Unitários e de integração com Jest.",
    imagem: "/assets/frontend.gif",
  },
  {
    titulo: "Mobile",
    descricao:
      "Criação de aplicativos, Multiplataforma com React Native, Integração com APIs REST, Otimização de performance, Desenvolvimento nativo e híbrido, Shops & Marketplaces, React Native e Mobile Analytics.",
    imagem: "/assets/mobile.gif",
  },
];

export default function Cursos() {
  const { planet = "linea" } = useParams<{ planet?: string }>();
  const isSysMap = planet.toLowerCase() === "sysmap";
  const selectedPlanet = isSysMap ? "na SysMap" : "no LIneA";
  const cursosToShow = isSysMap ? cursosSysMap : cursosLinea;

  const navigate = useNavigate();
  const { darkMode } = useThemeCustom();
  const [show, setShow] = useState(false);
  const [showCourses, setShowCourses] = useState(false);
  const [boxWidth, setBoxWidth] = useState("100vw");
  const theme = useTheme();
  const telasMenores = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    window.scrollTo(0, 0);
    setShow(true);
    document.documentElement.style.overflowX = "hidden";
    return () => {
      document.body.style.overflow = "hidden";
      document.documentElement.style.height = "auto";
      document.body.style.height = "auto";
      setBoxWidth("100vw");
      setShowCourses(false);
    };
  }, []);

  const handleExpand = () => {
    setBoxWidth("100%");
    setShowCourses(true);
    document.body.style.overflow = "hidden";
    setTimeout(() => {
      window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
    }, 100);
  };

  const handleBack = () => {
    navigate(`/${planet}`, { state: { start: true, showInfo: false } });
  };

  return (
    <Box
      sx={{
        width: boxWidth,
        minHeight: showCourses ? "auto" : "100vh",
        background: darkMode
          ? "radial-gradient(circle, #0d1b2a, #1b263b, #415a77)"
          : "radial-gradient(circle, #c2e1ff, #89bfff, #4f8cff)",
        transition: "height 1s ease-in-out, background 0.5s ease-in-out",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        overflow: "hidden",
      }}
    >
      <Button
        variant="contained"
        color="primary"
        onClick={handleBack}
        sx={{
          borderRadius: 2,
          position: "fixed",
          top: 10,
          left: 10,
          zIndex: 2,
        }}
      >
        <ArrowBackIcon />
      </Button>

      <Grow in={show} timeout={1000}>
        <Box
          sx={{
            width: "100vw",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            textAlign: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              variant={telasMenores ? "h4" : "h3"}
              color="text.primary"
              gutterBottom
              sx={{ px: telasMenores ? 0.5 : 0 }}
            >
              Bem-vindo à Sessão dos Cursos!
            </Typography>
            <Typography
              variant={telasMenores ? "h6" : "h5"}
              color="text.secondary"
              sx={{ mb: telasMenores ? 0 : 3, px: telasMenores ? 2 : 0 }}
            >
              Explore cursos que já realizei {selectedPlanet}. <SchoolIcon />
            </Typography>
          </Box>
          <Box>
            <Button
              variant="contained"
              color="info"
              onClick={handleExpand}
              sx={{ borderRadius: 2, zIndex: 1 }}
            >
              <KeyboardDoubleArrowDownIcon />
            </Button>
          </Box>
        </Box>
      </Grow>

      {showCourses && (
        <Box
          sx={{
            width: "100%",
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: 2,
            boxSizing: "border-box",
          }}
        >
          <Typography variant="h4" color="text.primary">
            Cursos Feitos
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 2,
              justifyContent: "center",
              alignItems: "stretch",
              width: "100%",
              maxHeight: "none",
            }}
          >
            {cursosToShow.map((curso, index) => (
              <Zoom in={showCourses} timeout={1500} key={index}>
                <Card
                  sx={{
                    maxWidth: 300,
                    flex: "1 1 300px",
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    margin: "10px",
                    position: "relative",
                  }}
                >
                  <CardMedia
                    component="img"
                    height="180"
                    image={curso.imagem}
                    alt={curso.titulo}
                    sx={{ objectFit: "cover" }}
                  />
                  <CardContent
                    sx={{
                      flexGrow: 1,
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Typography variant="h6" color="text.primary" gutterBottom>
                      {curso.titulo}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ flexGrow: 1 }}
                    >
                      {curso.descricao}
                    </Typography>
                  </CardContent>
                </Card>
              </Zoom>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
}
