import { validateEmail, validateName, validatePassword } from '../src/helpers/validator';

it('Name is invalid', () => {
  const input = {
    name: 'John',
    email: 'email@email.com.br',
    document: '123456789',
    password: '123',
  };

  // when
  var nameIsValid = validateName(input.name);

  expect(nameIsValid).toBe(false);
})

it('Name is valid', () => {
  const input = {
    name: 'John Dee',
    email: 'email@email.com.br',
    document: '123456789',
    password: '123',
  };

  // when
  var nameIsValid = validateName(input.name);

  expect(nameIsValid).toBe(true);
})

it("Email is invalid", () => {
  const input = {
    name: 'John Dee',
    email: 'email',
    document: '123456789',
    password: '123',
  };

  let emailIsValid = validateEmail(input.email);

  expect(emailIsValid).toBe(false);

})

it("Password must have at least 8 characters with lowercase, uppercase and numbers", () => {

  const randomEmail = Math.random().toString(36).substring(7) + '@email.com';
  const input = {
    name: 'John Dee',
    email: randomEmail,
    document: '55139563061',
    password: 'SenhaForte123',
  };

  let passwordIsValid = validatePassword(input.password);

  expect(passwordIsValid).toBe(true);

})