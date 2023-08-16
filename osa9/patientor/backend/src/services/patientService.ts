import { v1 as uuid } from 'uuid';
import patientData from "../../data/patients";
import { NewPatient, NonSensitivePatient, Patient } from "../types";

const getNonSensitivePatients = (): NonSensitivePatient[] => {
    return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

const addPatient = (patient: NewPatient): Patient => {
    const newPatient = {
        id: uuid(),
        ...patient
    };
    patientData.push(newPatient);
    return newPatient;
};

export default { addPatient, getNonSensitivePatients };