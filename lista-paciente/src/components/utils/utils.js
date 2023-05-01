export const validEmail = (email) => {
  var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

export function formatCPF(value) {
  const cpf = value.replace(/\D/g, ''); // remove all non-digit characters
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4'); // add dots and hyphen
}

export function formatCep(value) {
  let formattedCep = value.replace(/\D/g, '');

  return formattedCep.replace(/(\d{5})(\d)/, '$1-$2');
}

export function checkFormatCNS(value) {
  if (value.trim().length != 15) {
    alert('CNS incorreto!')
    return
  }

  const firstNumber = value[0]
  
  if (firstNumber == "7" || firstNumber == "8" || firstNumber == "9") {
    return this.validCnsProv(value)
  } else if (firstNumber == "1" || firstNumber == "2") {
    return this.validCns(value)
  } else {
    alert('CNS inválido!')
    return ""
  }
}

export function validCns(value) {
  let soma = "", resto = "", dv = "", pis = "", resultado = ""

  pis = value.substring(0,11)
  soma = (+pis.substring(0,1) * 15) +
    (+pis.substring(1,2) * 14) +
    (+pis.substring(2,3) * 13) +
    (+pis.substring(3,4) * 12) +
    (+pis.substring(4,5) * 11) +
    (+pis.substring(5,6) * 10) +
    (+pis.substring(6,7) * 9) +
    (+pis.substring(7,8) * 8) +
    (+pis.substring(8,9) * 7) +
    (+pis.substring(9,10) * 6) +
    (+pis.substring(10,11) * 5);

  resto = soma % 11
  dv = 11 - resto

  if (dv == 11) {
    dv = 0
  }

  if (dv == 10) {
    soma = (+pis.substring(0,1) * 15) +
      (+pis.substring(1,2) * 14) +
      (+pis.substring(2,3) * 13) +
      (+pis.substring(3,4) * 12) +
      (+pis.substring(4,5) * 11) +
      (+pis.substring(5,6) * 10) +
      (+pis.substring(6,7) * 9) +
      (+pis.substring(7,8) * 8) +
      (+pis.substring(8,9) * 7) +
      (+pis.substring(9,10) * 6) +
      (+pis.substring(10,11) * 5) + 2;

      resto = soma % 11
      dv = 11 - resto

      resultado = pis + "001" + dv
  } else {
    resultado = pis + "000" + dv
  }

  if(!value.equals(resultado)) {
    alert('CNS inválido')
  } else {
    return value
  }
}

export function validCnsProv(cns) {
  let resto = "", soma = ""
  
  soma = ((+cns.substring(0,1)) * 15) +
    ((+cns.substring(1,2)) * 14) +
    ((+cns.substring(2,3)) * 13) +
    ((+cns.substring(3,4)) * 12) +
    ((+cns.substring(4,5)) * 11) +
    ((+cns.substring(5,6)) * 10) +
    ((+cns.substring(6,7)) * 9) +
    ((+cns.substring(7,8)) * 8) +
    ((+cns.substring(8,9)) * 7) +
    ((+cns.substring(9,10)) * 6) +
    ((+cns.substring(10,11)) * 5) +
    ((+cns.substring(11,12)) * 4) +
    ((+cns.substring(12,13)) * 3) +
    ((+cns.substring(13,14)) * 2) +
    ((+cns.substring(14,15)) * 1);
  
  resto = soma % 11;
  
  if (resto != 0){
    alert('CNS errado!')
    return ""
  } else {
    return cns
  }
}
  