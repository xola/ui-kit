import { formatPhoneNumber, getRegionCode } from "./phone";

describe("formatPhoneNumber", () => {
    it("should format a number in the seller's own country in national format", () => {
        expect(formatPhoneNumber("5402322157", "US")).toBe("(540) 232-2157");
        expect(formatPhoneNumber("7576060661", "GB")).toBe("07576 060661");
        expect(formatPhoneNumber("0421 843 881", "AU")).toBe("0421 843 881");
    });

    it("should format a number from another country in international format", () => {
        expect(formatPhoneNumber("+919538057572", "US")).toBe("+91 95380 57572");
        expect(formatPhoneNumber("+34612745471", "US")).toBe("+34 612 74 54 71");
    });

    it("should return the input unchanged when no region can be resolved", () => {
        expect(formatPhoneNumber("Just email me", "US")).toBe("Just email me");
        expect(formatPhoneNumber("", "US")).toBe("");
    });

    it("should default to US when no country code is given", () => {
        expect(formatPhoneNumber("5402322157")).toBe("(540) 232-2157");
    });

    // Mexico retired the 1 mobile prefix in 2019 and libphonenumber dropped it from MX metadata,
    // so legacy +52 1 numbers no longer resolve to a formattable national number
    it("should pass through legacy Mexican +52 1 numbers unformatted", () => {
        expect(formatPhoneNumber("+5217449939088", "MX")).toBe("17449939088");
    });
});

describe("getRegionCode", () => {
    it("should resolve the region from the calling code, not the passed country", () => {
        expect(getRegionCode("+34612745471", "US")).toBe("ES");
        expect(getRegionCode("+919538057572", "US")).toBe("IN");
    });

    it("should fall back to the passed country for a national number", () => {
        expect(getRegionCode("5402322157", "US")).toBe("US");
    });

    it("should return undefined when no region can be resolved", () => {
        expect(getRegionCode("Just email me", "US")).toBeUndefined();
    });
});
