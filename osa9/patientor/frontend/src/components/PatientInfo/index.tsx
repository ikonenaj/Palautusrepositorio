import patientService from '../../services/patients';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Diagnosis, Patient } from '../../types';
import EntryDetails from './EntryDetails';

interface Props {
    diagnoses: Diagnosis[];
}

const PatientInfo = ({ diagnoses }: Props) => {
    const id = useParams().id;
    const [patient, setPatient] = useState<Patient | null>(null);

    useEffect(() => {
        const getPatient = async () => {
            const patient = await patientService.getPatient(id as string);
            setPatient(patient)
        };
        void getPatient();
    }, [id]);
    
    if (patient) {
        return (
            <div>
                <h2>{patient.name}</h2>
                <p>
                    Date of birth: {patient.dateOfBirth}<br />
                    Gender: {patient.gender}<br />
                    Ssn: {patient.ssn}<br />
                    Occupation: {patient.occupation}
                </p>
                <h3>Entries</h3>
                {patient.entries.map(entry => 
                    <div key={entry.id} style={{borderStyle: "solid", borderWidth: 2, borderRadius: 10, padding: 10, marginBottom: 10}}>
                        {entry.date} <i>{entry.description}</i>
                        <ul>
                            {entry.diagnosisCodes?.map(code =>
                                <li key={code}>
                                    {code} {diagnoses.find(diagnosis => diagnosis.code === code)?.name}
                                </li>
                            )}
                        </ul>
                        <EntryDetails entry={entry} />
                        <p>
                            Diagnose by: {entry.specialist}
                        </p>
                    </div>    
                )}
            </div>
        )
    };
    return (
        <div>
            patient not found
        </div>
    )
};

export default PatientInfo;