import { useParams } from 'react-router-dom';
import { Patient, Diagnosis } from '../../types';
import patientService from '../../services/patients';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import { Card } from '@mui/material';
import { useEffect, useState } from 'react';
import EntryDetail from './EntryDetail';

interface Props {
  diagnoses: Diagnosis[];
}

const PatientDetailPage = ({ diagnoses }: Props) => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);
  useEffect(() => {
    const fetchPatient = async () => {
      if (id) {
        const fetchedPatient = await patientService.findById(id);
        setPatient(fetchedPatient);
      }
    };
    void fetchPatient();
  }, [id]);
  if (patient) {
    return (
      <div>
        <h2>
          {patient.name}{' '}
          {patient.gender === 'other' ? null : patient.gender === 'female' ? (
            <FemaleIcon />
          ) : (
            <MaleIcon />
          )}
        </h2>
        <div>ssn: {patient.ssn}</div>
        <div>occupation: {patient.occupation}</div>
        <h3>entries</h3>
        {patient.entries.length === 0
          ? 'no entries exist'
          : patient.entries.map((e) => (
              <Card variant="outlined" key={e.id}>
                <EntryDetail entry={e} diagnoses={diagnoses} />
              </Card>
            ))}
      </div>
    );
  } else {
    return <div>patient not found!</div>;
  }
};

export default PatientDetailPage;
