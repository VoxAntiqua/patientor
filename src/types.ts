export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: Entry[];
}

export type PatientFormValues = Omit<Patient, 'id' | 'entries'>;

type HealthCheckEntryFormValues = Omit<HealthCheckEntry, 'id'>;
type OccupationalHealthcareEntryFormValues = Omit<
  OccupationalHealthcareEntry,
  'id'
>;
type HospitalEntryFormValues = Omit<HospitalEntry, 'id'>;

export type EntryFormValues =
  | HealthCheckEntryFormValues
  | OccupationalHealthcareEntryFormValues
  | HospitalEntryFormValues;

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: string[];
}

export enum HealthCheckRating {
  'Healthy' = 0,
  'LowRisk' = 1,
  'HighRisk' = 2,
  'CriticalRisk' = 3,
}

interface HealthCheckEntry extends BaseEntry {
  type: 'HealthCheck';
  healthCheckRating: HealthCheckRating;
}

interface HospitalEntry extends BaseEntry {
  type: 'Hospital';
  discharge: {
    date: string;
    criteria: string;
  };
}

interface OccupationalHealthcareEntry extends BaseEntry {
  type: 'OccupationalHealthcare';
  employerName: string;
  sickLeave?: {
    startDate: string;
    endDate: string;
  };
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export interface HospitalEntryProps {
  entry: HospitalEntry;
  diagnoses: Diagnosis[];
}

export interface OccupationalHealthcareEntryProps {
  entry: OccupationalHealthcareEntry;
  diagnoses: Diagnosis[];
}

export interface HealthCheckEntryProps {
  entry: HealthCheckEntry;
  diagnoses: Diagnosis[];
}

// Define special omit for unions
type UnionOmit<T, K extends string | number | symbol> = T extends unknown
  ? Omit<T, K>
  : never;
// Define Entry without the 'id' property
export type NewEntry = UnionOmit<Entry, 'id'>;
