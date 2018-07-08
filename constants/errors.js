exports.errors = {
	GENERAL: {
		status: 500,
		message: 'Something was wrong'
	},
	USER_NOT_VALID: {
		status: 401,
		message: 'User unauthorized'
	},
	USER_REGISTERED: {
		status: 404,
		message: 'User has registered'
	},
	TOKEN_NOT_FOUND: {
		status: 401,
		message: 'Incorrect token'
	},
	TOKEN_EXPIRED: {
		status: 401,
		message: 'Token expired'
	},
	PARAMS_NOT_VALID: {
		status: 404,
		message: 'Params not correct'
	},
	PDF_NOT_FOUND: {
		status: 404,
		message: 'Pdf not found'
	}
};