function verifyDifference(valorAntigo: number, novoValor: number) {
  const diferenca = Math.abs(novoValor - valorAntigo);
  const porcentagem = (diferenca / valorAntigo) * 100;

  return porcentagem === 10;
}

export default verifyDifference;