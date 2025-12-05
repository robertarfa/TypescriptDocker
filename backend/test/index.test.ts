import { getAccount, signup } from '../src/index';

it('should create an account', async () => {
  const randomEmail = `user_${Date.now()}_${Math.floor(Math.random() * 10000)}@email.com`;
  const input = {
    name: 'John Doe',
    email: randomEmail,
    document: '55139563061',
    password: 'SenhaForte123',
  };
  const outputSignup = await signup(input);
  const newAccount = await getAccount(outputSignup.accountId);
  expect(outputSignup.accountId).toBeDefined();
  expect(newAccount.account_id).toBeDefined();
  expect(newAccount.name).toBe(input.name);
  expect(newAccount.email).toBe(input.email);
  expect(newAccount.document).toBe(input.document);
});

it('Name must have name and surname', async () => {
  const input = {
    name: 'John',
    email: 'email@email.com.br',
    document: '12345678909',
    password: '123',
  };

  await expect(() => signup(input)).rejects.toThrow(new Error('O nome deve ser composto por nome e sobrenome'));
});

it('Email is invalid', async () => {
  // given
  const input = {
    name: 'John Dee',
    email: 'email',
    document: '98765432100',
    password: '123',
  };
  await expect(() => signup(input)).rejects.toThrow(new Error('Email inválido'));
});

// it('Email can not be duplicated', async () => {
//   const randomEmail = `user_${Date.now()}_${Math.floor(Math.random() * 10000)}@email.com`;
//   const input = {
//     name: 'John Dee',
//     email: randomEmail,
//     document: '86485263292',
//     password: 'SenhaForte123',
//   };
//   await signup(input);

//   await expect(() => signup(input)).rejects.toThrow(new Error('Email já cadastrado'));
// });



