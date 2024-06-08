// npm install selenium-webdriver
// npm install --save-dev start-server-and-test
//"e2e-test": "start-server-and-test http://localhost:3000/ht test2"

const { Builder, Browser, By,Key,  until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const { Options } = require('selenium-webdriver/chrome');

function esperarTextoAtualizarPorRequisicao(textoInicial) {
  return async function(driver) {
      const element = await driver.findElement(By.id('profitOrLoss'));
      const text = await element.getText();
      console.log(text)
      return text !== textoInicial;
  };
}

const makeDirs = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

(async () => {

   // Configuração do ambiente do WebDriver e opções do navegador
   const screen = {
    width: 1024,
    height: 720
  };

  const chromeOptions = new Options();
  chromeOptions.addArguments('--headless');
  chromeOptions.addArguments('--no-sandbox');
  chromeOptions.windowSize(screen);

  const builder = new Builder()
    .forBrowser('chrome')
    .setChromeOptions(chromeOptions);

    // Criação da instância do WebDriver
  let driver = await builder.build();

  try {
    
    // Navegação para a página HTML
    await driver.get('https://stealth-faithful-geese.glitch.me/darf');
      //'https://aeolian-momentous-cellar.glitch.me/Example');

    // Wait for 5 secs to let the dynamic content to load
    await driver.sleep(15000);
    
    // Esperar o site carregar completamente

    await driver.takeScreenshot().then((image, err) => {
        require('fs').writeFileSync('./fotos/darf/inicio-darf.png', image, 'base64', function (err) {
          if (err == null){
              console.log('Gravou Foto');
          }else{
              console.error('Erro ->' + err);
          }
  
        });
      });
  
    await driver.findElement(By.name('inpBuy')).sendKeys(20, Key.RETURN);
    await driver.findElement(By.name('inpSell')).sendKeys(50, Key.RETURN);
    await driver.findElement(By.name('inpQtd')).sendKeys(10, Key.RETURN);

   // Captura de tela final
    await driver.takeScreenshot().then((image, err) => {
      require('fs').writeFileSync('./fotos/darf/valorDigitado-darf.png', image, 'base64', function (err) {
        if (err == null){
            console.log('Gravou Foto');
        }else{
            console.error('Erro ->' + err);
        }
      });
    });
    
    // Verificação dos botões 
    const calculaButton = await driver.findElement(By.id('btnAdd'));

   // valorAltura = await driver.findElement(By.id('valorAltura'));
   // await valorAltura.sendKeys('10');

   // valorBase = await driver.findElement(By.id('valorBase'));
   // await valorBase.sendKeys('4');

    // Clique no botão 
    await driver.findElement(By.name('btnAdd')).click();

    await driver.wait(esperarTextoAtualizarPorRequisicao('R$ 00,00'), 10000);

    // await calculaButton.click();

    // await driver.wait(15000);

    // Captura de tela final
    await driver.takeScreenshot().then((image, err) => {
      require('fs').writeFileSync('./fotos/darf/fim-darf.png', image, 'base64', function (err) {
        if (err == null){
            console.log('Gravou Foto');
        }else{
            console.error('Erro ->' + err);
        }

      });
    });
    // Encerramento do WebDriver
    
  } catch (error) {
    console.error('Teste funcional falhou:', error);
  } finally {
    await driver.quit();
  }

})();

