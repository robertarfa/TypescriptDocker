import axios from 'axios';
import { start, closeConnection } from '../src/index';

let server: any;

describe('signup', () => {
  beforeAll(async () => {
    server = start(3000);
    // Aguarda o servidor estar pronto
    await new Promise(resolve => setTimeout(resolve, 500));
  });

  afterAll(async () => {
    if (server && server.close) server.close();
    await closeConnection();
  });

  it('should create an account', async () => {
    // given
    const randomEmail = `user_${Date.now()}_${Math.floor(Math.random() * 10000)}@email.com`;
    const input = {
      name: 'John Doe',
      email: randomEmail,
      document: '55139563061',
      password: 'SenhaForte123',
    };

    // when
    const responseSignup = await axios.post('http://localhost:3000/signup', input);

    const outputSignup = responseSignup.data;

    expect(outputSignup.accountId).toBeDefined();

    const newAccount = await axios.get(`http://localhost:3000/accounts/${outputSignup.accountId}`);

    expect(newAccount.data.account).toBeDefined();
    expect(newAccount.data.account.name).toBe(input.name);
    expect(newAccount.data.account.email).toBe(input.email);
    expect(newAccount.data.account.document).toBe(input.document);
  });

  it('Name must have name and surname', async () => {
    // given
    const input = {
      name: 'John',
      email: 'email@email.com.br',
      document: '12345678909',
      password: '123',
    };

    // when
    try {
      await axios.post('http://localhost:3000/signup', input);
      fail('Should have thrown an error');
    } catch (error: any) {
      // then
      if (!error.response) {
        console.error('Error without response:', error.message);
        throw error;
      }
      expect(error.response.status).toBe(400);
      expect(error.response.data.error).toBe('O nome deve ser composto por nome e sobrenome');
    }
  });

  it('Email is invalid', async () => {
    // given
    const input = {
      name: 'John Dee',
      email: 'email',
      document: '98765432100',
      password: '123',
    };

    // when
    try {
      await axios.post('http://localhost:3000/signup', input);
      fail('Should have thrown an error');
    } catch (error: any) {
      // then
      if (!error.response) {
        console.error('Error without response:', error.message);
        throw error;
      }
      expect(error.response.status).toBe(400);
      expect(error.response.data.error).toBe('Email inválido');
    }
  });

  it('Email can not be duplicated', async () => {
    // given
    const randomEmail = `user_${Date.now()}_${Math.floor(Math.random() * 10000)}@email.com`;
    const input = {
      name: 'John Dee',
      email: randomEmail,
      document: '86485263292',
      password: 'SenhaForte123',
    };

    // when - first account creation
    await axios.post('http://localhost:3000/signup', input);

    // then - try to create another account with same email
    try {
      await axios.post('http://localhost:3000/signup', input);
      fail('Should have thrown an error');
    } catch (error: any) {
      if (!error.response) {
        console.error('Error without response:', error.message);
        throw error;
      }
      expect(error.response.status).toBe(400);
      expect(error.response.data.error).toBe('Email já cadastrado');
    }
  });
});


