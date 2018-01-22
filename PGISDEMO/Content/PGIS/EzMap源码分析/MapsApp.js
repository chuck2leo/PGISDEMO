function MapsApp(vContainer, vMapOptions, wh, mg, dh, rg) {
    if (!EzServerClient.GlobeFunction.isTypeRight(vContainer, "object")) {
        throw EzErrorFactory.createError("EzMap构造方法中arguments[0]类型不正确")
    }
    this.baseGroupLayer = null;
    this.groupLayers = [];
    this.version = 0.3;
    this.mapCenter = new Point(116, 39);
    this.mapFullExtent = new MBR(0, 0, 100, 100);
    this.mapInitLevel = 9;
    this.mapMaxLevel = 15;
    this.zoomOffset = 0;
    this.copyRight = "&copy; easymap";
    this.bIsInit = false;
    if (vMapOptions) {
        this.mapOptions = vMapOptions
    } else {
        this.mapOptions = this.setCompatibility()
    }
    this.setMapOptions(this.mapOptions);
    this.queryResults2 = [];
    this.ezMapServiceTryTimes = 1;
    this.map = null;
    this.mapContainer = vContainer;
    this.mapContainer.className = "map";
    this.panel = wh;
    this.metaPanel = mg;
    this.permalink = dh;
    this.specToggleArea = rg;
    this.overViewID = "OverViewMap" + g_next_id;
    g_next_id++;
    this.overViewPanelID = "OverViewMapPanel";
    BindingEvent(this.mapContainer, "resize", this.eventHandler("resizeMapView"));
    BindingEvent(window, "beforeprint", this.eventHandler("beforePrint"));
    BindingEvent(window, "afterprint", this.eventHandler("afterPrint"));
    if (_IEBrowser.type == 4) {
        document.body.style.overflow = "hidden";
        this.panel.style.overflow = "auto"
    }
    this.queryNum = 0;
    this.mapContainer.style.overflow = "hidden";
    this.initializeCompat(!vMapOptions);
    var pMe = this;
    window.getMap = function() {
        return pMe.map
    };
    window.getMapApp = function() {
        return pMe
    }
}

MapsApp.prototype.setCompatibility = function() {
    if (EzServerClient.GlobeParams.MapSrcURL) {
        return {
            mapCenter: _MapCenter,
            mapFullExtent: EzServerClient.GlobeParams.MapFullExtent,
            mapInitLevel: EzServerClient.GlobeParams.MapInitLevel,
            mapMaxLevel: EzServerClient.GlobeParams.MapMaxLevel,
            zoomOffset: EzServerClient.GlobeParams.ZoomOffset,
            copyRight: EzServerClient.GlobeParams.Copyright,
            dynamicCopyright: EzServerClient.GlobeParams.DynamicCopyright
        }
    }
};

MapsApp.prototype.setMapOptions = function(mapOptions) {
    if (mapOptions.copyRight) {
        this.copyRight = mapOptions.copyRight;
        EzServerClient.GlobeParams.Copyright = this.copyRight;
        _mCopyright = this.copyRight
    }
    if (mapOptions.dynamicCopyright) {
        this.dynamicCopyright = mapOptions.dynamicCopyright;
        EzServerClient.GlobeParams.DynamicCopyright = this.dynamicCopyright
    }
    if (mapOptions.mapCenter) {
        this.mapCenter.x = mapOptions.mapCenter[0];
        this.mapCenter.y = mapOptions.mapCenter[1];
        _MapCenterPoint = this.mapCenter;
        _MapCenter = mapOptions.mapCenter
    }
    if (mapOptions.mapFullExtent) {
        this.mapFullExtent.minX = mapOptions.mapFullExtent[0];
        this.mapFullExtent.minY = mapOptions.mapFullExtent[1];
        this.mapFullExtent.maxX = mapOptions.mapFullExtent[2];
        this.mapFullExtent.maxY = mapOptions.mapFullExtent[3];
        EzServerClient.GlobeParams.MapFullExtent = mapOptions.mapFullExtent;
        _FullExtentMBR = mapOptions.mapFullExtent
    }
    if (mapOptions.mapInitLevel == 0 || mapOptions.mapInitLevel) {
        this.mapInitLevel = mapOptions.mapInitLevel;
        EzServerClient.GlobeParams.MapInitLevel = this.mapInitLevel;
        _InitLevel = this.mapInitLevel
    }
    if (mapOptions.mapMaxLevel) {
        this.mapMaxLevel = mapOptions.mapMaxLevel;
        _MaxLevel = this.mapMaxLevel;
        EzServerClient.GlobeParams.MapMaxLevel = this.mapMaxLevel
    }
    if (mapOptions.zoomOffset) {
        this.zoomOffset = mapOptions.zoomOffset;
        _ZoomOffset = this.zoomOffset;
        EzServerClient.GlobeParams.ZoomOffset = this.zoomOffset
    }
    if (mapOptions.ezMapServiceURL) {
        this.ezMapServiceURL = mapOptions.ezMapServiceURL;
        EzServerClient.GlobeParams.EzMapServiceURL = this.ezMapServiceURL;
        m_MapServer = this.ezMapServiceURL
    }
    if (mapOptions.ezGeoPSURL) {
        this.ezGeoPSURL = mapOptions.ezGeoPSURL;
        if (!EzServerClient.GlobeParams.EzGeoPSURL) {
            EzServerClient.GlobeParams.EzGeoPSURL = this.ezGeoPSURL;
            document.writeln("<script type='text/javascript' charset='GB2312' src='" + EzServerClient.GlobeParams.EzGeoPSURL + "/ezgeops_js/EzGeoPS.js'><\/script>")
        }
    }
};

MapsApp.prototype.initializeCompat = function(bIsInitialize) {
    if (bIsInitialize) {
        for (var i = 0; i < EzServerClient.GlobeParams.MapSrcURL.length; i++) {
            var len = EzServerClient.GlobeParams.MapSrcURL[i].length;
            var uGroupName = EzServerClient.GlobeParams.MapSrcURL[i][0];
            var uGroupLyr = null;
            var uLyrs = [];
            var tileLyr = null;
            if (typeof(EzServerClient.GlobeParams.MapSrcURL[i][len - 1]) == "string") {
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
                    case "Amap":
                        tileLyr = new EzServerClient.Layer.AmapTileLayer(name, url, options);
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