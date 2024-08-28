import { SyntheticEvent, useState } from 'react';
import {
  TextField,
  InputLabel,
  MenuItem,
  Select,
  Grid,
  Button,
  SelectChangeEvent,
  Checkbox,
  ListItemText,
  OutlinedInput,
} from '@mui/material';

import { Diagnosis, EntryFormValues } from '../../types';

interface Props {
  onCancel: () => void;
  onSubmit: (values: EntryFormValues) => void;
  diagnoses: Diagnosis[];
}

const OccupationalHealthcareEntryForm = ({
  onCancel,
  onSubmit,
  diagnoses,
}: Props) => {
  if (!diagnoses) {
    return <div>Loading...</div>;
  }
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [employer, setEmployer] = useState('');
  const [leaveStart, setLeaveStart] = useState('');
  const [leaveEnd, setLeaveEnd] = useState('');

  const diagnosisCodeOptions = diagnoses.map((d) => d.code);

  const onDiagnosisCodeChange = (event: SelectChangeEvent<string[]>) => {
    setDiagnosisCodes(event.target.value as string[]);
  };

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    onSubmit({
      date,
      description,
      specialist,
      type: 'OccupationalHealthcare',
      diagnosisCodes,
      employerName: employer,
      sickLeave: {
        startDate: leaveStart,
        endDate: leaveEnd,
      },
    });
  };

  return (
    <div>
      <form onSubmit={addEntry}>
        <TextField
          label="Date"
          fullWidth
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />
        <TextField
          label="Employer"
          fullWidth
          value={employer}
          onChange={({ target }) => setEmployer(target.value)}
        />
        <TextField
          label="Description"
          fullWidth
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <TextField
          label="Specialist"
          fullWidth
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />

        <InputLabel style={{ marginTop: 20 }}>Diagnosis Codes</InputLabel>
        <Select
          label="Diagnosis Codes"
          multiple
          value={diagnosisCodes}
          onChange={onDiagnosisCodeChange}
          input={<OutlinedInput label="Diagnosis Codes" />}
          renderValue={(selected) => selected.join(', ')}
        >
          {diagnosisCodeOptions.map((option) => (
            <MenuItem key={option} value={option}>
              <Checkbox checked={diagnosisCodes.indexOf(option) > -1} />
              <ListItemText primary={option} />
            </MenuItem>
          ))}
        </Select>

        <TextField
          label="Leave start date"
          fullWidth
          value={leaveStart}
          onChange={({ target }) => setLeaveStart(target.value)}
        />
        <TextField
          label="Leave end date"
          fullWidth
          value={leaveEnd}
          onChange={({ target }) => setLeaveEnd(target.value)}
        />

        <Grid>
          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              style={{ float: 'left' }}
              type="button"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              style={{
                float: 'right',
              }}
              type="submit"
              variant="contained"
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default OccupationalHealthcareEntryForm;
