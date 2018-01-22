MainFrame.prototype.createPanningControls = function(p) {
    var g = this;
    var mb = divCreator.create(Gi, 59, 64, 0, 0, 0, false);
    var Ta = divCreator.create(jg, 17, 17, 20, 0, 1, false);
    setCursor(Ta, "pointer");
    BindingEvent(Ta, "click",
    function(b) {
        g.pan(0, -Math.floor(g.viewSize.height * 0.5));
        S(b)
    });
    Ta.title = _mPanNorth;
    p.appendChild(Ta);
    var Ua = divCreator.create(pi, 17, 17, 40, 20, 1, false);
    setCursor(Ua, "pointer");
    BindingEvent(Ua, "click",
    function(b) {
        g.pan( - Math.floor(g.viewSize.width * 0.5), 0);
        S(b)
    });
    Ua.title = _mPanEast;
    p.appendChild(Ua);
    var gb = divCreator.create(ni, 17, 17, 20, 40, 1, false);
    setCursor(gb, "pointer");
    BindingEvent(gb, "click",
    function(b) {
        g.pan(0, Math.floor(g.viewSize.height * 0.5));
        S(b)
    });
    gb.title = _mPanSouth;
    p.appendChild(gb);
    var Za = divCreator.create(Yh, 17, 17, 0, 20, 1, false);
    setCursor(Za, "pointer");
    BindingEvent(Za, "click",
    function(b) {
        g.pan(Math.floor(g.viewSize.width * 0.5), 0);
        S(b)
    });
    Za.title = _mPanWest;
    p.appendChild(Za);
    var G = divCreator.create(kh, 17, 17, 20, 20, 1, false);
    setCursor(G, "pointer");
    BindingEvent(G, "click",
    function(b) {
        var pPoint = _MapCenterPoint;
        g.centerAndZoom(pPoint, g.getZoomLevel());
        S(b)
    });
    G.title = _mLastResult;
    p.appendChild(G)
};