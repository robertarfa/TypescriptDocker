import crypto from 'crypto';
import { validateName, validateEmail, validatePassword } from '../helpers/validator';
import { validateCpf } from '../helpers/validateCpf';
import { IAccountDAO } from '../interfaces/IAccountDAO';

export default class AccountService {

  constructor(readonly accountDAO: IAccountDAO) {

  }

  async signup(account: any) {
    account.accountId = crypto.randomUUID();

    if (!validateCpf(account.document)) throw new Error('CPF inválido')
    if (!validateName(account.name)) throw new Error('O nome deve ser composto por nome e sobrenome');
    if (!validateEmail(account.email)) throw new Error('Email inválido');
    if (!validatePassword(account.password)) throw new Error('A senha deve ter no mínimo 8 caracteres, uma letra minúscula, uma letra maiúscula e um número');

    // Verifica se o email já está cadastrado
    const foundEmail = await this.accountDAO.getExistingEmail(account.email);
    if (foundEmail != null) throw new Error('Email já cadastrado')
    await this.accountDAO.saveAccount(account)
    return {
      accountId: account.accountId
    };
  };

  async getAccount(accountId: string) {
    const account = await this.accountDAO.getByAccountId(accountId);
    return account;
  };

}