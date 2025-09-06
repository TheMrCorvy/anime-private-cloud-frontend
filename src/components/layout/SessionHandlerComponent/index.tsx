import { FC } from "react";

import { Button, Link } from "@heroui/react";
import { CookiesList, getCookie } from "@/utils/cookies";
import { handleLogout } from "@/app/actions/auth";

import { WebRoutes } from "@/utils/routes";

const SessionHandlerComponent: FC = async () => {
    const session = await getCookie(CookiesList.USER);

    if (session) {
        return (
            <form action={handleLogout}>
                <Button color="primary" type="submit" variant="flat">
                    Cerrar Sesión
                </Button>
            </form>
        );
    }

    return (
        <Button as={Link} href={WebRoutes.login} color="primary" variant="flat">
            Login
        </Button>
    );
};

export default SessionHandlerComponent;
