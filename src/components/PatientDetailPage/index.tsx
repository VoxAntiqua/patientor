import { useParams } from 'react-router-dom';
import { Patient } from '../../types';

interface Props {
  patients: Patient[];
}

const PatientDetailPage = ({ patients }: Props) => {
  const id = useParams().id;
  const patient = patients.find((p) => p.id === id);
  if (patient) {
    return <div>{patient.name}</div>;
  } else {
    return <div>patient not found!</div>;
  }
};

export default PatientDetailPage;
