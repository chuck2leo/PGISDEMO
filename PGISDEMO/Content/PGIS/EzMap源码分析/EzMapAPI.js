EzServerClient = {
	GlobeParams:{
		/**
		 *参数说明：设置图图片请求地址，三维数组第二层中：[][0]指图片服务器名称;[][1])指图片服务器地址;[][2]指叠加在[][1]之上的图片服务器地址（[][2]可省略）
		 *[][3]用来标识服务地址类型，可以是2010,2005，JiAo，WMTS，EzMapTDT，TDT；同时可以配置该服务类型中需要配置的参数(参数见图层API)，如下所示.
		 *参数类型：{[][(2|3)][]String} String类型的n*(2|3)*n的三维数组
		 *取值范围：无限制
		 *默认值：无
		 *参数举例：如下所示
		 *MapSrcURL:[["map-jw-china",["http://172.18.69.73:8080/EzServer66/Maps/map-jw-china"]]]
		 */
	    MapSrcURL:[["矢量地图",["http://10.119.255.58:8080/PGIS_S_TileMapServer/Maps/PGISSL"],"2010"],
	               ["影像地图",["http://10.119.255.58:8080/PGIS_S_TileMapServer/Maps/PGISYX"],"2010"],
	               ["矢影地图",["http://10.119.255.58:8080/PGIS_S_TileMapServer/Maps/PGISSLYX"],"2010"],
	               ["2.5维矢量地图",["http://10.119.255.58:8080/PGIS_S_TileMapServer/Maps/PGISSL25"],"2010"],
	               ["2.5D地图",["http://10.119.255.58:8080/PGIS_S_TileMapServer/Maps/PGIS25W"],"2010"],          
                   ["天地图矢量",["http://10.119.255.58:8080/PGIS_S_TileMapServer/Maps/WZTDTSL"],"EzMapTDT_[{source:'EzServer'}]"],
                   ["天地图影像",["http://10.119.255.58:8080/PGIS_S_TileMapServer/Maps/WZTDTYX"],"EzMapTDT_[{source:'EzServer'}]"]
                 ],
       	/**
       	*参数说明：设置地图版权信息
       	*参数类型：{String} 字符串
       	*取值范围：无限制
       	*默认值：无
       	*参数举例：如下所示
       	*/        
        Copyright:"",
		/**
		 *参数说明：设置地图初始化中心位置
		 *参数类型：{[2]Float} 长度为2的Float类型数组
		 *取值范围：无限制
		 *默认值：无
		 *参数举例：如下所示
		 */
		CenterPoint:[120.68066,28.01952],
		/**
		 *参数说明：设置全图显示时地图显示范围
		 *参数类型：{[4]Float} 长度为4的Float类型数组
		 *取值范围：无限制
		 *默认值：无
		 *参数举例：如下所示
		 */
		MapFullExtent:[120.59423,27.93786,120.8059,28.06774],
		/**
		 *参数说明：设置地图初始显示级别
		 *参数类型：{Float}
		 *取值范围：无限制
		 *默认值：无
		 *参数举例：如下所示
		 */
		MapInitLevel:11,
		/**
		 *参数说明：设置地图显示的最大级别
		 *参数类型：{Float}
		 *取值范围：[0,22]
		 *默认值：无
		 *参数举例：如下所示
		 */
		MapMaxLevel:20,
		/**
		 *参数说明：设置地图级别的偏移量（可为正负数：当前级别的实际级别=当前级别-EzServerClient.GlobeParams.ZoomOffset）
		 *参数类型：{Float}
		 *取值范围：无限制
		 *默认值：0
		 *参数举例：如下所示
		 */
		ZoomOffset:0,
		/**
		 *参数说明：设置来源地图图片大小（根据图片来源服务器提供图片的大小决定）
		 *参数类型：{Int}
		 *取值范围：128|256
		 *默认值：无
		 *参数举例：如下所示
		 */
		MapUnitPixels:256,
		/**
		 *参数说明：设置地图坐标系类型：经纬度坐标系为1；地方坐标时为114699
		 *参数类型：{Int}
		 *取值范围：无限制
		 *默认值：无
		 *参数举例：如下所示
		 */
		MapCoordinateType:1,
		
		/**
		 *参数说明：设置地方坐标系缩放比例（根据切图时所给定的值设定此值）
		 *参数类型：{Int}
		 *取值范围：无限制
		 *默认值：114699
		 *参数举例：如下所示
		 */
		MapConvertScale:114699,
		/**
		 *参数说明：设置地方坐标系X轴偏移量（此时，根据切图时所给定的值设定此值）
		 *参数类型：{Int}
		 *取值范围：无限制
		 *默认值：无
		 *参数举例：如下所示
		 */
		MapConvertOffsetX : 0,
		/**
		 *参数说明：设置地方坐标系Y轴偏移量（此时，根据切图时所给定的值设定此值）
		 *参数类型：{Int}
		 *取值范围：无限制
		 *默认值：无
		 *参数举例：如下所示
		 */
		MapConvertOffsetY : 0,
		/**
		 *参数说明：设置地图图片是否叠加
		 *参数类型：{Boolean}
		 *取值范围：true|false
		 *默认值：无
		 *参数举例：如下所示
		 */
		IsOverlay : true,
		/**
		 *参数说明：设置请求地图图片来源是否通过代理
		 *参数类型：{Boolean}
		 *取值范围：true|false
		 *默认值：无
		 *参数举例：如下所示
		 */
		MapProx : false,
		/**
		 *参数说明：设置地图比例尺级别是降序还是升序的，以及采用的是什么版本的切图地图
		 *参数类型：{Int}
		 *取值范围：{0,1,2,3}
		 *默认值：0
		 *参数举例：如下所示
		 *
		 *比例尺等级从上往下升序，EzServer服务器端2005切图等级升序
		 *EzServerClient.GlobeParams.ZoomLevelSequence = 0;
		 *比例尺等级从上往下降序，EzServer服务器端2005切图等级升序
		 *EzServerClient.GlobeParams.ZoomLevelSequence = 1;
		 *比例尺等级从上往下降序，EzServer服务器端2010切图等级降序
		 *EzServerClient.GlobeParams.ZoomLevelSequence = 2;
		 *比例尺等级从上往下升序，EzServer服务器端2010切图等级降序
		 *EzServerClient.GlobeParams.ZoomLevelSequence = 3;
		**/
		ZoomLevelSequence : 0,
		/**
		 *参数说明：设置瓦片地图起始锚点，即0行0列地图的左下角地图坐标，瓦片行列号方向为以此锚点向上向右递增
		 *参数类型：{[2]Float}
		 *取值范围：{无限制}
		 *默认值：[0, 0]
		 *参数举例：如下所示
		 */
		TileAnchorPoint : [0, 0],
		/**
		 *参数说明：如果需要调用空间矢量数据服务，则需要设置以下默认EzMapService的引用地址，有关EzMapService服务的介绍请参照EzMapService的有关介绍（可选配置）
		 *参数类型：{String}
		 *取值范围：无
		 *默认值：无
		 *参数举例：如下所示
		 */
		EzMapServiceURL : "http://10.119.255.58:8080/PGIS_S_Map",
		/**
		 *参数说明：如果需要调用地理处理服务，则需要设置以下默认EzGeographicProcessingService引用地址，有关EzGeographicProcessingService服务的介绍请参照EzGeographicProcessingService的有关介绍（可选配置）
		 *参数类型：{String}
		 *取值范围：无
		 *默认值：无
		 *参数举例：如下所示
		 * <script type='text/javascript' charset='GB2312' src='" + EzServerClient.GlobeParams.EzGeoPSURL + "/ezgeops_js/EzGeoPS.js'></script>");
		 */
		EzGeoPSURL : "",
		/**
		 *参数说明：配置热点样式
		 *参数类型：{Object}
		 *取值范围：无
		 *默认值：无
		 *参数举例：如下所示
		 */
		HotspotStyle:{
				//设置热点边框颜色
				borderColor:"red",
				//设置热点边框宽度
				borderWeight:"1.2pt",
				//设置热点填充颜色
				fillColor:"blue",
				//设置热点填充透明度
				opacity:"19660f"
		},
//,
/**###############################################################################**/
/** --------------------------------室内地图数据配置-----------------------------**/
		/**
		 *参数说明：设置是否开启室内地图
		 *参数类型：{boolean}
		 *取值范围：true|false
		 *默认值：false
		 *参数举例：如下所示
		 */
		openIndoorMap:true,
		/**
		 * 参数说明：设置室内地图数据来源
		 * EzServer||EzMapService
		 * */
//		source:"EzServer",
		source:"EzMapService",
		/**
		 *参数说明：室内地图热区填充颜色
		 *参数类型：{Array}
		 *取值范围：无
		 *默认值：无
		 *参数举例：如下所示
		 */
		fillColor: ["#FFDEAD","#FF7F50","#F4A460","#802A2A","#A39480"],
		/**
		 *参数说明：初始化时显示楼层
		 *参数类型：{int}
		 *取值范围：无
		 *默认值：无
		 *参数举例：如下所示
		 */		
		initBuildFloorLevel:18,
		/**
		 *参数说明：source为EzMapService时请求的室内热点数据图层名称。可通过EzMapService元信息查询获取；如果为EzServer，可以不设置
		 *参数类型：{string}
		 *取值范围：无
		 *默认值：无
		 *参数举例：如下所示
		 */
		layerName:"BJRKGIS.LEVEL_18",
		/**
		 * 参数说明：室内地图显示级别
		 * 参数类型：{Array}
		 * 取值范围：无
		 * 默认值：当前地图比例尺最大的两个级别
		 * 参数举例：
		 * */
		displayLevel:[20,22],
		/**
		 * 参数说明：室内地图服务地址
		 * */
//		serverURL:"http://172.18.69.7:8080/EzServer66/Maps/founder18Hot",
		serverURL:"http://172.18.69.7:8080/EzMapService7",
		/**
		 * 参数说明：代理地址
		 * */
		proyURL:"http://172.18.69.7:8888/EzProxy6/Proxy"
/** --------------------------------室内地图数据配置--end-----------------------------**/
	}
};

// 如果需要让EzMapAPI.js自动加载 地图类库 EzServerClient.js则打开此开关
DO_LOAD_EzServerClient_JS = true;

//如果配置EzServerClient.GlobeParams.EzGeoPSURL的地址，需引入以下脚本
//document.writeln("<script type='text/javascript' charset='GB2312' src='" + EzServerClient.GlobeParams.EzGeoPSURL + "/ezgeops_js/EzGeoPS.js'></script>");


/**###############################################################################**/
/** --------------------------------请不要修改以下内容-----------------------------**/
if( DO_LOAD_EzServerClient_JS )
(function() {
	var scriptName = "EzMapAPI\\.js";
	var jsfiles = ["EzServerClient.gzjs"];

	var scriptObject = null;
	var scriptBaseURL = null; 
	
	(function () {
		var isOL = new RegExp("(^|(.*?\\/))(" + scriptName + ")(\\?|$)");
		var scripts = document.getElementsByTagName('script');
		for (var i=0, len=scripts.length; i<len; i++) {
			var src = scripts[i].getAttribute('src');
			if (src) {
				var match = src.match(isOL);
				if(match) {
					scriptBaseURL = match[1];
					scriptObject = scripts[i];
					break;
				}
			}
		}
	})();

	var detectAgent = function detectAgent(){
		var Agent = {};
        var ua = navigator.userAgent.toLowerCase();
        if (window.ActiveXObject)
        	Agent.ie = ua.match(/msie ([\d.]+)/)[1];
        else if (isFirefox=navigator.userAgent.indexOf("Firefox")>0)
        	Agent.firefox = ua.match(/firefox\/([\d.]+)/)[1];
        else if (window.MessageEvent && !document.getBoxObjectFor)
        	Agent.chrome = ua.match(/chrome\/([\d.]+)/)[1];
        else if (window.opera)
        	Agent.opera = ua.match(/opera.([\d.]+)/)[1];
        else if (window.openDatabase)
        	Agent.safari = ua.match(/version\/([\d.]+)/)[1];
        return Agent;
	};
	
	var addScript = function(src,charset){
		var agent = detectAgent();
//		if( typeof(agent.ie) != "undefined"  ){
		
			document.writeln("<script type=\"text/javascript\" charset=\""+charset+"\" src=\""+src+"\"></script>");
//		}else{
//			var s = document.createElement("script");
//			s.type = "text/javascript";
//			s.charset = charset;
//			s.src = src;
//			scriptObject.insertAdjacentElement("AfterEnd",s);
//		}
	};
	
	if( scriptBaseURL != null )
	for (var i=0, len=jsfiles.length; i<len; i++) {
		addScript( scriptBaseURL + jsfiles[i],"GB2312" );
	}
})();
/** --------------------------------请不要修改以上内容-----------------------------**/