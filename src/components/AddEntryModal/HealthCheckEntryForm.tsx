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

import { Diagnosis, EntryFormValues, HealthCheckRating } from '../../types';

interface Props {
  onCancel: () => void;
  onSubmit: (values: EntryFormValues) => void;
  diagnoses: Diagnosis[];
}

interface HealthCheckRatingOption {
  value: HealthCheckRating;
  label: string;
}

const healthCheckRatingOptions: HealthCheckRatingOption[] = Object.values(
  HealthCheckRating
)
  .filter((value) => typeof value === 'number')
  .map((value) => ({
    value: value as HealthCheckRating,
    label: HealthCheckRating[value as HealthCheckRating],
  }));

const HealthCheckEntryForm = ({ onCancel, onSubmit, diagnoses }: Props) => {
  if (!diagnoses) {
    return <div>Loading...</div>;
  }
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [healthCheckRating, setHealthCheckRating] = useState(
    HealthCheckRating.Healthy
  );
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);

  const diagnosisCodeOptions = diagnoses.map((d) => d.code);

  const onDiagnosisCodeChange = (event: SelectChangeEvent<string[]>) => {
    setDiagnosisCodes(event.target.value as string[]);
  };

  const onHealthCheckRatingChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    const value = parseInt(event.target.value);
    if (!isNaN(value)) {
      setHealthCheckRating(value as HealthCheckRating);
    }
  };

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    onSubmit({
      date,
      description,
      specialist,
      healthCheckRating,
      type: 'HealthCheck',
      diagnosisCodes,
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
        <InputLabel style={{ marginTop: 20 }}>Health Check Rating</InputLabel>

        <Select
          label="Health Check Rating"
          fullWidth
          value={healthCheckRating.toString()}
          onChange={onHealthCheckRatingChange}
        >
          {healthCheckRatingOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>

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

export default HealthCheckEntryForm;
