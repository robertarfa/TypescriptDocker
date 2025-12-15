import AccountDAODatabase from '../src/infra/AccountDAODatabase';

it('should persist an account', async () => {
  const accountDAO = new AccountDAODatabase();
  const randomEmail = `user_${Date.now()}_${Math.floor(Math.random() * 10000)}@email.com`;
  const account = {
    accountId: crypto.randomUUID(),
    name: 'John Doe',
    email: randomEmail,
    document: '55139563061',
    password: 'SenhaForte123',
  };

  await accountDAO.saveAccount(account);
  const savedAccount = await accountDAO.getByAccountId(account.accountId);
  expect(savedAccount.account_id).toBe(account.accountId);
  expect(savedAccount.name).toBe(account.name);
  expect(savedAccount.email).toBe(account.email);
  expect(savedAccount.document).toBe(account.document);
});
