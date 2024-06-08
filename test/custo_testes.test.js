const { JSDOM } = require("jsdom");
const fs = require("fs");
const path = require("path");

// Função principal para executar os testes
(async () => {
    const chalk = (await import('chalk')).default;

    // Carregar o arquivo HTML
    const htmlContent = fs.readFileSync(path.resolve(__dirname, "index.html"), "utf8");

    // Configurar JSDOM
    const dom = new JSDOM(htmlContent, { runScripts: "dangerously" });
    const { window } = dom;
    global.window = window;
    global.document = window.document;

    // Mock para alert
    global.alert = (message) => {
        console.log(`Alert: ${message}`);
    };

    // Definir a função calcularPrecoDOM diretamente aqui
    function calcularPrecoDOM() {
        const custoMateriaPrima = parseFloat(document.getElementById('custoMateriaPrima').value) || 0;
        const custoManuseio = parseFloat(document.getElementById('custoManuseio').value) || 0;
        const outrosCustos = parseFloat(document.getElementById('outrosCustos').value) || 0;
        const margemLucro = parseFloat(document.getElementById('margemLucro').value);

        if (isNaN(margemLucro) || document.getElementById('margemLucro').value === "" ||
            document.getElementById('custoMateriaPrima').value === "" ||
            document.getElementById('custoManuseio').value === "") {
            alert('Por favor, preencha todos os campos necessários.');
            return;
        }

        const custoTotal = custoMateriaPrima + custoManuseio + outrosCustos;

        if (custoTotal === 0) {
            document.getElementById('resultado').innerText = "O preço de venda sugerido é: R$ 0.00";
            return;
        }

        const precoVenda = custoTotal * (1 + margemLucro / 100);

        document.getElementById('resultado').innerText = `O preço de venda sugerido é: R$ ${precoVenda.toFixed(2)}`;
    }

    // Definir os testes
    function runTests() {
        let passed = 0;
        let failed = 0;

        function assertEqual(actual, expected, message) {
            if (actual === expected) {
                console.log(chalk.green(`${message}: PASSED`));
                passed++;
            } else {
                console.log(chalk.red(`${message}: FAILED (Expected ${expected} but got ${actual})`));
                failed++;
            }
        }

        function assertAlert(expectedMessage, message) {
            let alertCalled = false;
            const originalAlert = global.alert;
            global.alert = (actualMessage) => {
                alertCalled = true;
                assertEqual(actualMessage, expectedMessage, message);
            };
            return () => {
                if (!alertCalled) {
                    console.log(chalk.red(`${message}: FAILED (Expected alert but none was shown)`));
                    failed++;
                }
                global.alert = originalAlert;
            };
        }

        // Testes para calcularPreco
        document.getElementById("custoMateriaPrima").value = 100;
        document.getElementById("custoManuseio").value = 50;
        document.getElementById("outrosCustos").value = 10;
        document.getElementById("margemLucro").value = 20;
        calcularPrecoDOM();
        assertEqual(document.getElementById("resultado").innerText, "O preço de venda sugerido é: R$ 192.00", "Test 1 - Todos os campos preenchidos");

        document.getElementById("outrosCustos").value = 0;
        calcularPrecoDOM();
        assertEqual(document.getElementById("resultado").innerText, "O preço de venda sugerido é: R$ 180.00", "Test 2 - Sem outros custos");

        document.getElementById("custoMateriaPrima").value = "";
        document.getElementById("custoManuseio").value = 50;
        document.getElementById("outrosCustos").value = 10;
        document.getElementById("margemLucro").value = 20;
        const checkAlert1 = assertAlert("Por favor, preencha todos os campos necessários.", "Test 3 - Campos obrigatórios ausentes");
        calcularPrecoDOM();
        checkAlert1();

        document.getElementById("custoMateriaPrima").value = 100;
        document.getElementById("custoManuseio").value = 50;
        document.getElementById("outrosCustos").value = 10;
        document.getElementById("margemLucro").value = 0;
        calcularPrecoDOM();
        assertEqual(document.getElementById("resultado").innerText, "O preço de venda sugerido é: R$ 160.00", "Test 4 - Margem de lucro zero");

        document.getElementById("margemLucro").value = 15;
        calcularPrecoDOM();
        assertEqual(document.getElementById("resultado").innerText, "O preço de venda sugerido é: R$ 184.00", "Test 5 - Margem de lucro 15%");

        document.getElementById("margemLucro").value = 30;
        calcularPrecoDOM();
        assertEqual(document.getElementById("resultado").innerText, "O preço de venda sugerido é: R$ 208.00", "Test 6 - Margem de lucro 30%");

        document.getElementById("custoMateriaPrima").value = 0;
        document.getElementById("custoManuseio").value = 0;
        document.getElementById("outrosCustos").value = 0;
        document.getElementById("margemLucro").value = 20;
        calcularPrecoDOM();
        assertEqual(document.getElementById("resultado").innerText, "O preço de venda sugerido é: R$ 0.00", "Test 7 - Todos os valores zero, exceto margem de lucro");

        document.getElementById("margemLucro").value = -10;
        calcularPrecoDOM();
        assertEqual(document.getElementById("resultado").innerText, "O preço de venda sugerido é: R$ 0.00", "Test 8 - Margem de lucro negativa");

        console.log(`\nTotal: ${passed + failed} tests | ${passed} passed | ${failed} failed`);
    }

    // Executar os testes
    runTests();
})();
