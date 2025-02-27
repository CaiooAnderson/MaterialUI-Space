import { Box, Typography, Button, Grow, Card, CardContent, CardMedia, Zoom } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useThemeCustom } from '../context/useThemeCustom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SchoolIcon from '@mui/icons-material/School';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';

const cursos = [
  {
    titulo: 'Fundamentos de Programação com Python',
    descricao: 'Aprenda Python do básico ao avançado com foco em ciência de dados.',
    imagem: '/src/assets/Python.gif',
  },
  {
    titulo: 'Versionamento de código: Git, GitHub e GitFlow',
    descricao: 'Entenda sobre a utilidade das ferramentas adotadas pela comunidade de desenvolvimento de software.',
    imagem: '/src/assets/GitHub.gif',
  },
  {
    titulo: 'Desenvolvimento de Software Científico',
    descricao: 'Exercida para aprofundar o conhecimento em desenvolvimento de software científico.',
    imagem: '/src/assets/Software.gif',
  },
  {
    titulo: 'Fundamentos de Banco de Dados',
    descricao: 'Introdução ao SQL, modelagem de dados e consultas otimizadas.',
    imagem: '/src/assets/SQL.gif',
  },
  {
    titulo: 'Jupyter Notebook',
    descricao: 'Aprendizagem sobre o Jupyter Notebook para análise e visualização de dados.',
    imagem: '/src/assets/Jupyter.gif'
  }
];

export default function Cursos() {
  const navigate = useNavigate();
  const { darkMode } = useThemeCustom();
  const [show, setShow] = useState(false);
  const [showCourses, setShowCourses] = useState(false);
  const [boxWidth, setBoxWidth] = useState('100vw');

  useEffect(() => {
    window.scrollTo(0, 0);
    setShow(true);
    document.documentElement.style.overflowX = 'hidden';
    return () => {
      setShowCourses(false); 
      setBoxWidth('100vw');
      document.body.style.overflow = 'hidden'; 
      document.documentElement.style.height = 'auto'; 
      document.body.style.height = 'auto'; 
    };
  }, []);

  const handleExpand = () => {
    setBoxWidth('100%');
    setShowCourses(true);
    document.body.style.overflow = 'auto';
    setTimeout(() => {
      window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
    }, 100);
  };

  return (
    <Box
      sx={{
        width: boxWidth,
        minHeight: showCourses ? 'auto' : '100vh',
        background: darkMode
          ? 'radial-gradient(circle, #0d1b2a, #1b263b, #415a77)'
          : 'radial-gradient(circle, #c2e1ff, #89bfff, #4f8cff)',
        transition: 'height 1s ease-in-out, background 0.5s ease-in-out',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        overflow: 'hidden'
      }}
    >
      <Button
              variant="contained"
              color="primary"
              onClick={() => {
                document.documentElement.style.height = '100vh';
                document.body.style.height = '100vh';
                navigate('/', { state: { start: true, showInfo: false } });
              }}
              sx={{
                borderRadius: 2,
                position: 'fixed',
                top: 10,
                left: 10,
                zIndex: 2
              }}
            >
              <ArrowBackIcon />
            </Button>
      <Grow in={show} timeout={1000}>
        <Box
          sx={{
            width: '100%',
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-evenly',
            textAlign: 'center',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Typography variant="h3" color="text.primary" gutterBottom>
              Bem-vindo à Sessão dos Cursos!
            </Typography>
            <Typography variant="h5" color="text.secondary" sx={{ mb: 3 }}>
              Explore cursos que já realizei no LIneA. 
              <SchoolIcon />
            </Typography>
          </Box>
          <Box>
            <Button
              variant="contained"
              color="info"
              onClick={handleExpand}
              sx={{
                borderRadius: 2,
                zIndex: 1
              }}
            >
              <KeyboardDoubleArrowDownIcon />
            </Button>
          </Box>
        </Box>
      </Grow>

      {showCourses && (
        <Box
          sx={{
            width: '100%',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 2,
            boxSizing: 'border-box',
          }}
        >
          <Typography variant="h4" color="text.primary">
            Cursos Feitos
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 2,
              justifyContent: 'center',
              alignItems: 'stretch',
              width: '100%',
              maxHeight: 'none',
            }}
          >
            {cursos.map((curso, index) => (
              <Zoom in={showCourses} timeout={1500} key={index}>
                <Card
                  key={index}
                  sx={{
                    maxWidth: 300,
                    flex: '1 1 300px',
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    margin: '10px',
                    position: 'relative',
                  }}
                >
                  <CardMedia
                    component="img"
                    height="180"
                    image={curso.imagem}
                    alt={curso.titulo}
                    sx={{
                      objectFit: 'cover'
                    }}
                  />
                  <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="h6" color="text.primary" gutterBottom>
                      {curso.titulo}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ flexGrow: 1 }}>
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
