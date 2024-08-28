import axios from 'axios';
import {
  Entry,
  EntryFormValues,
  NewEntry,
  Patient,
  PatientFormValues,
} from '../types';

import { apiBaseUrl } from '../constants';

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(`${apiBaseUrl}/patients`);

  return data;
};

const findById = async (id: string) => {
  const { data } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);

  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(`${apiBaseUrl}/patients`, object);

  return data;
};

const createEntry = async (
  id: string,
  object: EntryFormValues
): Promise<Entry> => {
  const newEntry: NewEntry = {
    ...object,
    diagnosisCodes:
      object.diagnosisCodes && object.diagnosisCodes.length
        ? object.diagnosisCodes
        : undefined, // set to undefined if empty or not provided
  };

  const { data } = await axios.post<Entry>(
    `${apiBaseUrl}/patients/${id}/entries`,
    newEntry
  );

  return data;
};

export default {
  getAll,
  create,
  findById,
  createEntry,
};
