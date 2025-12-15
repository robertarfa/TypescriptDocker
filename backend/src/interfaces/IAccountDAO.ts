export interface IAccountDAO {
  saveAccount(account: any): Promise<void>;
  getByAccountId(accountId: string): Promise<any>;
  getExistingEmail(email: string): Promise<any>;
}