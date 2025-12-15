import { IAccountDAO } from '../interfaces/IAccountDAO';
import pgp from "pg-promise";

const pgpClient = pgp();

export default class AccountDAODatabase implements IAccountDAO {
  async saveAccount(account: any): Promise<void> {
    const connection = pgp()("postgres://postgres:123456@db:5432/app");
    await connection.query("insert into public.account (account_id, name, email, document, password) values ($1, $2, $3, $4, $5)", [account.accountId, account.name, account.email, account.document, account.password]);
    await connection.$pool.end();
  }

  async getByAccountId(accountId: string): Promise<any> {
    const connection = pgp()("postgres://postgres:123456@db:5432/app");
    const [account] = await connection.query("select * from public.account where account_id = $1", [accountId]);
    await connection.$pool.end();
    return account;
  }

  async getExistingEmail(email: string): Promise<any> {
    const connection = pgpClient("postgres://postgres:123456@db:5432/app");
    await connection.query("select * from public.account where email = $1", [email]);
    await connection.$pool.end();
  }
}

export class AccountDAOMemory implements IAccountDAO {
  private accounts: any[] = [];

  async saveAccount(account: any): Promise<void> {
    this.accounts.push(account);
  }

  async getByAccountId(accountId: string): Promise<any> {
    return this.accounts.find(acc => acc.accountId === accountId) || null;
  }

  async getExistingEmail(email: string): Promise<any> {
    return this.accounts.find(acc => acc.email === email) || null;
  }
}
