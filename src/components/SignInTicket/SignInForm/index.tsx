import { FC } from "react";
import { Input, Button } from "@heroui/react";
import { handleLogin, handleRegister } from "@/app/actions/auth";

import { Fragment } from "react";
import PasswordInput from "./PasswordInput";

interface Props {
    isRegisterForm: boolean;
    tokenId?: string;
    errorMessage?: string;
}

const SignInForm: FC<Props> = ({ isRegisterForm, tokenId, errorMessage }) => {
    const inputs = () => {
        if (isRegisterForm) {
            return (
                <Fragment>
                    <Input
                        isRequired
                        type="text"
                        label="Nombre de usuario"
                        className="max-w-xs"
                        color="danger"
                        name="username"
                    />
                    <Input
                        isRequired
                        type="email"
                        label="Email"
                        className="max-w-xs"
                        color="danger"
                        name="email"
                        data-testid="sign-in-email"
                    />
                    <PasswordInput
                        isRequired
                        className="max-w-xs"
                        color="danger"
                        name="password"
                        label="Contraseña"
                    />
                </Fragment>
            );
        }

        return (
            <Fragment>
                <Input
                    isRequired
                    type="text"
                    label="Email o Usuario"
                    className="max-w-xs"
                    color="danger"
                    name="identifier"
                    data-testid="sign-in-identifier"
                />
                <PasswordInput
                    isRequired
                    className="max-w-xs"
                    color="danger"
                    name="password"
                    label="Contraseña"
                />
            </Fragment>
        );
    };

    return (
        <Fragment>
            <div
                data-testid="sign-in-form"
                className="w-full lg:h-full h-4/12 lg:w-4/12 border-dashed border-white border-t-3 lg:border-t-0 lg:border-l-3"
            >
                <form
                    action={
                        isRegisterForm
                            ? async (formData: FormData) =>
                                  await handleRegister(
                                      formData,
                                      tokenId as string
                                  )
                            : handleLogin
                    }
                    className="flex flex-col h-full gap-6 p-6 justify-center items-center text-center content-center"
                >
                    {inputs()}
                    {errorMessage && <p>{errorMessage}</p>}
                    <Button color="danger" type="submit">
                        Ingresar
                    </Button>
                </form>
            </div>
        </Fragment>
    );
};

export default SignInForm;
