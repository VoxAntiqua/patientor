import { Entry } from '../../types';

interface Props {
  entry: Entry;
}

const EntryDetail = ({ entry }: Props) => {
  return (
    <div>
      {entry.date} <em>{entry.description}</em>
      {entry.diagnosisCodes ? (
        <ul>
          {entry.diagnosisCodes.map((d) => (
            <li key={d}>{d}</li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};

export default EntryDetail;
