class Validator {

  validateInputs(inputData) {
    let errorMsg = "";
    if(!inputData.veiculo) {
      errorMsg +="Por favor digite o nome do veiculo.\n"
    }
    if(!inputData.descricao) {
      errorMsg +="Por favor digite a descricao do veiculo.\n"
    }
    if(!inputData.ano) {
      errorMsg +="O ano do veiculo deve ser preenchido.\n"
    }
    if((inputData.ano) && (inputData.ano.toString().match(/[^0-9]/g))) {
      errorMsg +="O ano do veiculo deve ser um numero.\n"
    }
    if((inputData.ano) && (inputData.ano<1950)) {
      errorMsg +="O ano do veiculo deve ser a partir de 1950.\n"
    }
    // if(inputData.country.length > 0 && !inputData.country.match(/^[a-z|A-Z][a-z|A-Z]$/)) {
    //   errorMsg +="Country code must be two letters.\n"
    // }
    if(errorMsg.length === 0){
      return true;
    } else {
      alert(errorMsg);
      return false;
    }
  }
}

export default Validator;
