import Image from "next/image";

import kiyohimeImg from "../../../../public/kiyohime.webp";
import { FC } from "react";

interface Props {
	isRegisterForm?: boolean;
	invitationNumber?: number;
	createdAt?: Date;
	userName?: string;
}

const Invitation: FC<Props> = ({
	isRegisterForm,
	invitationNumber,
	createdAt,
	userName,
}) => {
	const ticketNumber = invitationNumber || "x-x-x-x-x";
	const date = createdAt ? new Date(createdAt) : new Date();
	const currentDate = new Intl.DateTimeFormat("es-AR").format(date);

	return (
		<div
			data-testid="invitation-component"
			className="h-full w-6/12 border-dashed border-white border-r-3 relative"
		>
			<Image src={kiyohimeImg} height={700} alt="Kiyohime" />
			<div className="absolute top-[5%] right-[5%] text-right flex flex-col gap-6">
				<h4 className="text-4xl">
					Ticket Nº: <span className="font-bold">{ticketNumber}</span>
				</h4>
				<h4 className="text-xl">
					Fecha de creación:{" "}
					<span className="font-bold">{currentDate}</span>
				</h4>
				{userName && isRegisterForm && (
					<h4 className="text-xl font-bold capitalize">{userName}</h4>
				)}
			</div>
		</div>
	);
};

export default Invitation;
