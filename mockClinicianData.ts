import { Clinician } from "./models/clinician";
import { UsState, InsurancePayer, ClinicianType } from "./models/enums";
import { SimplifiedSlot } from "./models/slots";

export const availableSlots: SimplifiedSlot[] = [
    { length: 90, date: "2024-08-19T12:00:00.000Z" },
    { length: 90, date: "2024-08-19T12:15:00.000Z" },
    { length: 90, date: "2024-08-21T12:00:00.000Z" },
    { length: 90, date: "2024-08-21T15:00:00.000Z" },
    { length: 90, date: "2024-08-22T15:00:00.000Z" },
    { length: 90, date: "2024-08-28T12:15:00.000Z" }
];

export const mockClinician: Clinician = {
    id: "9c516382-c5b2-4677-a7ac-4e100fa35bdd",
    firstName: "Jane",
    lastName: "Doe",
    states: [UsState.NY, UsState.CA],
    insurances: [InsurancePayer.AETNA, InsurancePayer.CIGNA],
    clinicianType: ClinicianType.PSYCHOLOGIST,
    appointments: [],
    availableSlots: availableSlots,
    maxDailyAppointments: 2,
    maxWeeklyAppointments: 8,
    createdAt: new Date(),
    updatedAt: new Date()
};