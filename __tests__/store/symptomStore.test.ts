import { renderHook, act } from "@testing-library/react";
import { useSymptomStore } from "@/store/symptomStore";

describe("SymptomStore", () => {
  beforeEach(() => {
    useSymptomStore.getState().reset();
  });
  
  it("toggles symptom correctly", () => {
    const { result } = renderHook(() => useSymptomStore());
    
    act(() => {
      result.current.toggleSymptom("headache");
    });
    expect(result.current.selectedSymptomIds).toContain("headache");
    
    act(() => {
      result.current.toggleSymptom("headache");
    });
    expect(result.current.selectedSymptomIds).not.toContain("headache");
  });
  
  it("advances step when pathway is set", () => {
    const { result } = renderHook(() => useSymptomStore());
    
    act(() => {
      result.current.setPathway("physical");
      result.current.setStep(2);
    });
    
    expect(result.current.pathway).toBe("physical");
    expect(result.current.currentStep).toBe(2);
  });
});
