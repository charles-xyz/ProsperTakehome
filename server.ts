import express, { Express, Request, Response } from "express";
import { SimplifiedSlot, SlotPair } from "./models/slots";
import { Clinician } from "./models/clinician";
import { ClinicianType, InsurancePayer, UsState } from "./models/enums";
import { Patient } from "./models/patient";
import { getAssessmentSlots } from "./services/schedulingService";
import { v4 as uuidv4 } from "uuid";
import { mockClinician } from "./mockClinicianData";
const app: Express = express();
const port = process.env.PORT || 3008;

app.use(express.json());

// Mock clinician data


app.get("/", (req: Request, res: Response) => {
  res.send("running");
});

app.post("/assessment-slots", (req: any, res: any) => {
    try {
        const { firstName, lastName, state, insurance } = req.body;

        // Validate input
        if (!firstName || !lastName || !state || !insurance) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        // Create patient object
        const patient: Patient = {
            id: uuidv4(),  // Correct UUID v4 usage
            firstName,
            lastName,
            state: state as UsState,
            insurance: insurance as InsurancePayer,
            createdAt: new Date(),
            updatedAt: new Date()
        };

        // Get assessment slots
        const slotPairs: SlotPair[] = getAssessmentSlots(patient, [mockClinician]);

        // Return the slot pairs
        res.json({ assessmentSlots: slotPairs });
    } catch (error) {
        console.error("Error processing request:", error);
        res.status(500).json({ error: "Internal server error" });
    }
})

// Only call app.listen() once
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
})