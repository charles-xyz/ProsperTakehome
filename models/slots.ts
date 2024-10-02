import { Clinician } from "./clinician"


// I wont be using AvailableSlot in this implementation given that the mock data was provided in a simplified format
export interface AvailableSlot {
    id: string,
    clinicianId: string,
    clinician: Clinician,
    date: Date,
    length: number,
    createdAt: Date,
    updatedAt: Date
  }

// define the export type
export interface SlotPair {
    slot1: Date,
    slot2: Date
}

// define an interface for simplified slot
export interface SimplifiedSlot {
    length: number,
    date: string
}