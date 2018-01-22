EzServerClient.Layer.MercatorTileLayer = EzServerClient.Class(EzServerClient.Layer.TileLayer, {
    maxZoomLevel: 20,
    version: "1.0.0",
    tileCrs: "leftop",
    origin: [ - 20037508.342789248, 20037508.342789248],
    width: 256,
    height: 256,
    initResolution: 156543.033928041,
    initialize: function(name, url, options) {
        if (!options) {
            options = {}
        }
        var tileInfo = new EzServerClient.Tile.TileInfo();
        tileInfo.width = this.width;
        tileInfo.height = this.height;
        tileInfo.origin = this.origin;
        if (options.flatMatrix) {
            tileInfo.flatMatrix = options.flatMatrix
        } else {
            tileInfo.flatMatrix = [1, 0, 0, 0, 1, 0]
        }
        this.source = options.source || "google";
        var res = this.initResolution;
        for (var i = 0; i <= this.maxZoomLevel; i++) {
            tileInfo.levelDetails.push(new EzServerClient.Tile.LevelDetail(i, res));
            res /= 2
        }
        EzServerClient.GlobeParams.ZoomLevelSequence = 2;
        EzServerClient.Layer.TileLayer.prototype.initialize.apply(this, [name, url, tileInfo])
    },
    setOffset: function(value) {
        var scale = Math.pow(2, value);
        for (var i = 0; i <= this.maxZoomLevel; i++) {
            this.tileInfo.levelDetails[i].resolution /= scale;
            this.tileInfo.levelDetails[i].scale /= scale
        }
    },
    CLASS_NAME: "EzServerClient.Layer.MercatorTileLayer"
});