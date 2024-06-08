function validateValueImovel(value){

    if(value >= 50000){
        return true
    }
    else{
        return false
    }
}

function validateTerm(value, type){
    if(type === "Casa"|| type === "Apartamento"){
        return (value >= 1 || value <= 360) ;
    }
    else if(type === "Terreno"){
        return (value >= 1 || value <= 180);
    }
    else return false
}

function installment(value, propertyValue, term, type){
    if(validateTerm(term, type)){
        if(type == "Casa" || type == "Apartamento")
            {
                const jurosMensal = 6 / 12 / 100
                n = term
                const new_value = value - propertyValue * jurosMensal
                const numerador = new_value * jurosMensal;
                const denominador = 1 - Math.pow(1 + jurosMensal, -n)
                const prestacao =  numerador/denominador
                return prestacao
            }
        else if(type == "Terreno")
            {
                const jurosMensalTerreno = 8/12/100
                n = term
                const newValueTerreno = value - propertyValue * jurosMensalTerreno
                const numeradorTerreno = new_value * jurosMensalTerreno;
                const denominadorTerreno = 1 - Math.pow(1+jurosMensalTerreno, -n)
                const prestacaoTerreno = numeradorTerreno/denominadorTerreno
                return prestacaoTerreno
            }
    }else return {Error: "Não é possivel fazer tal operação"}
}

function monthlyIncomeValidation(monthlyIncome)
{
    if(monthlyIncome < 1300) return false
    else return true
}

function returnHtml()
{
    return document.getElementById("result_final").textContent = installment
}

function propertyValueValidation(value, propertyValue)
{
    if(value * 0.2 > propertyValue) return true
    else return false
}


function monthlyIncomeCalculation(monthlyIncome)
{
    return ((monthlyIncome *0.2) - monthlyIncome) * -1
}


function checkInstallmentPayment(value, propertyValue, term, type)
{
    if(installment(value, propertyValue, term, type) >= monthlyIncomeCalculation())
        {
            return {Error: "Não é possivel essa transação"}
        }
    else return true
}

var valueProperty = document.getElementById('propertyValue').value
var selectElement = document.getElementById('typeImovel')
var valueImovel = parseInt(document.getElementById('valueImovel').value)
var monthlyIncome = parseFloat(document.getElementById('monthlyIncome').value)
var valueTerm = parseInt(document.getElementById('term').value)


module.exports = {
    monthlyIncomeCalculation, 
    monthlyIncomeValidation,
    checkInstallmentPayment,
    propertyValueValidation,
    installment,
    validateTerm,
    validateValueImovel,
    returnHtml,
    valueProperty,
    selectElement,
    valueImovel,
    monthlyIncome,
    valueTerm
}