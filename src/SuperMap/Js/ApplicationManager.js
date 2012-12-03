/**
 * Created with JetBrains WebStorm.
 * User: liuyayun
 * Date: 12-11-8
 * Time: 上午10:54
 * To change this template use File | Settings | File Templates.
 */
SuperMap.Web.Util.ApplicationManager=function(){

}
SuperMap.Web.Util.ApplicationManager.projectName="";
SuperMap.Web.Util.ApplicationManager.classHashTable=new SuperMap.Web.Util.HashTable();
/**
 * flex调用js的入口
 */
SuperMap.Web.Util.ApplicationManager.initBridgeFlexToJs=function(){

    //接收flex传过来的东西
    var agr=arguments[0];
    var result;
    //属性都是通过方法get和set来控制的，归为方法里面，
    // 并且类初始化和事件不会存在返回值，只有方法存在返回值
    switch(agr["action"])
    {
        case "CLASS":
            this.initClass(agr);
            break;
        case "FUNCTION":
            result=this.initFunction(agr);
            break;
        case "FIELD":
            result=this.initField(agr);
            break;
    }
    return result;
}
/**
 * 初始化类
 * @param classOpentions
 */
SuperMap.Web.Util.ApplicationManager.initClass=function(classOpentions){
    currentKey=classOpentions["key"].toString();
    var args =  classOpentions["realArgument"];
    var argumentString ="";
    if(args!=undefined)
    {
        argumentString="SuperMap.Web.Util.ApplicationManager.parseArguments(\'"+currentKey+"\',\'"+args[0]+"\')";
        if(args.length>1)
        {
            for(var i=1;i<args.length;i++){
                argumentString+=",SuperMap.Web.Util.ApplicationManager.parseArguments(\'"+currentKey+"\',\'"+args[i]+"\')";
            }
        }
    }
    var str = "new "+classOpentions["className"]+"("+argumentString+")";
    var  object = eval("("+str+")");
    this.classHashTable.add(classOpentions["key"],object);
}
/**
 * 调用类的方法(属性也属于方法)
 * @param functionOpentions
 */
SuperMap.Web.Util.ApplicationManager.initFunction=function(functionOpentions){
    //找到需要调用的对象，
    //var object=this.classHashTable.getItem(parseInt(functionOpentions["key"]));

    currentKey=functionOpentions["key"].toString();
    var args =  functionOpentions["realArgument"];
    var argumentString ="";
    if(args!=undefined)
    {
        argumentString="SuperMap.Web.Util.ApplicationManager.parseArguments(\'"+currentKey+"\',\'"+args[0]+"\')";
        if(args.length>1)
        {
            for(var i=1;i<args.length;i++){
                argumentString+=",SuperMap.Web.Util.ApplicationManager.parseArguments(\'"+currentKey+"\',\'"+args[i]+"\')";
            }
        }
    }
    var str = "SuperMap.Web.Util.ApplicationManager.classHashTable.getItem(parseInt(\'"+functionOpentions.key+"\'))[\'"+functionOpentions.functionName+"\']("+argumentString+")";
    var result = eval("("+str+")");
    if(functionOpentions.isReturn)
    {
        result=SuperMap.Web.Util.ApplicationManager.changeToArray(result);
        return result;
    }

}
SuperMap.Web.Util.ApplicationManager.initField=function(fieldOpentions){
    var  fieldOperate=fieldOpentions["functionName"].split("_")[0];
    var  fieldName=fieldOpentions["functionName"].split("_")[1];
    if(fieldOperate=="get")
    {
        var str1="SuperMap.Web.Util.ApplicationManager.classHashTable.getItem(parseInt(\'"+fieldOpentions.key+"\'))[\'"+fieldName+"\']";
        var result = eval(str1);
        if(fieldOpentions.isReturn)
        {
            result=SuperMap.Web.Util.ApplicationManager.changeToArray(result);
            return result;
        }
    }
    else if(fieldOperate=="set")
    {
        currentKey=fieldOpentions["key"].toString();
        var args =  fieldOpentions["realArgument"];
        var str2="SuperMap.Web.Util.ApplicationManager.classHashTable.getItem(parseInt(\'"+fieldOpentions.key+"\'))[\'"+fieldName+"\']=SuperMap.Web.Util.ApplicationManager.parseArguments(\'"+currentKey+"\',\'"+args[0]+"\')";
        eval(str2);
    }
}
/**
 * 在初始化类的时候的回调函数
 * @param key  回调函数所绑定的对象的key，在传给js端时方便绑定
 * @param callbackString   回调给flex端的哪个方法
 * @return {Function}
 */
SuperMap.Web.Util.ApplicationManager.callbackFunction = function(key,callbackString){
    return function(result){

        result=SuperMap.Web.Util.ApplicationManager.changeToArray(result);
        var dou=document.getElementById(SuperMap.Web.Util.ApplicationManager.projectName);
        if(callbackString=="succeedCallback")
        {
            dou.style.zoom=1;
        }
        dou.initBridgeJsToFlex(key,callbackString,result);
    }
}
/**
 * 将传进的数组转换为相应的参数
 * @param key
 * @param argStr
 * @return {*}
 */
SuperMap.Web.Util.ApplicationManager.parseArguments = function(key,argArray){
    //主要用于参数里面有数组的时候，但是只能有一重数组，因为eval的解析会把两重以上的数组解析成一重数组，全是以逗号分隔的字符串
    if(argArray.split(",").length>1)
    {
        var argStr=argArray.split(",");
        var resultArray=[];
        for(var i=0;i<argStr.length;i++)
        {
            resultArray[i]=arguments.callee(key,argStr[i]);
        }
        return resultArray;
    }
    else{
        var a = argArray.split("$");
        var value = a[0];
        var type = a[1];
        var valueResult = null;
        if(value&&type){
            switch(type)
            {
                case "Function":
                    valueResult = this.callbackFunction(key,value);
                    break;
                case "Element":
                    valueResult=document.getElementById(value);
                    break;
                case "String":
                    valueResult=String(value);
                    break;
                case "Number":
                    valueResult=Number(value);
                    break;
                case "Boolean":
                    valueResult=Boolean(value);
                    break;
                case "Object":
                    valueResult=SuperMap.Web.Util.ApplicationManager.classHashTable.getItem(parseInt(value));
                    break;
                case "Enum":
                    valueResult=eval(value);
                    break;
            }
        }
        return valueResult;
    }

}
SuperMap.Web.Util.ApplicationManager.createSoleKey=function(){
    var nowData=new Date();
    var soleKey=SuperMap.Web.Util.ApplicationManager.verifySoleKey(nowData.getTime()*2);
    return soleKey;
}
SuperMap.Web.Util.ApplicationManager.verifySoleKey=function(timeNumber){
    if(SuperMap.Web.Util.ApplicationManager.classHashTable.contains(timeNumber))
    {
        timeNumber+=1;
        arguments.callee(timeNumber);
    }
    return timeNumber;
}
SuperMap.Web.Util.ApplicationManager.changeToArray=function(oldArray){
    var newArray;
    switch(typeof oldArray)
    {
        case "undefined":
            //未定义的情况直接返回，就是未定义
            break;
        case "string":
            newArray=oldArray+"$String";
            break;
        case "number":
            newArray=oldArray;
            break;
        case "boolean":
            newArray=oldArray;
            break;
        case "function":
            //暂不考虑
            break;
        case "object":
        {
            if(oldArray!=null)
            {
                //非空才能使用constructor判定
                switch (oldArray.constructor)
                {
                    case Array:
                    {
                        newArray=[];
                        for(var i=0;i<oldArray.length;i++)
                        {
                            newArray[i]=SuperMap.Web.Util.ApplicationManager.changeToArray(oldArray[i]);
                        }
                        break;
                    }
                    case Date:
                    {
                        //as里面的Date还没测试是否一样，估计不一样，可能此参数用不上
                        break;
                    }
                    default :
                    {
                        //自己的类
                        var key=SuperMap.Web.Util.ApplicationManager.createSoleKey();
                        SuperMap.Web.Util.ApplicationManager.classHashTable.add(key,oldArray);
                        //获取类名需要考虑一下，自己创建的简单类名不是下面这样获取的
                        newArray= key.toString()+"$"+oldArray.constructor.__typeName.toString();
                        //newArray=key.toString()+"$"+oldArray.constructor.name;
                    }
                }
            }
            else
            {
                //此为空的情况
                newArray=oldArray;
            }
        }
    }
    return newArray;
}
