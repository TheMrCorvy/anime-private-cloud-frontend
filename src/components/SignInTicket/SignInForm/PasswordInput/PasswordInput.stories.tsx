import type { Meta, StoryObj } from "@storybook/react";
import PasswordInput from "./index";

const meta: Meta<typeof PasswordInput> = {
    title: "Components/SignInTicket/SignInForm/PasswordInput",
    component: PasswordInput,
    tags: ["autodocs"],
    argTypes: {
        label: { control: "text" },
        color: { control: "radio", options: ["danger", "default"] },
        isRequired: { control: "boolean" },
    },
};

export default meta;

type Story = StoryObj<typeof PasswordInput>;

export const Default: Story = {
    args: {
        label: "Contraseña",
        name: "password",
        color: "danger",
        isRequired: true,
    },
};

export const NoLabel: Story = {
    args: {
        name: "password",
        color: "default",
        isRequired: false,
    },
};
