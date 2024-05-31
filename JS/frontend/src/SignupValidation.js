
function validation(values) {
  let errors = {};
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;

  if (!values.name.trim()) {
    errors.name = "Name should not be empty";
  }

  if (!values.email.trim()) {
    errors.email = "Email should not be empty";
  } else if (!emailPattern.test(values.email)) {
    errors.email = "Email is not valid";
  }

  if (!values.password.trim()) {
    errors.password = "Password should not be empty";
  } else if (!passwordPattern.test(values.password)) {
    errors.password = "Password must contain at least one digit, one lowercase letter, one uppercase letter, and be at least 8 characters long";
  }

  return errors;
}

export default validation;
