import { useParams } from 'react-router-dom';
import { Patient, Diagnosis, EntryFormValues } from '../../types';
import patientService from '../../services/patients';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import { Card } from '@mui/material';
import { useEffect, useState } from 'react';
import EntryDetail from './EntryDetail';
import AddEntryModal from '../AddEntryModal';
import { Button } from '@mui/material';
import axios from 'axios';

interface Props {
  diagnoses: Diagnosis[];
}

const PatientDetailPage = ({ diagnoses }: Props) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

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

  const submitNewEntry = async (values: EntryFormValues) => {
    if (patient)
      try {
        const entry = await patientService.createEntry(patient?.id, values);
        setPatient({ ...patient, entries: patient.entries.concat(entry) });
        closeModal();
      } catch (e: unknown) {
        if (axios.isAxiosError(e)) {
          if (e?.response?.data && typeof e?.response?.data === 'string') {
            const message = e.response.data.replace(
              'Something went wrong. Error: ',
              ''
            );
            console.error(message);
            setError(message);
          } else {
            setError('Unrecognized axios error');
          }
        } else {
          console.error('Unknown error', e);
          setError('Unknown error');
        }
      }
  };

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
        <AddEntryModal
          modalOpen={modalOpen}
          onSubmit={submitNewEntry}
          error={error}
          onClose={closeModal}
          diagnoses={diagnoses}
        />
        <Button variant="contained" onClick={() => openModal()}>
          Add New Entry
        </Button>
      </div>
    );
  } else {
    return <div>patient not found!</div>;
  }
};

export default PatientDetailPage;
