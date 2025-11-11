import express, { Request, Response } from "express";
import pgp from "pg-promise";
import crypto from 'crypto';
import { validateName, validateEmail, validatePassword } from '../src/helpers/validator';
import { validateCpf } from './helpers/validateCpf';

const app = express();
app.use(express.json());

const connection = pgp()("postgres://postgres:123456@db:5432/app");

export function start(port = 3000) {
  return app.listen(port, () => {
    // eslint-disable-next-line no-console
    // console.log(`Server running at http://localhost:${port}`);
  });
}

export function closeConnection() {
  return connection.$pool.end();
}
// Se o arquivo for executado diretamente, inicia o servidor
if (require.main === module) {
  start();
}

async function existingEmail(email: string) {
  return connection.query("select * from public.account where email = $1", [email]);
}

app.post("/signup", async (req: Request, res: Response) => {
  const account = req.body;

  if (!validateCpf(account.document)) return res.status(400).json({ error: 'CPF inválido' })
  if (!validateName(account.name)) return res.status(400).json({ error: 'O nome deve ser composto por nome e sobrenome' });
  if (!validateEmail(account.email)) return res.status(400).json({ error: 'Email inválido' });

  // Verifica se o email já está cadastrado
  const [foundEmail] = await existingEmail(account.email);
  if (foundEmail) return res.status(400).json({ error: 'Email já cadastrado' })

  if (!validatePassword(account.password)) return res.status(400).json({ error: 'A senha deve ter no mínimo 8 caracteres, uma letra minúscula, uma letra maiúscula e um número' });

  const accountId = crypto.randomUUID();
  await connection.query("insert into public.account (account_id, name, email, document, password) values ($1, $2, $3, $4, $5)", [accountId, account.name, account.email, account.document, account.password]);
  res.json({
    accountId
  });
});

app.get('/accounts/:accountId', async (req: Request, res: Response) => {
  const accountId = req.params.accountId;
  const [account] = await connection.query("select * from public.account where account_id = $1", [accountId]);
  res.json({
    account
  });
});

export default app;



