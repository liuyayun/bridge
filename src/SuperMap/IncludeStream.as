package SuperMap
{
	import SuperMap.Js.ApplicationManagerStream;
	import SuperMap.Js.HashTableStream;
	import SuperMap.Js.SceneDivStream;
	import SuperMap.lib_Ajax.IServerJava6RStream;
	import SuperMap.lib_Ajax.JsStream;
	import SuperMap.lib_Ajax.MicrosoftAjaxStream;
	import SuperMap.lib_Realspace.RealspaceStream;

	public class IncludeStream 
	{
		public function IncludeStream() 
		{  
		
		}
		public function toString():String
		{
			var microsoftAjaxStream:MicrosoftAjaxStream=new MicrosoftAjaxStream();
			var jsStream:JsStream=new JsStream();
			var realspaceStream:RealspaceStream=new RealspaceStream();
			var iServerJava6RStream:IServerJava6RStream=new IServerJava6RStream();
			var hashTableStream:HashTableStream=new HashTableStream();
			var applicationManagerStream:ApplicationManagerStream=new ApplicationManagerStream();
			var sceneDivStream:SceneDivStream=new SceneDivStream();
			return microsoftAjaxStream.toString()+jsStream.toString()+realspaceStream.toString()+iServerJava6RStream.toString()+hashTableStream.toString()+applicationManagerStream.toString()+sceneDivStream.toString();
		}
	}
}