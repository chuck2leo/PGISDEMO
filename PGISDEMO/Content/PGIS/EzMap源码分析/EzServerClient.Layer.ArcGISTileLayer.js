EzServerClient.Layer.ArcGISTileLayer = EzServerClient.Class(EzServerClient.Layer.LonlatTileLayer, {
    maxZoomLevel: 20,
    version: "1.0.0",
    origin: [ - 20037508.342789248, 20037508.342789248],
    width: 256,
    height: 256,
    initResolution: 156543.033928041,
    initialize: function(name, url) {
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
    getTileUrl: function(topLeftTile, col, row, level, zoomOffset) {
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
    setOffset: function(value) {
        var scale = Math.pow(2, value);
        for (var i = 0; i <= this.maxZoomLevel; i++) {
            this.tileInfo.levelDetails[i].resolution /= scale;
            this.tileInfo.levelDetails[i].scale /= scale
        }
    },
    CLASS_NAME: "EzServerClient.Layer.ArcGISTileLayer"
});