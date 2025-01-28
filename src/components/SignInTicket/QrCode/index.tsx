"use client";

import { FC } from "react";
import Barcode from "react-barcode";

interface Props {
	isRegisterForm: boolean;
	value: string;
	invitationNumber?: number;
}

const QrCode: FC<Props> = ({ isRegisterForm, value, invitationNumber }) => {
	const date = new Date();
	const currentDate = new Intl.DateTimeFormat("es-AR").format(date);

	const renderInvitationNumber = () => {
		if (isRegisterForm && invitationNumber) {
			return invitationNumber;
		}

		return "x-x-x-x-x";
	};

	return (
		<div
			data-testid="qr-code-component"
			className="h-full w-2/12 border-dashed border-white bg-white border-x-3 flex justify-center items-center text-center text-black"
		>
			<div className="-rotate-90">
				{process.env.NODE_ENV !== "test" && <Barcode value={value} />}

				<p className="text-sm">
					Invitation Nº:{" "}
					<span className="font-bold">
						{renderInvitationNumber()}
					</span>{" "}
					- {currentDate}
				</p>
			</div>
		</div>
	);
};

export default QrCode;
