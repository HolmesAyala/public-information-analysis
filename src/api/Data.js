export default {
	forms: [
		{
			id: "1",
			title: "Form W8BEN",
			description:
				"Certificate of Foreign Status of Beneficial Owner for United States Tax Withholding and Reporting (Individuals)",
			form: {
				name: "form-w8ben.pdf",
				url: `${process.env.PUBLIC_URL}/forms/form-w8ben.pdf`,
			},
			instructions: {
				name: "instructions-w8ben.pdf",
				url: `${process.env.PUBLIC_URL}/forms/instructions-w8ben.pdf`,
			},
		},
		{
			id: "2",
			title: "Form W9",
			description:
				"Request for Taxpayer Identification Number (TIN) and Certification. Used to request a taxpayer identification number (TIN) for reporting on an information return the amount paid.",
			form: {
				name: "form-w9.pdf",
				url: `${process.env.PUBLIC_URL}/forms/form-w9.pdf`,
			},
			instructions: {
				name: "instructions-w9.pdf",
				url: `${process.env.PUBLIC_URL}/forms/instructions-w9.pdf`,
			},
		},
		{
			id: "3",
			title: "Form 941",
			description:
				"Employer's Quarterly Federal Tax Return. Employers who withhold income taxes, social security tax, or Medicare tax from employee's paychecks or who must pay the employer's portion of social security or Medicare tax.",
			form: {
				name: "form-941.pdf",
				url: `${process.env.PUBLIC_URL}/forms/form-941.pdf`,
			},
			instructions: {
				name: "instructions-941.pdf",
				url: `${process.env.PUBLIC_URL}/forms/instructions-941.pdf`,
			},
		},
		{
			id: "4",
			title: "Form W7",
			description:
				"Application for IRS Individual Taxpayer Identification Number. Get or renew an individual taxpayer identification number (ITIN) for federal tax purposes if you are not eligible for a social security number.",
			form: {
				name: "form-w7.pdf",
				url: `${process.env.PUBLIC_URL}/forms/form-w7.pdf`,
			},
			instructions: {
				name: "instructions-w7.pdf",
				url: `${process.env.PUBLIC_URL}/forms/instructions-w7.pdf`,
			},
		},
		{
			id: "5",
			title: "Form SS-4",
			description:
				"Application for Employer Identification Number (EIN). Use this form to apply for an employer identification number (EIN).",
			form: {
				name: "form-ss4.pdf",
				url: `${process.env.PUBLIC_URL}/forms/form-ss4.pdf`,
			},
			instructions: {
				name: "instructions-ss4.pdf",
				url: `${process.env.PUBLIC_URL}/forms/instructions-ss4.pdf`,
			},
		},
	],
};
