var tileLyr = new EzServerClient.Layer.EzMapTileLayer2010(name, url, {
                            tileWidth: EzServerClient.GlobeParams.MapUnitPixels,
                            tileHeight: EzServerClient.GlobeParams.MapUnitPixels,
                            originAnchor: EzServerClient.GlobeParams.TileAnchorPoint,
                            zoomLevelSequence: EzServerClient.GlobeParams.ZoomLevelSequence,
                            mapCoordinateType: EzServerClient.GlobeParams.MapCoordinateType,
                            mapConvertScale: EzServerClient.GlobeParams.MapConvertScale
                        });


EzServerClient.Layer.EzMapTileLayer2010 = EzServerClient.Class(EzServerClient.Layer.LonlatTileLayer, {
    tileCrs: "center",
    maxZoomLevel: 24,
    version: 0.3,
    initResolution: 2,
    levelLimit: [],
    time: false,
    initialize: function(name, url, options) {
        if (!options) {
            options = {}
        }
        this.proxyUrl = options.proxyUrl || "";
        var obj = null;
        try {} catch(error) {
            error.message
        } finally {
            this.layer = options.layer || null;
            this.style = options.style || null;
            this.format = options.format || "image/png";
            this.TileMatrixSet = options.tileMatrixSet || null;
            this.source = options.source || "EzMap";
            var tileInfo = new EzServerClient.Tile.TileInfo();
            tileInfo.width = options.tileWidth || 256;
            tileInfo.height = options.tileHeight || 256;
            this.levelLimit = options.levelLimit || [];
            this.time = options.time || null;
            this.tileStart = options.tileStart || "leftRight";
            if (typeof(obj) == "undefined") {
                obj = false
            }
            tileInfo.origin = obj ? obj.origin: (options.originAnchor ? options.originAnchor: [0, 0]);
            this.initResolution = obj ? obj.resolution_0: (options.initResolution ? options.initResolution: 2);
            _MapUnitPixels = tileInfo.width;
            EzServerClient.GlobeParams.MapUnitPixels = tileInfo.width;
            this.setCompatibleParm(options);
            if (this.mapCoordinateType != 1) {
                this.initResolution = this.initResolution * this.mapConvertScale;
                tileInfo.origin = [tileInfo.origin[0] * 114699, tileInfo.origin[1] * 114699]
            }
            var UPP = this.initResolution;
            var scale = 786432000;
            for (var i = 0; i <= this.maxZoomLevel; i++) {
                tileInfo.levelDetails.push(new EzServerClient.Tile.LevelDetail(i, UPP, scale));
                UPP /= 2;
                scale /= 2
            }
            if (options.flatMatrix) {
                tileInfo.flatMatrix = options.flatMatrix
            } else {
                tileInfo.flatMatrix = [1, 0, 0, 0, 1, 0]
            }
            EzServerClient.Layer.TileLayer.prototype.initialize.apply(this, [name, url, tileInfo])
        }
    },
    setCompatibleParm: function(options) {
        if (options.mapConvertScale) {
            this.mapConvertScale = options.mapConvertScale;
            _convert_scale = this.mapConvertScale;
            EzServerClient.GlobeParams.MapConvertScale = this.mapConvertScale
        } else {
            this.mapConvertScale = 114699;
            _convert_scale = 114699;
            EzServerClient.GlobeParams.MapConvertScale = 114699
        }
        if (options.mapConvertOffsetX) {
            this.mapConvertOffsetX = options.mapConvertOffsetX;
            _convert_ofsx = this.mapConvertOffsetX;
            EzServerClient.GlobeParams.MapConvertOffsetX = this.mapConvertOffsetX
        }
        if (options.mapConvertOffsetY) {
            this.mapConvertOffsetY = options.mapConvertOffsetY;
            _convert_ofsy = this.mapConvertOffsetY;
            EzServerClient.GlobeParams.MapConvertOffsetY = this.mapConvertOffsetY
        }
        if (options.mapCoordinateType) {
            this.mapCoordinateType = options.mapCoordinateType;
            _MapSpanScale = this.mapCoordinateType;
            EzServerClient.GlobeParams.MapCoordinateType = this.mapCoordinateType
        } else {
            this.mapCoordinateType = 1;
            _MapSpanScale = 1;
            EzServerClient.GlobeParams.MapCoordinateType = 1
        }
        if (options.zoomLevelSequence) {
            this.zoomLevelSequence = options.zoomLevelSequence;
            EzServerClient.GlobeParams.ZoomLevelSequence = this.zoomLevelSequence
        } else {
            EzServerClient.GlobeParams.ZoomLevelSequence = 2
        }
    },
    setOffset: function(value) {
        var scale = Math.pow(2, value);
        for (var i = 0; i <= this.maxZoomLevel; i++) {
            this.tileInfo.levelDetails[i].resolution /= scale;
            this.tileInfo.levelDetails[i].scale /= scale
        }
    },
    getTileUrl: function(topLeftTile, col, row, level, zoomOffset) {
        if (topLeftTile != null) {
            col = topLeftTile.x + col;
            row = topLeftTile.y - row - 1
        }
        var urlArr = this.url.split(",");
        var index = (col + row) % urlArr.length;
        var serverUrl = urlArr[index];
        var srcUrl = null;
        if (this.source == "wmts") {
            srcUrl = serverUrl + "?SERVICE=WMTS&REQUEST=GetTile&version=1.0.0&layer=" + this.layer + "&style=" + this.style + "&format=" + this.format + "&TileMatrixSet=" + this.TileMatrixSet + "&TileMatrix=" + level + "&TileRow=" + row + "&TileCol=" + col
        } else {
            if (this.time) {
                srcUrl = serverUrl + "/EzMap?Service=getImage&Type=RGB&ZoomOffset=" + zoomOffset + "&Col=" + col + "&Row=" + row + "&Zoom=" + level + "&V=" + this.version + "&timestamp=" + new Date().getTime().valueOf()
            } else {
                srcUrl = serverUrl + "/EzMap?Service=getImage&Type=RGB&ZoomOffset=" + zoomOffset + "&Col=" + col + "&Row=" + row + "&Zoom=" + level + "&V=" + this.version
            }
        }
        if (this.proxyUrl) {
            srcUrl = this.proxyUrl + "?request=gotourl&url=" + encodeURIComponent(srcUrl)
        }
        return srcUrl
    },
    CLASS_NAME: "EzServerClient.Layer.TileLayer.EzMapTileLayer2010"
});