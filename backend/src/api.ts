import express, { Request, Response } from "express";
import cors from "cors";
import { getAccount, signup } from '.';
const app = express();
app.use(express.json());
app.use(cors());

app.post("/signup", async (req: Request, res: Response) => {
  const account = req.body;
  try {
    const output = await signup(account);
    res.json(output);
  } catch (error: any) {
    res.status(422).json({ message: error.message })
  }

});

app.get('/accounts/:accountId', async (req: Request, res: Response) => {
  const accountId = req.params.accountId;
  console.log("accountId", accountId)
  try {
    const output = await getAccount(accountId);
    res.json(output)
  } catch (error: any) {
    res.status(422).json({ message: error.message })
  }
});

app.listen(3000);

// app.post('/deposit', async (req: Request, res: Response): Promise<void> => {
//   try {
//     const { accountId, assetId, quantity } = req.body;

//     if (!accountId) {
//       res.status(400).json({ error: 'accountId é obrigatório' });
//       return;
//     }

//     if (assetId !== 'BTC' && assetId !== 'USD') {
//       res.status(400).json({ error: 'assetId deve ser BTC ou USD' });
//       return;
//     }

//     if (quantity <= 0) {
//       res.status(400).json({ error: 'quantidade precisa ser maior que zero' });
//       return;
//     }

//     const depositId = crypto.randomUUID();
//     await getConnection().query(
//       "insert into public.deposit (deposit_id, account_id, asset_id, quantity) values ($1, $2, $3, $4)",
//       [depositId, accountId, assetId, quantity]
//     );

//     res.status(204).send();
//     return;
//   } catch (error: any) {
//     console.error('Error in /deposit:', error);
//     res.status(500).json({ error: error.message || 'Erro interno do servidor' });
//     return;
//   }
// });

// app.post('/withdraw', async (req: Request, res: Response): Promise<void> => {
//   try {
//     const { accountId, assetId, quantity } = req.body;

//     if (!accountId) {
//       res.status(400).json({ error: 'accountId é obrigatório' });
//       return;
//     }

//     if (assetId !== 'BTC' && assetId !== 'USD') {
//       res.status(400).json({ error: 'assetId deve ser BTC ou USD' });
//       return;
//     }

//     if (quantity <= 0) {
//       res.status(400).json({ error: 'quantidade precisa ser maior que zero' });
//       return;
//     }

//     const withdrawId = crypto.randomUUID();
//     await getConnection().query(
//       "insert into public.withdraw (withdraw_id, account_id, asset_id, quantity) values ($1, $2, $3, $4)",
//       [withdrawId, accountId, assetId, quantity]
//     );

//     res.status(204).send();
//     return;
//   } catch (error: any) {
//     console.error('Error in /withdraw:', error);
//     res.status(500).json({ error: error.message || 'Erro interno do servidor' });
//     return;
//   }
// });




