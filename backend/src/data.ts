import pgp from "pg-promise";

const pgpClient = pgp();

export const getExistingEmail = async (email: string) => {
  const connection = pgpClient("postgres://postgres:123456@db:5432/app");
  await connection.query("select * from public.account where email = $1", [email]);
  await connection.$pool.end();
}

export const saveAccount = async (account: any) => {
  const connection = pgp()("postgres://postgres:123456@db:5432/app");
  await connection.query("insert into public.account (account_id, name, email, document, password) values ($1, $2, $3, $4, $5)", [account.accountId, account.name, account.email, account.document, account.password]);
  await connection.$pool.end();
};

export const getByAccountId = async (accountId: string) => {
  const connection = pgp()("postgres://postgres:123456@db:5432/app");
  const [account] = await connection.query("select * from public.account where account_id = $1", [accountId]);
  await connection.$pool.end();
  return account;
};

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




