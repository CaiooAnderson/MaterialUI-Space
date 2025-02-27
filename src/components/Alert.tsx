import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

interface AlertaProps {
    label: string;
    description: string;
    onClose: () => void;
  }

export default function Alerta({label, description, onClose}: AlertaProps) {
    return(
            <Alert severity="info" onClose={onClose}>
                <AlertTitle>{label}</AlertTitle>
                    {description}
            </Alert>
    )
}