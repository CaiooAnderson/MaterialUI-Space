import { useState, useEffect } from 'react';
import { Box, Button, Fade, Card, CardContent, Typography, Backdrop, useMediaQuery, useTheme } from '@mui/material';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Planet from './Planet';
import AnimatedStars from './AnimatedStars';
import AnimatedLight from './AnimatedLight';
import CameraZoom from './CameraZoom';
import { useThemeCustom } from '../context/useThemeCustom';
import CloseIcon from '@mui/icons-material/Close';
import Alerta from './Alert';
import { useNavigate, useLocation } from 'react-router-dom';

export default function SpaceView() {
  const location = useLocation();
  const { darkMode } = useThemeCustom();
  const [start, setStart] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertContent, setAlertContent] = useState<{ label: string, description: string }>({ label: '', description: '' });
  const navigate = useNavigate();
  const theme = useTheme();
  const telasMenores = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    if (location.state?.start !== undefined) {
      setStart(location.state.start);
    }
    if (location.state?.showInfo !== undefined) {
      setShowInfo(location.state.showInfo);
    }
  }, [location.state]);

  useEffect(() => {
    setStart(false); 
    setShowInfo(false); 
    setShowAlert(false); 
    setAlertContent({ label: '', description: '' }); 
  }, [location.pathname]);

  const infoData = [
    {
      label: 'Centro de Dados',
      description: '85 Tflops (Floating-point Operations Per Second) +1 PB de armazenamento.',
    },
    {
      label: 'Missão Principal',
      description: 'Apoiar a participação de pesquisadores brasileiros no projeto Legacy Survey of Space and Time (LSST).',
    },
    {
      label: 'Especialidades',
      description: 'Big Science e Big Data.',
    },
  ];

  const handleAlertOpen = (label: string, description: string) => {
    setAlertContent({ label, description });
    setShowAlert(true);
  };

  const handleAlertClose = () => {
    setShowAlert(false);
  };

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        position: 'relative',
        backgroundColor: darkMode ? '#000' : '#333',
      }}
    >
      <Canvas camera={{ position: [0, 0, 3], fov: 75 }}>
        <CameraZoom start={start} />
        <AnimatedStars darkMode={darkMode} />
        <ambientLight intensity={darkMode ? 0.5 : 0.7} />
        <AnimatedLight darkMode={darkMode} />
        {!showInfo && start && <Planet start={start} darkMode={darkMode} />}
        <OrbitControls />
      </Canvas>

      {!start && (
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            padding: 3,
            borderRadius: 2,
          }}
        >
          <Button variant="contained" color="info" onClick={() => setStart(true)} sx={{ fontSize: '1.2rem' }}>
            Iniciar
          </Button>
        </Box>
      )}

      {start && !showInfo && (
        <Box sx={{ position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)' }}>
          <Button variant="contained" color="info" onClick={() => setShowInfo(true)}>
            Informações
          </Button>
        </Box>
      )}

      {showInfo && (
        <Fade in={showInfo}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '60%',
              maxWidth: 600,
              bgcolor: 'background.paper',
              boxShadow: 24,
              p: 3,
              borderRadius: 2,
            }}
          >
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px' }}>
                  <Typography variant="h5" gutterBottom>
                    LIneA
                  </Typography>
                  <Button variant="contained" color="error" onClick={() => setShowInfo(false)}>
                    <CloseIcon />
                  </Button>
                </Box>
                <Typography variant="subtitle1" sx={{ marginBottom: '16px' }}>
                  Laboratório Interinstitucional de e-Astronomia.
                  <br />
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  {infoData.map((item, index) => (
                    <Box component="div" sx={{ marginBottom: '8px' }} key={index}>
                      <Button onClick={() => handleAlertOpen(item.label, item.description)}>
                        {item.label}
                      </Button>
                    </Box>
                  ))}
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-evenly', textAlign: 'center', mt: 2 }}>
                  <Button variant="contained" color="info" onClick={() => navigate('/cursos')}>
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
            <Backdrop open={showAlert} sx={{ zIndex: 1000, color: '#fff', backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
              <Box
                sx={{
                  position: 'relative',
                  width: '80%',
                  border: '2px solid',
                  borderColor: darkMode ? '#fff' : '#000',
                  backgroundColor: 'background.paper',
                  boxShadow: 24,
                  borderRadius: 1,
                }}
              >
                <Alerta label={alertContent.label} description={alertContent.description} onClose={handleAlertClose} />
              </Box>
            </Backdrop>
          ) : (
            <Box
              sx={{
                position: 'absolute',
                top: 'calc(50% + 220px)',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '60%',
                maxWidth: 600,
                marginTop: 2,
              }}
            >
              <Alerta label={alertContent.label} description={alertContent.description} onClose={handleAlertClose} />
            </Box>
          )}
        </>
      )}
    </Box>
  );
}
