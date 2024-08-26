import { SyntheticEvent, useState } from 'react';
import {
  TextField,
  InputLabel,
  MenuItem,
  Select,
  Grid,
  Button,
  SelectChangeEvent,
} from '@mui/material';

import { EntryFormValues, HealthCheckRating } from '../../types';

interface Props {
  onCancel: () => void;
  onSubmit: (values: EntryFormValues) => void;
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

const AddEntryForm = ({ onCancel, onSubmit }: Props) => {
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [healthCheckRating, setHealthCheckRating] = useState(
    HealthCheckRating.Healthy
  );

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
export default AddEntryForm;
