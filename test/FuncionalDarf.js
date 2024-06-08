
const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const { Options } = require('selenium-webdriver/chrome');
const fs = require('fs');
const path = require('path');

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

  
  let driver = await builder.build();

  try {
   
    await driver.get('https://stealth-faithful-geese.glitch.me/darf');

    
    await driver.wait(until.elementLocated(By.id('inpBuy')), 20000);
    await driver.wait(until.elementIsVisible(driver.findElement(By.id('inpBuy'))), 20000);
    await driver.wait(until.elementLocated(By.id('inpSell')), 20000);
    await driver.wait(until.elementIsVisible(driver.findElement(By.id('inpSell'))), 20000);
    await driver.wait(until.elementLocated(By.id('inpQtd')), 20000);
    await driver.wait(until.elementIsVisible(driver.findElement(By.id('inpQtd'))), 20000);

    
    const screenshotDir = './fotos/darf';
    makeDirs(screenshotDir);

    
    await driver.takeScreenshot().then((image, err) => {
      fs.writeFileSync(path.join(screenshotDir, 'inicio-darf.png'), image, 'base64');
      console.log('Gravou Foto Inicial');
    });

    
    await driver.findElement(By.id('inpBuy')).sendKeys(20, Key.RETURN);
    await driver.findElement(By.id('inpSell')).sendKeys(60, Key.RETURN);
    await driver.findElement(By.id('inpQtd')).sendKeys(10, Key.RETURN);

   
    await driver.takeScreenshot().then((image, err) => {
      fs.writeFileSync(path.join(screenshotDir, 'valorDigitado-darf.png'), image, 'base64');
      console.log('Gravou Foto com Valores Digitados');
    });

    
    const calculaButton = await driver.findElement(By.css('button[type="submit"]'));
    if (await calculaButton.isDisplayed()) {
      console.log('Passou: Botão de cálculo está visível');
    } else {
      console.log('Falhou: Botão de cálculo não está visível');
    }
    await calculaButton.click();

  
    // await driver.wait(until.elementLocated(By.id('resultado')), 20000);
    // await driver.wait(until.elementIsVisible(driver.findElement(By.id('resultado'))), 20000);
    await driver.wait(esperarTextoAtualizarPorRequisicao('R$ 00,00'), 10000);

  
    await driver.takeScreenshot().then((image, err) => {
      fs.writeFileSync(path.join(screenshotDir, 'fim-darf.png'), image, 'base64');
      console.log('Gravou Foto Final');
    });

    
    // const resultado = await driver.findElement(By.id('resultado')).getText();
    // if (resultado.includes('R$')) {
    //   console.log('Passou: Cálculo de FGTS exibido corretamente');
    // } else {
    //   console.log('Falhou: Cálculo de FGTS não exibido corretamente');
    // }
  } catch (error) {
    console.error('Teste funcional falhou:', error);
  } finally {
    await driver.quit();
  }
})();
