EzServerClient.Layer.EzMapTDTTileLayer = EzServerClient.Class(EzServerClient.Layer.LonlatTileLayer, {
    tileCrs: "leftop",
    maxZoomLevel: 24,
    version: "1.0.0",
    origin: [ - 180, 90],
    width: 256,
    height: 256,
    initResolution: 1.40625,
    levelLimit: [],
    initialize: function(name, url, options) {
        if (!options) {
            options = {}
        }
        this.source = options.source || "EzServer";
        this.origin = options.originAnchor || [ - 180, 90];
        this.height = options.height || 256;
        this.width = options.width || 256;
        this.initResolution = options.initResolution || 1.40625;
        this.levelLimit = options.levelLimit || [];
        var tileInfo = new EzServerClient.Tile.TileInfo();
        tileInfo.width = this.width;
        tileInfo.height = this.height;
        _MapUnitPixels = tileInfo.width;
        EzServerClient.GlobeParams.MapUnitPixels = tileInfo.width;
        this.setCompatibleParm(options);
        tileInfo.origin = this.origin;
        if (this.mapCoordinateType != 1) {
            this.initResolution = this.initResolution * this.mapConvertScale
        }
        var res = this.initResolution;
        for (var i = 0; i <= this.maxZoomLevel; i++) {
            tileInfo.levelDetails.push(new EzServerClient.Tile.LevelDetail(i, res));
            res /= 2
        }
        if (options.flatMatrix) {
            tileInfo.flatMatrix = options.flatMatrix
        } else {
            tileInfo.flatMatrix = [1, 0, 0, 0, 1, 0]
        }
        EzServerClient.Layer.TileLayer.prototype.initialize.apply(this, [name, url, tileInfo])
    },
    format: function(str, len) {
        var i = str.length;
        if (i >= 8) {
            str = str.substring(i - len, i)
        } else {
            var str0 = "";
            for (var n = 0; n < len; n++) {
                str0 += "0"
            }
            str = str0.substring(0, str0.length - i) + str
        }
        return str
    },
    getTileUrl: function(topLeftTile, col, row, level, zoomOffset) {
        if (topLeftTile == null) {
            var col = col;
            var row = row
        } else {
            var col = topLeftTile.x + col;
            var row = row - topLeftTile.y
        }
        var urlArr = this.url.split(",");
        var index = (col + row) % urlArr.length;
        var serverUrl = urlArr[index];
        if (this.source == "EzServer") {
            var srcUrl = serverUrl + "/EzMap?Service=getImage&Type=RGB&ZoomOffset=" + zoomOffset + "&Col=" + col + "&Row=" + row + "&Zoom=" + level + "&V=" + this.version
        }
        if (this.source == "cachePath") {
            var srcUrl = serverUrl + "/L" + this.format(level.toString(), 2) + "/R" + this.format(row.toString(16), 8) + "/C" + this.format(col.toString(16), 8) + ".png"
        }
        if (this.source == "ArcGis") {
            var srcUrl = serverUrl + "/tile/" + level + "/" + row + "/" + col
        }
        if (this.proxyUrl) {
            srcUrl = this.proxyUrl + "?request=gotourl&url=" + encodeURIComponent(srcUrl)
        }
        return srcUrl
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
        if (options.originAnchor) {
            if (this.mapCoordinateType != 1) {
                var x = options.originAnchor[0] * EzServerClient.GlobeParams.MapConvertScale;
                var y = options.originAnchor[1] * EzServerClient.GlobeParams.MapConvertScale;
                this.origin = [x, y]
            } else {
                var x = options.originAnchor[0];
                var y = options.originAnchor[1];
                this.origin = [x, y]
            }
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
    CLASS_NAME: "EzServerClient.Layer.EzMapTDTTileLayer"
});