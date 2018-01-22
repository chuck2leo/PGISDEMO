EzServerClient.Layer.WMTSTileLayer = EzServerClient.Class(EzServerClient.Layer.LonlatTileLayer, {
    tileCrs: "leftop",
    maxZoomLevel: 22,
    version: "1.0.0",
    originAnchor: [ - 180, 90],
    width: 256,
    height: 256,
    initResolution: 1.40625,
    layer: null,
    style: null,
    TileMatrixSet: null,
    TileMatrix: null,
    levelLimit: [],
    initialize: function(name, url, options) {
        if (!options) {
            options = {}
        }
        this.initResolution = options.initResolution || 1.40625;
        this.layer = options.layer || null;
        this.style = options.style || null;
        this.opacity = options.opacity || 100;
        this.format = options.format || "image/png";
        this.TileMatrixSet = options.tileMatrixSet || null;
        this.TileMatrix = options.tileMatrix || null;
        this.source = options.source || "EzServer";
        this.tileCrs = options.tileCrs || "leftop";
        this.levelLimit = options.levelLimit || [];
        var tileInfo = new EzServerClient.Tile.TileInfo();
        tileInfo.width = this.width;
        tileInfo.height = this.height;
        tileInfo.origin = options.originAnchor || [ - 180, 90];
        this.setCompatibleParm(options);
        if (this.mapCoordinateType != 1) {
            this.initResolution *= 114699;
            tileInfo.origin = [tileInfo.origin[0] * 114699, tileInfo.origin[1] * 114699]
        }
        var res = this.initResolution;
        for (var i = 0; i <= this.maxZoomLevel; i++) {
            tileInfo.levelDetails.push(new EzServerClient.Tile.LevelDetail(i, res));
            res /= 2
        }
        EzServerClient.GlobeParams.ZoomLevelSequence = 2;
        if (options.flatMatrix) {
            tileInfo.flatMatrix = options.flatMatrix
        } else {
            tileInfo.flatMatrix = [1, 0, 0, 0, 1, 0]
        }
        EzServerClient.Layer.TileLayer.prototype.initialize.apply(this, [name, url, tileInfo])
    },
    formatString: function(str, level) {
        var newStr = null;
        if (str != null) {
            newStr = str.replace("%d", level)
        }
        return newStr
    },
    getTileUrl: function(topLeftTile, col, row, level, zoomOffset) {
        if (this.tileCrs == "center") {
            col = topLeftTile.x + col;
            row = topLeftTile.y - row - 1
        } else {
            if (topLeftTile != null) {
                col = topLeftTile.x + col;
                row = row - topLeftTile.y
            }
        }
        var urlArr = this.url.split(",");
        var index = (col + row) % urlArr.length;
        var serverUrl = urlArr[index];
        var srcUrl = null;
        if (this.source == "wmts") {
            var level = zoomOffset + level;
            var TileMatrix = this.formatString(this.TileMatrix, level);
            srcUrl = serverUrl + "?SERVICE=WMTS&REQUEST=GetTile&version=1.0.0&layer=" + this.layer + "&style=" + this.style + "&format=" + this.format + "&TileMatrixSet=" + this.TileMatrixSet + "&TileMatrix=" + TileMatrix + "&TileRow=" + row + "&TileCol=" + col
        }
        if (this.source == "EzServer") {
            srcUrl = serverUrl + "/EzMap?Service=getImage&Type=RGB&ZoomOffset=" + zoomOffset + "&Col=" + col + "&Row=" + row + "&Zoom=" + level + "&V=" + this.version
        }
        if (this.proxyUrl) {
            srcUrl = this.proxyUrl + "?request=gotourl&url=" + encodeURIComponent(srcUrl)
        }
        return srcUrl
    },
    setOffset: function(value) {
        var scale = Math.pow(2, value);
        for (var i = 0; i <= this.maxZoomLevel; i++) {
            this.tileInfo.levelDetails[i].resolution /= scale;
            this.tileInfo.levelDetails[i].scale /= scale
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
    CLASS_NAME: "EzServerClient.Layer.WMTSTileLayer"
});