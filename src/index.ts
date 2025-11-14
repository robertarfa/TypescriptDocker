import express, { Request, Response } from "express";
import pgp from "pg-promise";
import crypto from 'crypto';
import { validateName, validateEmail, validatePassword } from '../src/helpers/validator';
import { validateCpf } from './helpers/validateCpf';

const app = express();
app.use(express.json());

const pgpClient = pgp();
let connection: any = null;

function getConnection() {
  if (!connection) {
    connection = pgpClient("postgres://postgres:123456@db:5432/app");
  }
  return connection;
}

export function start(port = 3000) {
  return app.listen(port, () => {
    // eslint-disable-next-line no-console
    // console.log(`Server running at http://localhost:${port}`);
  });
}

export async function closeConnection() {
  if (!connection) return;
  const current = connection;
  connection = null;
  await current.$pool.end();
}
// Se o arquivo for executado diretamente, inicia o servidor
if (require.main === module) {
  start();
}

async function existingEmail(email: string) {
  return getConnection().query("select * from public.account where email = $1", [email]);
}

app.post("/signup", async (req: Request, res: Response) => {
  try {
    const account = req.body;

    if (!validateCpf(account.document)) return res.status(400).json({ error: 'CPF inválido' })
    if (!validateName(account.name)) return res.status(400).json({ error: 'O nome deve ser composto por nome e sobrenome' });
    if (!validateEmail(account.email)) return res.status(400).json({ error: 'Email inválido' });
    if (!validatePassword(account.password)) return res.status(400).json({ error: 'A senha deve ter no mínimo 8 caracteres, uma letra minúscula, uma letra maiúscula e um número' });

    // Verifica se o email já está cadastrado
    const [foundEmail] = await existingEmail(account.email);
    if (foundEmail) return res.status(400).json({ error: 'Email já cadastrado' })

    const accountId = crypto.randomUUID();
    await getConnection().query("insert into public.account (account_id, name, email, document, password) values ($1, $2, $3, $4, $5)", [accountId, account.name, account.email, account.document, account.password]);
    res.json({
      accountId
    });
  } catch (error: any) {
    console.error('Error in /signup:', error);
    res.status(500).json({ error: error.message || 'Erro interno do servidor' });
  }
});

app.get('/accounts/:accountId', async (req: Request, res: Response) => {
  const accountId = req.params.accountId;
  const [account] = await getConnection().query("select * from public.account where account_id = $1", [accountId]);
  res.json({
    account
  });
});

app.post('/deposit', async (req: Request, res: Response): Promise<void> => {
  try {
    const { accountId, assetId, quantity } = req.body;

    if (!accountId) {
      res.status(400).json({ error: 'accountId é obrigatório' });
      return;
    }

    if (assetId !== 'BTC' && assetId !== 'USD') {
      res.status(400).json({ error: 'assetId deve ser BTC ou USD' });
      return;
    }

    if (quantity <= 0) {
      res.status(400).json({ error: 'quantidade precisa ser maior que zero' });
      return;
    }

    const depositId = crypto.randomUUID();
    await getConnection().query(
      "insert into public.deposit (deposit_id, account_id, asset_id, quantity) values ($1, $2, $3, $4)",
      [depositId, accountId, assetId, quantity]
    );

    res.status(204).send();
    return;
  } catch (error: any) {
    console.error('Error in /deposit:', error);
    res.status(500).json({ error: error.message || 'Erro interno do servidor' });
    return;
  }
});

export default app;



