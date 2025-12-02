// import axios from 'axios';
// import type { AddressInfo } from 'net';

// const BASE_URL = "http://localhost:3000";

// axios.defaults.validateStatus = () => true;

// async function createAccount() {
//   const randomEmail = `user_${Date.now()}_${Math.floor(Math.random() * 10000)}@email.com`;
//   const input = {
//     name: 'John Doe',
//     email: randomEmail,
//     document: '55139563061',
//     password: 'SenhaForte123',
//   };
//   const response = await axios.post(`${BASE_URL}/signup`, input);
//   return response.data.accountId;
// }

// describe('deposit', () => {
//   it("Must thrown an error if deposit doesn't have an accountId", async () => {

//     const deposit = {
//       assetId: "BTC",
//       quantity: 100
//     }
//     const output = await axios.post(`${BASE_URL}/deposit/`, deposit);
//     expect(output.status).toBe(400);
//     expect(output.data.error).toBe('accountId é obrigatório');
//   })

//   it("Must create a deposit", async () => {
//     const accountId = await createAccount();

//     const deposit = {
//       accountId,
//       assetId: "BTC",
//       quantity: 100
//     }

//     const depositOutput = await axios.post(`${BASE_URL}/deposit/`, deposit);

//     expect(depositOutput.status).toBe(204);
//   })

//   it("Asset must be BTC or USD", async () => {
//     const accountId = await createAccount();

//     const deposit = {
//       accountId,
//       assetId: "EEE",
//       quantity: 100
//     }
//     const output = await axios.post(`${BASE_URL}/deposit/`, deposit);
//     expect(output.status).toBe(400);
//     expect(output.data.error).toBe('assetId deve ser BTC ou USD');
//   })

//   it("Quantity must be bigger than 0", async () => {
//     const accountId = await createAccount();

//     const deposit = {
//       accountId,
//       assetId: "BTC",
//       quantity: 0
//     }
//     const output = await axios.post(`${BASE_URL}/deposit/`, deposit);
//     expect(output.status).toBe(400);
//     expect(output.data.error).toBe('quantidade precisa ser maior que zero');
//   })
// })