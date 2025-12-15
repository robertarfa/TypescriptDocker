import { beforeEach, it, expect, test } from '@jest/globals';
import AccountService from '../src/services/AccountService';
import AccountDAODatabase, { AccountDAOMemory } from '../src/infra/AccountDAODatabase'; // Adjust the path if needed
// Add the following import if you are using Jest (most common with TypeScript projects)

let accountService: AccountService;

beforeEach(() => {
  let accountDAO = new AccountDAODatabase();
  // let accountDAO = new AccountDAOMemory();
  accountService = new AccountService(accountDAO);
})

test('should create an account', async () => {
  const randomEmail = `user_${Date.now()}_${Math.floor(Math.random() * 10000)}@email.com`;
  const input = {
    name: 'John Doe',
    email: randomEmail,
    document: '55139563061',
    password: 'SenhaForte123',
  };
  const outputSignup = await accountService.signup(input);
  const newAccount = await accountService.getAccount(outputSignup.accountId);
  console.log("newAccount", outputSignup)
  expect(outputSignup.accountId).toBeDefined();
  // expect(newAccount.account_id).toBeDefined();
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

  await expect(() => accountService.signup(input)).rejects.toThrow(new Error('O nome deve ser composto por nome e sobrenome'));
});

it('Email is invalid', async () => {
  // given
  const input = {
    name: 'John Dee',
    email: 'email',
    document: '98765432100',
    password: '123',
  };
  await expect(() => accountService.signup(input)).rejects.toThrow(new Error('Email inválido'));
});





