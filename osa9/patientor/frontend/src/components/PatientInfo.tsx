import patientService from '../services/patients';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { Patient } from '../types';

const PatientInfo = () => {
    const id = useParams().id;
    const [patient, setPatient] = useState<Patient | null>(null);
    const getPatient = async () => {
        const patient = await patientService.getPatient(id as string);
        setPatient(patient);
    };
    void getPatient();
    
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