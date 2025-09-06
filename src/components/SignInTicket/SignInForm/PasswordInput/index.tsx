"use client";
import { useState } from "react";
import { Input, Button } from "@heroui/react";

interface Props {
    isRequired?: boolean;
    className?: string;
    color?: "danger" | "default";
    name?: string;
    label?: string;
}

const PasswordInput: React.FC<Props> = ({
    isRequired,
    className,
    color,
    name,
    label,
}) => {
    const [show, setShow] = useState(false);

    return (
        <Input
            isRequired={isRequired}
            type={show ? "text" : "password"}
            label={label || "Contraseña"}
            color={color}
            name={name}
            className={className}
            endContent={
                <Button
                    size="sm"
                    variant="light"
                    color={color}
                    onPress={() => setShow((v) => !v)}
                    tabIndex={-1}
                >
                    {show ? "Ocultar" : "Ver"}
                </Button>
            }
        />
    );
};

export default PasswordInput;
