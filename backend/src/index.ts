import crypto from 'crypto';
import { validateName, validateEmail, validatePassword } from '../src/helpers/validator';
import { validateCpf } from './helpers/validateCpf';
import { getExistingEmail, saveAccount, getByAccountId } from './data';

export const signup = async (account: any) => {
  account.accountId = crypto.randomUUID();

  if (!validateCpf(account.document)) throw new Error('CPF inválido')
  if (!validateName(account.name)) throw new Error('O nome deve ser composto por nome e sobrenome');
  if (!validateEmail(account.email)) throw new Error('Email inválido');
  if (!validatePassword(account.password)) throw new Error('A senha deve ter no mínimo 8 caracteres, uma letra minúscula, uma letra maiúscula e um número');

  // Verifica se o email já está cadastrado
  const foundEmail = await getExistingEmail(account.email);
  if (foundEmail != null) throw new Error('Email já cadastrado')
  await saveAccount(account)
  return {
    accountId: account.accountId
  };
};

export const getAccount = async (accountId: string) => {
  const account = await getByAccountId(accountId);
  return account;
};
