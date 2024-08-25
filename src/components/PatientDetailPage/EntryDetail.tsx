import { Diagnosis, Entry } from '../../types';
import diagnosisService from '../../services/diagnoses';
import { useState, useEffect } from 'react';

interface Props {
  entry: Entry;
}

const EntryDetail = ({ entry }: Props) => {
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  useEffect(() => {
    const fetchDiagnoses = async () => {
      const diagnoses = await diagnosisService.getAll();
      setDiagnoses(diagnoses);
    };
    void fetchDiagnoses();
  }, []);

  return (
    <div>
      {entry.date} <em>{entry.description}</em>
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
    </div>
  );
};

export default EntryDetail;
