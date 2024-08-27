import { useState } from 'react';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  Divider,
  Alert,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';

import { Diagnosis, EntryFormValues } from '../../types';
import HealthCheckEntryForm from './HealthCheckEntryForm';
import HospitalEntryForm from './HospitalEntryForm';

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: EntryFormValues) => void;
  error?: string;
  diagnoses: Diagnosis[];
}

const AddEntryModal = ({
  modalOpen,
  onClose,
  onSubmit,
  error,
  diagnoses,
}: Props) => {
  const [selectedEntryType, setSelectedEntryType] = useState<
    'Hospital' | 'HealthCheck' | 'OccupationalHealthcare'
  >('HealthCheck');
  return (
    <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
      <DialogTitle>
        Add a new entry <InputLabel>Entry type</InputLabel>
        <Select
          value={selectedEntryType}
          onChange={(event) =>
            setSelectedEntryType(
              event.target.value as
                | 'Hospital'
                | 'HealthCheck'
                | 'OccupationalHealthcare'
            )
          }
        >
          <MenuItem value="Hospital">Hospital Entry</MenuItem>
          <MenuItem value="HealthCheck">Health Check Entry</MenuItem>
          <MenuItem value="OccupationalHealthcare">
            Occupational Healthcare Entry
          </MenuItem>
        </Select>
      </DialogTitle>
      <Divider />
      <DialogContent>
        {error && <Alert severity="error">{error}</Alert>}
        {selectedEntryType === 'HealthCheck' && (
          <HealthCheckEntryForm
            onSubmit={onSubmit}
            onCancel={onClose}
            diagnoses={diagnoses}
          />
        )}
        {selectedEntryType === 'Hospital' && (
          <HospitalEntryForm
            onSubmit={onSubmit}
            onCancel={onClose}
            diagnoses={diagnoses}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AddEntryModal;
