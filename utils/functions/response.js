exports.success = (res, data, message = "Success") => {
  return res.status(200).json({ status: true, message, data });
};

exports.error = (res, message = "Something went wrong", code = 500) => {
  return res.status(code).json({ status: false, message });
};