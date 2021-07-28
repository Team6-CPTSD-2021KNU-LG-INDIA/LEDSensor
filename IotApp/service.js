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
}

function light(){
    var bridge=new WebOSServiceBridge();
    var param=JSON.stringify(`{"pin":${pin}}`);
    
    bridge.onservicecallback=callback;
    
    function callback(message){
        var respond=JSON.parse(message);
        if(respond.returnValue){
            if(getDirect()){

            }
        }
        else{
            init_gpio();
        }
    }
    
    bridge.call(luna+'getValue',param);
}
function getDirect(){
    var bridge=new WebOSServiceBridge();
    var param=JSON.stringify(`{"pin":${pin}}`);
    
    bridge.onservicecallback=callback;
    
    function callback(message){
        var respond=JSON.parse(message);
        if(respond.returnValue && respond.direction=="out"){
            return true;
        }
        else{
            console.log("direction error");
            return false;
        }
    }
    
    bridge.call(luna+'getDirection',param);
}
function turn_on(){

}
function turn_off(){
    
}