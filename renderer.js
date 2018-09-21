const webdriver = require('selenium-webdriver');
var chromeCapabilities = webdriver.Capabilities.chrome();

var chromeOptions = {
    'args':['--test-type', '--start-maximized', 'use-fake-ui-for-media-stream'],
    'extensions':[encode('C:\\Users\\simpa\\WebstormProjects\\PramodDoItForMe\\18.crx')]
}
chromeCapabilities.set('chromeOptions', chromeOptions);

function encode(file) {
    var stream = require('fs').readFileSync(file);
    return new Buffer(stream).toString('base64');
}

const worldbankDemo = function(){
    var complete = false;
    var driver = new webdriver.Builder()
        .withCapabilities(chromeCapabilities)
        .build();

    try {

        driver.sleep(5000);
        driver.get('https://www.worldbank.org/');
        const actions2 = driver.actions({bridge: true});
        for(var i=1; i<6; i++){
            driver.sleep(5000);
            var elementPath = '(//a[@class="dropdown-toggle"])['+i+']';
            //console.log(elementPath)
            var textPromise = driver.findElement(webdriver.By.xpath(elementPath));
            textPromise.then((elem)=>{
            var hoverPromise = actions2.move({duration:2000,origin:elem,x:0,y:0}).perform().pause(1000);

            hoverPromise.then(function(){
                //driver.sleep(2000);
                console.log("test successful");
                complete = true;
                //driver.quit();
                }).catch(function(){
                    console.log("27 element not found...")
                    console.log("*************test failed*************")
                    });
            }).catch(function(){
                console.log("31 element not found...")
                console.log("*************test failed*************")
            });

        }

    }// end of try
    catch(error){
        console.log("---------------------------------------------------------------------------------\n"+error);
        complete = false;
        driver.quit();
    }

}

worldbankDemo();