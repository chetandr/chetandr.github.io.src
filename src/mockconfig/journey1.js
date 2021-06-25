export const mockJourney = [
    { type: "Onboard", step: "login", contained : true },
    { type: "Onboard", step: "license" },
    { type: "Inspection", step: "front" },
    { type: "Inspection", step: "driverside" },
    { type: "Inspection", step: "passengerside" },
    { type: "Inspection", step: "rear" },
    { type: "Summary", step: "report" },
    { type: "OffBoard", step: "report" },
]