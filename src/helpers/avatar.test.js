import { getInitials } from "./avatar";

describe("getInitials", () => {
    test("should get initials from name", () => {
        expect(getInitials("Nemanja Krstić")).toBe("NK");
        expect(getInitials("Cher")).toBe("C");
        expect(getInitials("James Scott Zimmerman")).toBe("JZ");
        expect(getInitials("Rushi (Xola)")).toBe("RX");
        expect(getInitials("john doe")).toBe("JD");
        expect(getInitials("")).toBe("N/A");
    });
});
