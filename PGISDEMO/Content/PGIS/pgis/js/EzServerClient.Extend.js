//此脚本用于重写覆盖 EzServerClient.gz.js 中的部分方法,解决 EzMap 浏览器兼容性等问题

/**
*重写地图地图初始化方法,使地图底图支持 ArcGis rest 服务
**/
MapsApp.prototype.initializeCompat = function (bIsInitialize) {
    if (bIsInitialize) {
        for (var i = 0; i < EzServerClient.GlobeParams.MapSrcURL.length; i++) {
            var len = EzServerClient.GlobeParams.MapSrcURL[i].length;
            var uGroupName = EzServerClient.GlobeParams.MapSrcURL[i][0];
            var uGroupLyr = null;
            var uLyrs = [];
            var tileLyr = null;
            if (typeof (EzServerClient.GlobeParams.MapSrcURL[i][len - 1]) == "string") {
                var layerUrl = EzServerClient.GlobeParams.MapSrcURL[i];
                var layerType = EzServerClient.GlobeParams.MapSrcURL[i][len - 1];
                var posi = layerType.indexOf("_");
                var type = null;
                var cofParma = null;
                var layerParmar = null;
                if (posi != -1) {
                    cofParma = layerType.substr(posi + 1);
                    layerParmars = eval("(" + cofParma + ")");
                    type = layerType.substr(0, posi)
                } else {
                    layerParmars = {};
                    type = layerType
                }
                for (var j = 1; j < layerUrl.length - 1; j++) {
                    var options = null;
                    var url = layerUrl[j].toString();
                    var name = i + 1;
                    if (layerParmars instanceof Array) {
                        options = layerParmars[j - 1]
                    } else {
                        options = layerParmars
                    }
                    switch (type) {
                        case "2005":
                            tileLyr = new EzServerClient.Layer.EzMapTileLayer2005(name, url, {
                                tileWidth: EzServerClient.GlobeParams.MapUnitPixels,
                                tileHeight: EzServerClient.GlobeParams.MapUnitPixels,
                                originAnchor: EzServerClient.GlobeParams.TileAnchorPoint,
                                zoomLevelSequence: EzServerClient.GlobeParams.ZoomLevelSequence,
                                mapCoordinateType: EzServerClient.GlobeParams.MapCoordinateType,
                                mapConvertScale: EzServerClient.GlobeParams.MapConvertScale
                            });
                            break;
                        case "2010":
                            tileLyr = new EzServerClient.Layer.EzMapTileLayer2010(name, url, {
                                tileWidth: EzServerClient.GlobeParams.MapUnitPixels,
                                tileHeight: EzServerClient.GlobeParams.MapUnitPixels,
                                originAnchor: EzServerClient.GlobeParams.TileAnchorPoint,
                                zoomLevelSequence: EzServerClient.GlobeParams.ZoomLevelSequence,
                                mapCoordinateType: EzServerClient.GlobeParams.MapCoordinateType,
                                mapConvertScale: EzServerClient.GlobeParams.MapConvertScale
                            });
                            break;
                        case "JiAo":
                            tileLyr = new EzServerClient.Layer.JiAoTileLayer(name, url, options);
                            break;
                        case "TDT":
                            tileLyr = new EzServerClient.Layer.TianDiTuTileLayer(name, url, options);
                            break;
                        case "WMTS":
                            tileLyr = new EzServerClient.Layer.WMTSTileLayer(name, url, options);
                            break;
                        case "EzMapTDT":
                            tileLyr = new EzServerClient.Layer.EzMapTDTTileLayer(name, url, options);
                            break;
                        case "Google":
                            tileLyr = new EzServerClient.Layer.GoogleTileLayer(name, url, options);
                            break;
                        case "ArcGis":
                            tileLyr = new EzServerClient.Layer.ArcGISTileLayer(name, url, options);
                            break;
                        case "ArcGis-TDR-TEST":
                            tileLyr = new EzServerClient.Layer.ArcGIS_TDR_Test_TileLayer(name, url, options);
                            break;
                        case "Amap":
                            tileLyr = new EzServerClient.Layer.AmapTileLayer(name, url, options);
                            break;
                        //case "Baidu":
                        //    tileLyr = new EzServerClient.Layer.BaiduTileLayer(name, url, options);
                        //    break;
                        default:
                            tileLyr = new EzServerClient.Layer.EzMapTileLayer2010(name, url, {
                                tileWidth: EzServerClient.GlobeParams.MapUnitPixels,
                                tileHeight: EzServerClient.GlobeParams.MapUnitPixels,
                                originAnchor: EzServerClient.GlobeParams.TileAnchorPoint,
                                zoomLevelSequence: EzServerClient.GlobeParams.ZoomLevelSequence,
                                mapCoordinateType: EzServerClient.GlobeParams.MapCoordinateType,
                                mapConvertScale: EzServerClient.GlobeParams.MapConvertScale
                            });
                            break
                    }
                    uLyrs.push(tileLyr)
                }
            } else {
                for (var j = 1; j < EzServerClient.GlobeParams.MapSrcURL[i].length; j++) {
                    var tileLyr = null;
                    var name = i + j;
                    var url = EzServerClient.GlobeParams.MapSrcURL[i][j].join(",");
                    switch (EzServerClient.GlobeParams.ZoomLevelSequence) {
                        case 0:
                        case 1:
                            tileLyr = new EzServerClient.Layer.EzMapTileLayer2005(name, url, {
                                tileWidth: EzServerClient.GlobeParams.MapUnitPixels,
                                tileHeight: EzServerClient.GlobeParams.MapUnitPixels,
                                originAnchor: EzServerClient.GlobeParams.TileAnchorPoint,
                                zoomLevelSequence: EzServerClient.GlobeParams.ZoomLevelSequence,
                                mapCoordinateType: EzServerClient.GlobeParams.MapCoordinateType,
                                mapConvertScale: EzServerClient.GlobeParams.MapConvertScale
                            });
                            break;
                        case 2:
                        case 3:
                            tileLyr = new EzServerClient.Layer.EzMapTileLayer2010(name, url, {
                                tileWidth: EzServerClient.GlobeParams.MapUnitPixels,
                                tileHeight: EzServerClient.GlobeParams.MapUnitPixels,
                                originAnchor: EzServerClient.GlobeParams.TileAnchorPoint,
                                zoomLevelSequence: EzServerClient.GlobeParams.ZoomLevelSequence,
                                mapCoordinateType: EzServerClient.GlobeParams.MapCoordinateType,
                                mapConvertScale: EzServerClient.GlobeParams.MapConvertScale
                            });
                            break;
                        default:
                            tileLyr = new EzServerClient.Layer.EzMapTileLayer2010(name, url, {
                                tileWidth: EzServerClient.GlobeParams.MapUnitPixels,
                                tileHeight: EzServerClient.GlobeParams.MapUnitPixels,
                                originAnchor: EzServerClient.GlobeParams.TileAnchorPoint,
                                zoomLevelSequence: EzServerClient.GlobeParams.ZoomLevelSequence,
                                mapCoordinateType: EzServerClient.GlobeParams.MapCoordinateType,
                                mapConvertScale: EzServerClient.GlobeParams.MapConvertScale
                            });
                            break
                    }
                    uLyrs.push(tileLyr)
                }
            }
            uGroupLyr = new EzServerClient.GroupLayer(uGroupName, uLyrs);
            this.addGroupLayer(uGroupLyr)
        }
    }
};

/**
*解决地图右上角图层名称DIV高度显示的问题
*在 h.style.cssText 里面添加样式  “HEIGHT: 16px; LINE-HEIGHT: 16px;”
**/
function MapServerControl(Id) {
    var h = document.createElement("div");
    h.onselectstart = _NoAction;
    h.style.cssText = "BORDER-RIGHT: #015190 1px solid;	BORDER-TOP: #015190 1px solid;	BORDER-LEFT: #015190 1px solid;	BORDER-BOTTOM: #015190 1px solid;	RIGHT: 12em;	HEIGHT: 16px; LINE-HEIGHT: 16px;	CURSOR: pointer;	POSITION: absolute;	BACKGROUND-COLOR: #FFFFFF";
    var pTextDiv = document.createElement("div");
    pTextDiv.style.cssText = "TEXT-ALIGN: center;	VERTICAL-ALIGN:middle; 	FONT-SIZE: 12px;	FONT-FAMILY:宋体;	color:#015190";
    pTextDiv.innerHTML = Id;
    pTextDiv.noWrap = true;
    h.contentDiv = pTextDiv;
    h.appendChild(pTextDiv);
    return h
}

/**
*重写 ArcGISTileLayer 图层,用于加载 ArcGis 官网提供的在线瓦片图服务
*EzServerClient.Class(EzServerClient.Layer.LonlatTileLayer
*改为EzServerClient.Layer.MercatorTileLayer
**/
EzServerClient.Layer.ArcGISTileLayer = EzServerClient.Class(EzServerClient.Layer.MercatorTileLayer, {
    maxZoomLevel: 19,
    version: "1.0.0",
    origin: [-20037508.342789248, 20037508.342789248], // X:-2.0037508342787E7 Y:2.0037508342787E7 
    width: 256,
    height: 256,
    initResolution: 156543.03392800014,
    initialize: function (name, url) {
        var tileInfo = new EzServerClient.Tile.TileInfo();
        tileInfo.width = this.width;
        tileInfo.height = this.height;
        tileInfo.origin = this.origin;
        var res = this.initResolution;
        for (var i = 0; i <= this.maxZoomLevel; i++) {
            tileInfo.levelDetails.push(new EzServerClient.Tile.LevelDetail(i, res));
            res /= 2
        }
        EzServerClient.GlobeParams.ZoomLevelSequence = 2;
        EzServerClient.Layer.TileLayer.prototype.initialize.apply(this, [name, url, tileInfo])
    },
    getTileUrl: function (topLeftTile, col, row, level, zoomOffset) {
        var col = topLeftTile.x + col;
        var row = row - topLeftTile.y;
        var urlArr = this.url.split(",");
        var index = (col + row) % urlArr.length;
        var serverUrl = urlArr[index];
        var srcUrl = serverUrl + "/tile/" + (level + zoomOffset) + "/" + row + "/" + col;
        if (this.proxyUrl) {
            srcUrl = this.proxyUrl + "?request=gotourl&url=" + encodeURIComponent(srcUrl)
        }
        return srcUrl
    },
    setOffset: function (value) {
        var scale = Math.pow(2, value);
        for (var i = 0; i <= this.maxZoomLevel; i++) {
            this.tileInfo.levelDetails[i].resolution /= scale;
            this.tileInfo.levelDetails[i].scale /= scale
        }
    },
    CLASS_NAME: "EzServerClient.Layer.ArcGISTileLayer"
});

/**
*添加图层：ArcGis-TDR-XZ，郑州新郑市瓦片测试服务
**/
EzServerClient.Layer.ArcGIS_TDR_Test_TileLayer = EzServerClient.Class(EzServerClient.Layer.MercatorTileLayer, {
    maxZoomLevel: 19,
    version: "1.0.0",
    origin: [-20037508.342789248, 20037508.342789248], // X:-2.0037508342787E7 Y:2.0037508342787E7 
    width: 256,
    height: 256,
    initResolution: 156543.03392800014,
    initialize: function (name, url) {
        var tileInfo = new EzServerClient.Tile.TileInfo();
        tileInfo.width = this.width;
        tileInfo.height = this.height;
        tileInfo.origin = this.origin;
        var res = this.initResolution;
        for (var i = 0; i <= this.maxZoomLevel; i++) {
            tileInfo.levelDetails.push(new EzServerClient.Tile.LevelDetail(i, res));
            res /= 2
        }
        EzServerClient.GlobeParams.ZoomLevelSequence = 2;
        EzServerClient.Layer.TileLayer.prototype.initialize.apply(this, [name, url, tileInfo])
    },
    getTileUrl: function (topLeftTile, col, row, level, zoomOffset) {
        var col = topLeftTile.x + col;
        var row = row - topLeftTile.y;
        var urlArr = this.url.split(",");
        var index = (col + row) % urlArr.length;
        var serverUrl = urlArr[index];
        var srcUrl = serverUrl + "/tile/" + (level + zoomOffset) + "/" + row + "/" + col;
        if (this.proxyUrl) {
            srcUrl = this.proxyUrl + "?request=gotourl&url=" + encodeURIComponent(srcUrl)
        }
        return srcUrl
    },
    setOffset: function (value) {
        var scale = Math.pow(2, value);
        for (var i = 0; i <= this.maxZoomLevel; i++) {
            this.tileInfo.levelDetails[i].resolution /= scale;
            this.tileInfo.levelDetails[i].scale /= scale
        }
    },
    CLASS_NAME: "EzServerClient.Layer.ArcGIS_TDR_Test_TileLayer"
});

/**
*解决地图导航控件中的对中功能bug
*地图坐标系为Web墨卡托(Mercator)时,对中会出现偏差
*地图对中之前将中心点由WGS84坐标转为Web墨卡托坐标 pPoint = g.latlon2Meters(pPoint)
**/
MainFrame.prototype.createPanningControls = function (p) {
    var g = this;
    var mb = divCreator.create(Gi, 59, 64, 0, 0, 0, false);
    var Ta = divCreator.create(jg, 17, 17, 20, 0, 1, false);
    setCursor(Ta, "pointer");
    BindingEvent(Ta, "click",
    function (b) {
        g.pan(0, -Math.floor(g.viewSize.height * 0.5));
        S(b)
    });
    Ta.title = _mPanNorth;
    p.appendChild(Ta);
    var Ua = divCreator.create(pi, 17, 17, 40, 20, 1, false);
    setCursor(Ua, "pointer");
    BindingEvent(Ua, "click",
    function (b) {
        g.pan(-Math.floor(g.viewSize.width * 0.5), 0);
        S(b)
    });
    Ua.title = _mPanEast;
    p.appendChild(Ua);
    var gb = divCreator.create(ni, 17, 17, 20, 40, 1, false);
    setCursor(gb, "pointer");
    BindingEvent(gb, "click",
    function (b) {
        g.pan(0, Math.floor(g.viewSize.height * 0.5));
        S(b)
    });
    gb.title = _mPanSouth;
    p.appendChild(gb);
    var Za = divCreator.create(Yh, 17, 17, 0, 20, 1, false);
    setCursor(Za, "pointer");
    BindingEvent(Za, "click",
    function (b) {
        g.pan(Math.floor(g.viewSize.width * 0.5), 0);
        S(b)
    });
    Za.title = _mPanWest;
    p.appendChild(Za);
    var G = divCreator.create(kh, 17, 17, 20, 20, 1, false);
    setCursor(G, "pointer");
    BindingEvent(G, "click",
    function (b) {
        var pPoint = _MapCenterPoint;
        if (g.bIsMercatorMap) {
            pPoint = g.latlon2Meters(pPoint)
        }
        g.centerAndZoom(pPoint, g.getZoomLevel());
        S(b)
    });
    G.title = _mLastResult;
    p.appendChild(G)
};

/**
*解决在chrome浏览器中部分地图图标不能显示的bug
*添加对 chrome 浏览器的支持
**/
divCreator.createElement = function (strURL, bIsCrop, pDoc) {
    if (typeof arguments.callee.hasFilters == "undefined") {
        var Vh = document.createElement("DIV");
        arguments.callee.hasFilters = typeof Vh.style.filter != "undefined"
    }
    var f;
    var browserType = EzServerClient.GlobeParams.BrowserTypeAndVersion;
    //添加对 chrome 浏览器的兼容性处理
    if (browserType.indexOf("Chrome") != -1) {
        f = document.createElement("img")
    } else if (!(browserType >= "IE10.0") && arguments.callee.hasFilters && browserType.indexOf("Firefox") == -1) {
        if (!pDoc) {
            pDoc = document
        }
        var pCache = pDoc.PNG_cache;
        if (pCache && pCache.childNodes.length > 0) {
            f = pCache.removeChild(pCache.lastChild)
        } else {
            f = pDoc.createElement("DIV");
            divCreator.destroyBeforeUnload(f)
        }
        if (!f.loader) {
            f.loader = pDoc.createElement("img");
            f.loader.style.visibility = "hidden";
            f.loader.onload = function () {
                if (!f.cleared) {
                    f.style.filter = divCreator.alphaImageLoader(this.src, true)
                }
            }
        }
    } else {
        f = document.createElement("img")
    }
    divCreator.setImage(f, strURL, bIsCrop);
    return f
};

/**
*修复鼠标双击放大时，JS报错导致地图崩溃的问题
**/
MainFrame.prototype.onDoubleClick = function (b) {
    EzEvent.ezEventListener.source = this;
    EzEvent.ezEventListener.eventType = EzEvent.MAP_DBLCLICK;
    EzEvent.trigger(EzEvent.ezEventListener, EzEvent);
    this.disableDragging = true;
    if (this.disableDragging) {
        return
    }
    var j = this.getRelativeClickPoint(b, this.container);
    var Oc = Math.floor(this.viewSize.width / 2) - j.x;
    var sc = -(Math.floor(this.viewSize.height / 2) - j.y);
    this.pan(Oc, sc);
    this.onDrag()
};

/**
*解决在Web墨卡托(Mercator)坐标系的情况下时Polyline弹出InfoWindow位置错误的问题
**/
Polyline.prototype.openInfoWindowHtml = function (html, bIsInScreen) {
    try {
        this.map.blowupOverlay(this);
        var vPoint;
        if (this.center == null) {
            var iIndex = Math.floor(this.points.length / 2);
            if (this.map.bIsMercatorMap) {
                vPoint = this.map.latlon2Meters(new Point(this.points[iIndex].x, this.points[iIndex].y));
            } else {
                vPoint = new Point(this.points[iIndex].x, this.points[iIndex].y);
            }
        } else {
            //this.center不为空时,center的点位已经经过坐标转换
            vPoint = new Point(this.center.x, this.center.y);
        }
        this.map.openInfoWindow(vPoint.x, vPoint.y, html, bIsInScreen)
    } catch (e) {
        throw EzErrorFactory.createError("Polyline::openInfoWindowHtml方法中不正确", e)
    }
};

/**
*重写地图服务切换方法，设置index即为右上角地图服务的索引
**/
MapsApp.prototype.switchMapServer = function (index) {
    try {
        if (!EzServerClient.GlobeFunction.isTypeRight(index, "int")) {
            throw EzErrorFactory.createError("EzMap::switchMapServer方法中arguments[0]类型不正确")
        }
        if (index < this.map.mapServer.length) {
            this.map.mapServer[index].click()
        }
    } catch (e) {
        throw EzErrorFactory.createError("EzMap::switchMapServer方法执行不正确", e)
    }
};

