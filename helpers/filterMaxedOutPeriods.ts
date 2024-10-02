import { Clinician } from "../models/clinician";
import { MaxedOutPeriods } from "../models/maxedOutPeriods";
import { SimplifiedSlot } from "../models/slots";
import { getWeekNumber } from "./getWeekNumber";

export function filterMaxedOutPeriods(clinicians: Clinician[], maxedOutPeriods: MaxedOutPeriods): SimplifiedSlot[] {
    const filteredSlots: SimplifiedSlot[] = [];

    for (const clinician of clinicians) {
        for (const slot of clinician.availableSlots) {
            const slotDate = new Date(slot.date);
            const weekNumber = getWeekNumber(slotDate);
            const dateString = slotDate.toISOString().split('T')[0]; // YYYY-MM-DD format

            const weekKey = `${clinician.id}-${weekNumber}`;
            const dayKey = `${clinician.id}-${dateString}`;

            if (!maxedOutPeriods.maxedOutWeeks.has(weekKey) && !maxedOutPeriods.maxedOutDays.has(dayKey)) {
                filteredSlots.push(slot);
            }
        }
    }

    return filteredSlots;
}
