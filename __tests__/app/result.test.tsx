import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import ResultPage from "@/app/(app)/check/result/page";

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: jest.fn() })
}));

jest.mock("@/store/symptomStore", () => ({
  useSymptomStore: () => ({
    result: {
      risk_label: "worth-attention",
      primary_message: "This is worth a conversation with a doctor.",
      possible_reasons: ["Fatigue", "Stress"]
    },
    customText: "",
    selectedSymptomIds: [],
    durationDays: 1,
    severity: 1,
    pathway: "general",
    language: "en",
    setStep: jest.fn()
  })
}));

jest.mock("@/hooks/useAnalyzeSymptoms", () => ({
  useAnalyzeSymptoms: () => ({
    mutate: jest.fn(),
    isPending: false,
    isError: false
  })
}));

describe("ResultPage", () => {
  it("never shows alarming language for worth-attention risk", () => {
    render(<ResultPage />);
    
    // Test that the UI displays calming language instead of alarming language
    expect(screen.queryByText(/high risk/i)).toBeNull();
    expect(screen.queryByText(/critical/i)).toBeNull();
    expect(screen.queryByText(/emergency/i)).toBeNull();
    
    expect(screen.getByText(/worth a conversation/i)).toBeInTheDocument();
  });
});
