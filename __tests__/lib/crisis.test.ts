import { detectCrisis } from "@/lib/crisis";

describe("Crisis Detection", () => {
  const crisisInputs = [
    "I want to end my life",
    "mujhe kuch nahi chahiye jeena",
    "thinking about suicide",
    "want to hurt myself",
    "no reason to live anymore"
  ];
  
  const nonCrisisInputs = [
    "I have a headache",
    "feeling tired",
    "chest pain for 2 days",
    "need to find a doctor",
    "how to live a healthy life"
  ];
  
  crisisInputs.forEach((input) => {
    it(`detects crisis in: "${input}"`, () => {
      expect(detectCrisis(input)).toBe(true);
    });
  });
  
  nonCrisisInputs.forEach((input) => {
    it(`does NOT falsely flag: "${input}"`, () => {
      expect(detectCrisis(input)).toBe(false);
    });
  });
});
