import { optimizeSlots } from '../helpers/optimizeSlots';
import { SimplifiedSlot } from '../models/slots';

describe('optimizeSlots', () => {
  it('should return the optimized slots based on non-overlapping intervals', () => {
    const inputSlots: SimplifiedSlot[] = [
      { length: 90, date: "2024-08-19T12:00:00.000Z" },
      { length: 90, date: "2024-08-19T12:15:00.000Z" },
      { length: 90, date: "2024-08-19T12:30:00.000Z" },
      { length: 90, date: "2024-08-19T12:45:00.000Z" },
      { length: 90, date: "2024-08-19T13:00:00.000Z" },
      { length: 90, date: "2024-08-19T13:15:00.000Z" },
      { length: 90, date: "2024-08-19T13:30:00.000Z" }
    ];

    const expectedOutput: SimplifiedSlot[] = [
      { length: 90, date: "2024-08-19T12:00:00.000Z" },
      { length: 90, date: "2024-08-19T13:30:00.000Z" }
    ];

    const result = optimizeSlots(inputSlots);

    expect(result).toEqual(expectedOutput);
  });
});
