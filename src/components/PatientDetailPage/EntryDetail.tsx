import {
  Diagnosis,
  Entry,
  HospitalEntryProps,
  HealthCheckEntryProps,
  OccupationalHealthcareEntryProps,
  HealthCheckRating,
} from '../../types';
import { Healing, MonitorHeart, MedicalServices } from '@mui/icons-material';
import { CardHeader, CardContent } from '@mui/material';

interface Props {
  entry: Entry;
  diagnoses: Diagnosis[];
}

const EntryDetail = ({ entry, diagnoses }: Props) => {
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  switch (entry.type) {
    case 'Hospital':
      return <HospitalEntryDetails entry={entry} diagnoses={diagnoses} />;
    case 'HealthCheck':
      return <HealthCheckEntryDetails entry={entry} diagnoses={diagnoses} />;
    case 'OccupationalHealthcare':
      return (
        <OccupationalHealthcareEntryDetails
          entry={entry}
          diagnoses={diagnoses}
        />
      );
    default:
      return assertNever(entry);
  }
};

const healthCheckDisplay = (rating: HealthCheckRating) => {
  switch (rating) {
    case 0:
      return <span style={{ color: 'green' }}>0 - Healthy</span>;
    case 1:
      return <span style={{ color: 'orange' }}>1 - Low Risk</span>;
    case 2:
      return <span style={{ color: 'red' }}>2 - High Risk</span>;
    case 3:
      return <span style={{ color: 'darkred' }}>3 - Critical Risk</span>;
    default:
      return null;
  }
};

const HospitalEntryDetails = ({ entry, diagnoses }: HospitalEntryProps) => {
  return (
    <div>
      <CardHeader
        avatar={<Healing />}
        title={<h3>{entry.date}</h3>}
        sx={{ paddingBottom: 0 }}
      />
      <CardContent sx={{ paddingTop: 0 }}>
        <em>{entry.description}</em>
        {entry.diagnosisCodes ? (
          <ul>
            {entry.diagnosisCodes.map((diagnosisCode) => (
              <li key={diagnosisCode}>
                {diagnosisCode}{' '}
                {diagnoses.find((d) => d.code === diagnosisCode)?.name}
              </li>
            ))}
          </ul>
        ) : null}
        <p>Provider: {entry.specialist}</p>
      </CardContent>
    </div>
  );
};

const HealthCheckEntryDetails = ({
  entry,
  diagnoses,
}: HealthCheckEntryProps) => {
  return (
    <div>
      <CardHeader
        avatar={<MonitorHeart />}
        title={<h3>{entry.date}</h3>}
        sx={{ paddingBottom: 0 }}
      />
      <CardContent sx={{ paddingTop: 0 }}>
        <em>{entry.description}</em>
        <p>
          Health check rating: {healthCheckDisplay(entry.healthCheckRating)}
        </p>
        {entry.diagnosisCodes ? (
          <ul>
            {entry.diagnosisCodes.map((diagnosisCode) => (
              <li key={diagnosisCode}>
                {diagnosisCode}{' '}
                {diagnoses.find((d) => d.code === diagnosisCode)?.name}
              </li>
            ))}
          </ul>
        ) : null}
        <p>Provider: {entry.specialist}</p>
      </CardContent>
    </div>
  );
};

const OccupationalHealthcareEntryDetails = ({
  entry,
  diagnoses,
}: OccupationalHealthcareEntryProps) => {
  return (
    <div>
      <CardHeader
        avatar={<MedicalServices />}
        title={<h3>{entry.date}</h3>}
        sx={{ paddingBottom: 0 }}
      />
      <CardContent sx={{ paddingTop: 0 }}>
        <div>Employer: {entry.employerName}</div>
        <p>
          <em>{entry.description}</em>
        </p>
        {entry.diagnosisCodes ? (
          <ul>
            {entry.diagnosisCodes.map((diagnosisCode) => (
              <li key={diagnosisCode}>
                {diagnosisCode}{' '}
                {diagnoses.find((d) => d.code === diagnosisCode)?.name}
              </li>
            ))}
          </ul>
        ) : null}
        <p>Provider: {entry.specialist}</p>
      </CardContent>
    </div>
  );
};

export default EntryDetail;
