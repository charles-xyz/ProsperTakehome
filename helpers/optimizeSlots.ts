import { SimplifiedSlot } from "../models/slots";

export function optimizeSlots(slots: SimplifiedSlot[]): SimplifiedSlot[] {
    const SLOT_LENGTH = 90;
    const result: SimplifiedSlot[] = [];

    // Track the end time of the last added slot
    let lastEndTime = 0;

    for (const slot of slots) {
        const slotStartTime = new Date(slot.date).getTime();
        const slotEndTime = slotStartTime + SLOT_LENGTH * 60 * 1000; // must convert to ms

        // If the slot start time is after or equal to the last end time, add it to the result
        if (slotStartTime >= lastEndTime) {
            result.push(slot);
            lastEndTime = slotEndTime;
        }
    }

    return result;
}