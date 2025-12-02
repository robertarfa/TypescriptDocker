import { validateCpf } from "../src/helpers/validateCpf";

describe("validateCpf", () => {
  it("should return false for empty string", () => {
    const isValid = validateCpf("");

    expect(isValid).toBe(false);
  });

  it("should return false when all Digits are The Same", () => {
    const isValid = validateCpf("11111111111");

    expect(isValid).toBe(false);

  });

  it("should have eleven digits", () => {
    const hasTwelveDigits = validateCpf("123456789012");

    expect(hasTwelveDigits).toBe(false);
  });

  it("should return true for a valid CPF", () => {
    const isValid = validateCpf("97456321558");
    expect(isValid).toBe(true);
  });

  it("CPF is null", () => {
    const isValid = validateCpf("");
    expect(isValid).toBe(false);
  });
});