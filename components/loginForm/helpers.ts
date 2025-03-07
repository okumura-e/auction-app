export const formatCpf = (cpf: string): string => {
  const digitsOnly = cpf.replace(/\D/g, "");
  return digitsOnly
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})/, "$1-$2")
    .replace(/(-\d{2})\d+$/, "$1");
};
