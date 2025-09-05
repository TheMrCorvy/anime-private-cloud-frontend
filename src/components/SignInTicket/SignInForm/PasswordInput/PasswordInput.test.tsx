import { render, screen, fireEvent } from "@testing-library/react";
import PasswordInput from "./index";

describe("PasswordInput", () => {
    it("Renders password input", () => {
        render(<PasswordInput label="Contraseña" name="password" />);
        expect(screen.getByLabelText(/contraseña/i)).toBeInTheDocument();
    });

    it("Shows password when clicking 'Ver'", () => {
        render(<PasswordInput label="Contraseña" name="password" />);
        const button = screen.getByRole("button", { name: /ver/i });
        const input = screen.getByLabelText(/contraseña/i);

        expect(input).toHaveAttribute("type", "password");
        fireEvent.click(button);
        expect(input).toHaveAttribute("type", "text");
    });

    it("Hides password when clicking 'Ocultar'", () => {
        render(<PasswordInput label="Contraseña" name="password" />);
        const button = screen.getByRole("button", { name: /ver/i });
        const input = screen.getByLabelText(/contraseña/i);

        fireEvent.click(button);
        expect(input).toHaveAttribute("type", "text");

        fireEvent.click(screen.getByRole("button", { name: /ocultar/i }));
        expect(input).toHaveAttribute("type", "password");
    });
});
