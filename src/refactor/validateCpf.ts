export function validateCpf(cpf: string) {
  if (cpf === undefined || cpf === null) return false;

  // cleaning cpf
  cpf = cpf
    .replace('.', '')
    .replace('.', '')
    .replace('-', '')
    .replace(" ", "");

  if (cpf.length != 11) return false;

  // tudo igual
  if (!cpf.split("").every(c => c === cpf[0])) {
    try {
      let d1, d2;
      let dg1, dg2, rest;
      let digito;
      let nDigResult;
      d1 = d2 = 0;
      dg1 = dg2 = rest = 0;

      for (let nCount = 1; nCount < cpf.length - 1; nCount++) {
        // if (isNaN(parseInt(str.substring(nCount -1, nCount)))) {
        // 	return false;
        // } else {

        digito = parseInt(cpf.substring(nCount - 1, nCount));
        d1 = d1 + (11 - nCount) * digito;

        d2 = d2 + (12 - nCount) * digito;
        // }
      };

      rest = (d1 % 11);

      // se for menor que 2 é 0, senão é 11 menos o resto
      dg1 = (rest < 2) ? dg1 = 0 : 11 - rest;
      d2 += 2 * dg1;
      rest = (d2 % 11);
      if (rest < 2)
        dg2 = 0;
      else
        dg2 = 11 - rest;

      let nDigVerific = cpf.substring(cpf.length - 2, cpf.length);
      nDigResult = "" + dg1 + "" + dg2;

      return nDigVerific == nDigResult;

      // se der problema...
    } catch (e) {
      console.error("Erro !" + e);

      return false;
    }
  } else return false;

}