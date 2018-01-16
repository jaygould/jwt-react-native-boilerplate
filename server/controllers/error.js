const errorHandler = (res, err) => {
	return res.status(400).send({
		success: false,
		message: err
	});
};

module.exports = {
	errorHandler
};
