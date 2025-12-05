import axios from 'axios';

const BASE_URL = "http://localhost:3000";

axios.defaults.validateStatus = () => true;

it('should create an account', async () => {
  const randomEmail = `user_${Date.now()}_${Math.floor(Math.random() * 10000)}@email.com`;
  const input = {
    name: 'John Doe',
    email: randomEmail,
    document: '55139563061',
    password: 'SenhaForte123',
  };
  const responseSignup = await axios.post(`${BASE_URL}/signup`, input);
  const outputSignup = responseSignup.data;
  expect(outputSignup.accountId).toBeDefined();
  const newAccount = await axios.get(`${BASE_URL}/accounts/${outputSignup.accountId}`);
  expect(newAccount.data.account_id).toBeDefined();
  expect(newAccount.data.name).toBe(input.name);
  expect(newAccount.data.email).toBe(input.email);
  expect(newAccount.data.document).toBe(input.document);
});

it('Name must have name and surname', async () => {
  const input = {
    name: 'John',
    email: 'email@email.com.br',
    document: '12345678909',
    password: '123',
  };
  const output = await axios.post(`${BASE_URL}/signup`, input);
  expect(output.status).toBe(422);
  const outputSignup = output.data;
  expect(outputSignup.message).toBe('O nome deve ser composto por nome e sobrenome');
});
