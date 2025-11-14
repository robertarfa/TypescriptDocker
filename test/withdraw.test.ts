import axios from 'axios';
import type { AddressInfo } from 'net';
import { start, closeConnection } from '../src/index';

let server: any;
let baseUrl!: string;

async function createAccount() {
  const randomEmail = `user_${Date.now()}_${Math.floor(Math.random() * 10000)}@email.com`;
  const input = {
    name: 'John Doe',
    email: randomEmail,
    document: '55139563061',
    password: 'SenhaForte123',
  };
  const response = await axios.post(`${baseUrl}/signup`, input);
  return response.data.accountId;
}

describe('withdraw', () => {
  beforeAll(async () => {
    server = start(0);
    await new Promise<void>((resolve) => {
      if (server.listening) return resolve();
      server.on('listening', resolve);
    });
    const address = server.address() as AddressInfo;
    baseUrl = `http://localhost:${address.port}`;
  });

  afterAll(async () => {
    if (server && server.close) server.close();
    await closeConnection();
  });

  it("Must thrown an error if withdraw doesn't have an accountId", async () => {

    const withdraw = {
      assetId: "BTC",
      quantity: 100
    }
    try {
      await axios.post(`${baseUrl}/withdraw/`, withdraw);

    } catch (error: any) {
      if (!error.response) {
        console.error('Error without response:', error.message);
        throw error;
      }
      expect(error.response.status).toBe(400);
      expect(error.response.data.error).toBe('accountId é obrigatório');
    }
  })

  it("Must create a withdraw", async () => {
    const accountId = await createAccount();

    const withdraw = {
      accountId,
      assetId: "BTC",
      quantity: 100
    }

    const withdrawOutput = await axios.post(`${baseUrl}/withdraw/`, withdraw);

    expect(withdrawOutput.status).toBe(204);
  })

  it("Asset must be BTC or USD", async () => {
    const accountId = await createAccount();

    const withdraw = {
      accountId,
      assetId: "EEE",
      quantity: 100
    }
    try {
      await axios.post(`${baseUrl}/withdraw/`, withdraw);
    } catch (error: any) {
      if (!error.response) {
        console.error('Error without response:', error.message);
        throw error;
      }
      expect(error.response.status).toBe(400);
      expect(error.response.data.error).toBe('assetId deve ser BTC ou USD');
    }
  })

  it("Quantity must be bigger than 0", async () => {
    const accountId = await createAccount();

    const withdraw = {
      accountId,
      assetId: "BTC",
      quantity: 0
    }
    try {
      await axios.post(`${baseUrl}/withdraw/`, withdraw);
    } catch (error: any) {
      if (!error.response) {
        console.error('Error without response:', error.message);
        throw error;
      }
      expect(error.response.status).toBe(400);
      expect(error.response.data.error).toBe('quantidade precisa ser maior que zero');
    }
  })
})