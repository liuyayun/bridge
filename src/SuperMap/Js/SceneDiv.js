/**
 * Created with JetBrains WebStorm.
 * User: liuyayun
 * Date: 12-11-12
 * Time: 下午5:07
 * To change this template use File | Settings | File Templates.
 */
SuperMap.Web.Util.SceneDiv=function(id,projectName,locationX,locationY,width,height){
    //这些地方后期都需要修改
    SuperMap.Web.Util.ApplicationManager.projectName=projectName;
    //设置div可以在swf上面
    var dou=document.getElementById(projectName);
    var swfParam= document.createElement("param");
    swfParam.name="wmode";
     //都可以
    //swfParam.value="transparent";
    swfParam.value="Opaque";
    dou.appendChild(swfParam);
    window.onresize=function(){
        var div=document.getElementById(id);
        div.style.left= (locationX+dou.offsetLeft).toString()+"px";
        div.style.top=(locationY+dou.offsetTop).toString()+"px";
    }
    var objDiv = document.createElement("div");
    objDiv.id=id;
    objDiv.style.position="absolute";
    objDiv.style.left= (locationX+dou.offsetLeft).toString()+"px";
    objDiv.style.top=(locationY+dou.offsetTop).toString()+"px";
    objDiv.style.width=width.toString()+"px";
    objDiv.style.height=height.toString()+"px";
    objDiv.style.zIndex=0;
    document.body.appendChild(objDiv);
}

