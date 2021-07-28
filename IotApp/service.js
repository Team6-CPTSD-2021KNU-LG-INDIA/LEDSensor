const luna='luna-send -n 1 -f luna://com.webos.service.peripheralmanager/gpio/';
const pin="gpio1";

function init_gpio(){
    var bridge=new WebOSServiceBridge();
    var param=JSON.stringify('{}');
    
    bridge.onservicecallback=callback;
    
    function callback(message){
        var respond=JSON.parse(message);
        if(pin in respond.gpioList && respond.gpioList[pin].status=="available"){
            gpioOpen();
            gpioOutlow();
        }
    }
    
    bridge.call(luna+'list',param);
};

function gpioOpen(){
    var bridge=new WebOSServiceBridge();
    var param=JSON.stringify(`{"pin":${pin}}`);

    bridge.onservicecallback=callback;

    function callback(message){
        var respond=JSON.parse(message);
        console.log("open_respond:"+respond.returnValue);
    }

    bridge.call(luna+'open',param);
};

function gpioOutlow(){
    var bridge=new WebOSServiceBridge();
    var param=JSON.stringify(`{"pin":${pin}, "Direction":"outLow"}`);

    bridge.onservicecallback=callback;

    function callback(message){
        var respond=JSON.parse(message);
        console.log("open_respond:"+respond.returnValue);
    }

    bridge.call(luna+'setDirection',param);
};

function light(){
    var bridge=new WebOSServiceBridge();
    var param=JSON.stringify(`{"pin":${pin}}`);
    
    bridge.onservicecallback=callback;
    
    function callback(message){
        var respond=JSON.parse(message);
        if(respond.value=="low"){
            turn_on();
        }
        else{
            turn_off();
        }
    }
    
    bridge.call(luna+'getValue',param);
};
function turn_on(){
    var bridge=new WebOSServiceBridge();
    var param=JSON.stringify(`{"pin":${pin}, "value":"highj"}`);

    bridge.onservicecallback=callback;

    function callback(message){
        var respond=JSON.parse(message);
        console.log("open_respond:"+respond.returnValue);
    }

    bridge.call(luna+'setValue',param);
};
function turn_off(){
    var bridge=new WebOSServiceBridge();
    var param=JSON.stringify(`{"pin":${pin}, "value":"low"}`);

    bridge.onservicecallback=callback;

    function callback(message){
        var respond=JSON.parse(message);
        console.log("open_respond:"+respond.returnValue);
    }

    bridge.call(luna+'setValue',param);
};

init_gpio();