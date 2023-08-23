import { Entry } from "../../types"

const EntryDetails = ({ entry }: { entry: Entry }) => {
    const assertNever = (value: never): never => {
        throw new Error(
          `Unhandled discriminated union member: ${JSON.stringify(value)}`
        );
    }

    switch (entry.type) {
        case "Hospital":
            return (
                <div>
                    Discharge: {entry.discharge.date} {entry.discharge.criteria}
                </div>
            );
        case "OccupationalHealthcare":
            return (
                <div>
                    <p>
                        Employer name: {entry.employerName}
                    </p>
                    {entry.sickLeave?.startDate && 
                    <p>
                        Sick leave: {entry.sickLeave.startDate} - {entry.sickLeave.endDate}
                    </p>}
                </div>
            );
        case "HealthCheck":
            return (
                <div>
                    Healthcheck rating: {entry.healthCheckRating}
                </div>
            );
        default:
            return assertNever(entry);
    }
};

export default EntryDetails;