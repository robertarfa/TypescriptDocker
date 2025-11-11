export const validateName = (name: string) => {

  let isValid = false;

  const nameParts = name.trim().split(/\s+/);

  if (nameParts.length >= 2)
    isValid = true

  return isValid;
}

export const validateEmail = (email: string) => {

  let isValid = false;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (emailRegex.test(email))
    isValid = true

  return isValid;

}

export const validatePassword = (password: string) => {
  let isValid = false;

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

  if (passwordRegex.test(password))
    isValid = true;

  return isValid;
}