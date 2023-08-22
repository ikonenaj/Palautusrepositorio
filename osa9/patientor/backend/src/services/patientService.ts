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

const getPatient = (id: string): Patient | undefined => {
    const patient = patientData.find(patient => patient.id === id);
    return patient;
};

const addPatient = (patient: NewPatient): Patient => {
    const newPatient = {
        id: uuid(),
        entries: [],
        ...patient
    };
    patientData.push(newPatient);
    return newPatient;
};

export default { addPatient, getPatient, getNonSensitivePatients };