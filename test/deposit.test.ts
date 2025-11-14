import axios from 'axios';
import { start, closeConnection } from '../src/index';

let server: any;

async function createAccount() {
  const randomEmail = Math.random().toString(36).substring(7) + '@email.com';
  const input = {
    name: 'John Doe',
    email: randomEmail,
    document: '55139563061',
    password: 'SenhaForte123',
  };
  const response = await axios.post('http://localhost:3000/signup', input);
  return response.data.accountId;
}

describe('deposit', () => {
  beforeAll(async () => {
    server = start(3000);
    // Aguarda o servidor estar pronto
    await new Promise(resolve => setTimeout(resolve, 500));
  });

  afterAll(async () => {
    if (server && server.close) server.close();
    await closeConnection();
  });

  it("Must thrown an error if deposit doesn't have an accountId", async () => {

    const deposit = {
      assetId: "BTC",
      quantity: 100
    }
    try {
      await axios.post('http://localhost:3000/deposit/', deposit);

    } catch (error: any) {
      expect(error.response.status).toBe(400);
      expect(error.response.data.error).toBe('accountId é obrigatório');
    }
  })

  it("Must create a deposit", async () => {
    const accountId = await createAccount();

    const deposit = {
      accountId,
      assetId: "BTC",
      quantity: 100
    }

    const depositOutput = await axios.post('http://localhost:3000/deposit/', deposit);

    expect(depositOutput.status).toBe(204);
  })

  it("Asset must be BTC or USD", async () => {
    const accountId = await createAccount();

    const deposit = {
      accountId,
      assetId: "EEE",
      quantity: 100
    }
    try {
      await axios.post('http://localhost:3000/deposit/', deposit);
    } catch (error: any) {
      expect(error.response.status).toBe(400);
      expect(error.response.data.error).toBe('assetId deve ser BTC ou USD');
    }
  })

  it("Quantity must be bigger than 0", async () => {
    const accountId = await createAccount();

    const deposit = {
      accountId,
      assetId: "BTC",
      quantity: 0
    }
    try {
      await axios.post('http://localhost:3000/deposit/', deposit);
    } catch (error: any) {
      expect(error.response.status).toBe(400);
      expect(error.response.data.error).toBe('quantidade precisa ser maior que zero');
    }
  })
})