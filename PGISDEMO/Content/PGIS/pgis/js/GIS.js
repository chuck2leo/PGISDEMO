//=======================
//脚本：GIS相关方法
//引入：liuchao
//=======================

//功能：获取中间点坐标
//参数：pt1:"x(经度),y(纬度)"
//返回：中间点
function getCenterPoint(pt1, pt2) {
    var p1 = pt1.split(',');
    var p2 = pt2.split(',');
    var x = (parseFloat(p1[0]) + parseFloat(p2[0])) / 2;
    var y = (parseFloat(p1[1]) + parseFloat(p2[1])) / 2;
    var p = x.toString() + ',' + y.toString();
    return p;
}

//功能：判定两点距离是否超过给定阈值(distanceThreshold)
function checkDistance(pt1, pt2, coordinateSystem, distanceThreshold) {
    var p1 = pt1.split(',');
    var p2 = pt2.split(',');
    var a_lat = parseFloat(p1[1]);
    var a_lng = parseFloat(p1[0]);
    var b_lat = parseFloat(p2[1]);
    var b_lng = parseFloat(p2[0]);
    var over = false;
    switch (coordinateSystem) {
        case 'baidu':
            var distance = getBMapDistance(a_lat, a_lng, b_lat, b_lng);
            if (distance > distanceThreshold) {
                over = true;
            }
            break;
        case 'wgs84':
            var distance = getWgs84Distance(a_lat, a_lng, b_lat, b_lng);
            if (distance > distanceThreshold) {
                over = true;
            }
            break;
        default:
            break;
    }
    return over;
}

//功能：计算百度坐标系下两点间的距离
function getBMapDistance(a_lat, a_lng, b_lat, b_lng) {
    var pk = 180 / Math.PI;
    var a1 = a_lat / pk;
    var a2 = a_lng / pk;
    var b1 = b_lat / pk;
    var b2 = b_lng / pk;
    var t1 = Math.cos(a1) * Math.cos(a2) * Math.cos(b1) * Math.cos(b2);
    var t2 = Math.cos(a1) * Math.sin(a2) * Math.cos(b1) * Math.sin(b2);
    var t3 = Math.sin(a1) * Math.sin(b1);
    var tt = Math.acos(t1 + t2 + t3);
    return 6366000 * tt;
}

//功能：计算大地坐标系下两点间的距离
function getWgs84Distance(a_lat, a_lng, b_lat, b_lng) {
    if (arguments.length != 4) {
        return 0;
    }
    lon1 = a_lng;
    lat1 = a_lat;
    lon2 = b_lng;
    lat2 = b_lat;
    var a = 6378137, b = 6356752.3142, f = 1 / 298.257223563;
    var L = (lon2 - lon1).toRad();
    var U1 = Math.atan((1 - f) * Math.tan(lat1.toRad()));
    var U2 = Math.atan((1 - f) * Math.tan(lat2.toRad()));
    var sinU1 = Math.sin(U1), cosU1 = Math.cos(U1);
    var sinU2 = Math.sin(U2), cosU2 = Math.cos(U2);
    var lambda = L, lambdaP, iterLimit = 100;
    do {
        var sinLambda = Math.sin(lambda), cosLambda = Math.cos(lambda);
        var sinSigma = Math.sqrt((cosU2 * sinLambda) * (cosU2 * sinLambda) + (cosU1 * sinU2 - sinU1 * cosU2 * cosLambda) * (cosU1 * sinU2 - sinU1 * cosU2 * cosLambda));
        if (sinSigma == 0)
            return 0;
        var cosSigma = sinU1 * sinU2 + cosU1 * cosU2 * cosLambda;
        var sigma = Math.atan2(sinSigma, cosSigma);
        var sinAlpha = cosU1 * cosU2 * sinLambda / sinSigma;
        var cosSqAlpha = 1 - sinAlpha * sinAlpha;
        var cos2SigmaM = cosSigma - 2 * sinU1 * sinU2 / cosSqAlpha;
        if (isNaN(cos2SigmaM))
            cos2SigmaM = 0;
        var C = f / 16 * cosSqAlpha * (4 + f * (4 - 3 * cosSqAlpha));
        lambdaP = lambda;
        lambda = L + (1 - C) * f * sinAlpha * (sigma + C * sinSigma * (cos2SigmaM + C * cosSigma * (-1 + 2 * cos2SigmaM * cos2SigmaM)));
    } while (Math.abs(lambda - lambdaP) > (1e-12) && --iterLimit > 0);
    if (iterLimit == 0) {
        return NaN
    }
    var uSq = cosSqAlpha * (a * a - b * b) / (b * b);
    var A = 1 + uSq / 16384 * (4096 + uSq * (-768 + uSq * (320 - 175 * uSq)));
    var B = uSq / 1024 * (256 + uSq * (-128 + uSq * (74 - 47 * uSq)));
    var deltaSigma = B * sinSigma * (cos2SigmaM + B / 4 * (cosSigma * (-1 + 2 * cos2SigmaM * cos2SigmaM) - B / 6 * cos2SigmaM * (-3 + 4 * sinSigma * sinSigma) * (-3 + 4 * cos2SigmaM * cos2SigmaM)));
    var s = b * A * (sigma - deltaSigma);
    var fwdAz = Math.atan2(cosU2 * sinLambda, cosU1 * sinU2 - sinU1 * cosU2 * cosLambda);
    var revAz = Math.atan2(cosU1 * sinLambda, -sinU1 * cosU2 + cosU1 * sinU2 * cosLambda);
    return s;
}

//计算角度
function getAngle(pt1, pt2) {
    var p1 = pt1.split(',');
    var p2 = pt2.split(',');
    return Math.atan2(parseFloat(p2[1]) - parseFloat(p1[1]), parseFloat(p2[0]) - parseFloat(p1[0]));
}

//绘制方向标记
function drawMarker(point, angle, belongTo) {
    var pPoint = new Point(bd09ToWGS84(point));
    var iconImg = createIcon(angle);
    var marker = new Marker(pPoint, iconImg, null);
    marker.belongTo = belongTo;
    marker.setZIndex(100);
    myMap.addOverlay(marker);
}

//创建方向图标
function createIcon(angle) {
    var adjAngles = [180, 202, 225, 247, 270, 292, 315, 337, 0, 22, 45, 67, 90, 112, 135, 157];
    adjAngle = angle;
    var adjIndex = 0;
    for (var i = 0; i < 16; i++) {
        if (adjAngle < (-15 / 16 + i / 8) * Math.PI) {
            adjIndex = i;
            break;
        }
    }
    var icon = new Icon();
    icon.height = 18; icon.width = 18;
    icon.topOffset = 0;
    icon.leftOffset = 0;
    icon.image = "../../Content/images/gis-icon/arrow/" + adjAngles[adjIndex] + ".png";
    return icon;
}

//百度坐标(BD09)转火星坐标(GCJ02)
function bd09ToGcj02(strPoint) {
    var llArr = strPoint.split(',');
    var bd_lon = llArr[0];  //经度
    var bd_lat = llArr[1];  //纬度

    var x_pi = 3.14159265358979324 * 3000.0 / 180.0;
    var x = bd_lon - 0.0065;
    var y = bd_lat - 0.006;
    var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_pi);
    var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_pi);
    var gg_lng = z * Math.cos(theta);
    var gg_lat = z * Math.sin(theta);
    return [gg_lng, gg_lat].toString();  //经度，纬度
}

//百度坐标(BD09)转WGS84坐标
function bd09ToWGS84(strPoint) {
    var llArr = strPoint.split(',');
    var bd_lon = llArr[0];  //经度
    var bd_lat = llArr[1];  //纬度

    var x_pi = 3.14159265358979324 * 3000.0 / 180.0;
    var x = bd_lon - 0.0065;
    var y = bd_lat - 0.006;
    var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_pi);
    var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_pi);
    var gg_lng = z * Math.cos(theta);
    var gg_lat = z * Math.sin(theta);

    var obj = GPS.gcj_decrypt(gg_lat, gg_lng);
    return [obj.lon, obj.lat].toString();
}

//WGS84转百度坐标(BD09)
function wgs84ToBd09A(strPoint) {
    var llArr = strPoint.split(',');
    var wgs_lon = llArr[0];  //经度
    var wgs_lat = llArr[1];  //纬度
    var gcjResult = GPS.gcj_encrypt(parseFloat(wgs_lat), parseFloat(wgs_lon));
    var bd09Result = GPS.bd_encrypt(gcjResult.lat, gcjResult.lon);
    return [bd09Result.lon, bd09Result.lat].toString();
}

//WGS84转百度坐标(BD09)
function wgs84ToBd09(strPoint) {
    var llArr = strPoint.split(',');
    var wgs_lon1 = llArr[0];  //经度
    var wgs_lat1 = llArr[1];  //纬度
    var wgs_lon2 = llArr[2];  //经度
    var wgs_lat2 = llArr[3];  //纬度
    var gcjResult1 = GPS.gcj_encrypt(parseFloat(wgs_lat1), parseFloat(wgs_lon1));
    var gcjResult2 = GPS.gcj_encrypt(parseFloat(wgs_lat2), parseFloat(wgs_lon2));
    var bd09Result1 = GPS.bd_encrypt(gcjResult1.lat, gcjResult1.lon);
    var bd09Result2 = GPS.bd_encrypt(gcjResult2.lat, gcjResult2.lon);
    return [bd09Result1.lon, bd09Result1.lat, bd09Result2.lon, bd09Result2.lat].toString();
}

//坐标转换相关
var GPS = {
    PI: 3.14159265358979324,
    x_pi: 3.14159265358979324 * 3000.0 / 180.0,
    delta: function (lat, lon) {
        // Krasovsky 1940
        //
        // a = 6378245.0, 1/f = 298.3
        // b = a * (1 - f)
        // ee = (a^2 - b^2) / a^2;
        var a = 6378245.0; //  a: 卫星椭球坐标投影到平面地图坐标系的投影因子。
        var ee = 0.00669342162296594323; //  ee: 椭球的偏心率。
        var dLat = this.transformLat(lon - 105.0, lat - 35.0);
        var dLon = this.transformLon(lon - 105.0, lat - 35.0);
        var radLat = lat / 180.0 * this.PI;
        var magic = Math.sin(radLat);
        magic = 1 - ee * magic * magic;
        var sqrtMagic = Math.sqrt(magic);
        dLat = (dLat * 180.0) / ((a * (1 - ee)) / (magic * sqrtMagic) * this.PI);
        dLon = (dLon * 180.0) / (a / sqrtMagic * Math.cos(radLat) * this.PI);
        return { 'lat': dLat, 'lon': dLon };
    },

    //WGS-84 to GCJ-02
    gcj_encrypt: function (wgsLat, wgsLon) {
        if (this.outOfChina(wgsLat, wgsLon))
            return { 'lat': wgsLat, 'lon': wgsLon };

        var d = this.delta(wgsLat, wgsLon);
        return { 'lat': wgsLat + d.lat, 'lon': wgsLon + d.lon };
    },
    //GCJ-02 to WGS-84
    gcj_decrypt: function (gcjLat, gcjLon) {
        if (this.outOfChina(gcjLat, gcjLon))
            return { 'lat': gcjLat, 'lon': gcjLon };

        var d = this.delta(gcjLat, gcjLon);
        return { 'lat': gcjLat - d.lat, 'lon': gcjLon - d.lon };
    },
    //GCJ-02 to WGS-84 exactly
    gcj_decrypt_exact: function (gcjLat, gcjLon) {
        var initDelta = 0.01;
        var threshold = 0.000000001;
        var dLat = initDelta, dLon = initDelta;
        var mLat = gcjLat - dLat, mLon = gcjLon - dLon;
        var pLat = gcjLat + dLat, pLon = gcjLon + dLon;
        var wgsLat, wgsLon, i = 0;
        while (1) {
            wgsLat = (mLat + pLat) / 2;
            wgsLon = (mLon + pLon) / 2;
            var tmp = this.gcj_encrypt(wgsLat, wgsLon)
            dLat = tmp.lat - gcjLat;
            dLon = tmp.lon - gcjLon;
            if ((Math.abs(dLat) < threshold) && (Math.abs(dLon) < threshold))
                break;

            if (dLat > 0) pLat = wgsLat; else mLat = wgsLat;
            if (dLon > 0) pLon = wgsLon; else mLon = wgsLon;

            if (++i > 10000) break;
        }
        //console.log(i);
        return { 'lat': wgsLat, 'lon': wgsLon };
    },
    //GCJ-02 to BD-09
    bd_encrypt: function (gcjLat, gcjLon) {
        var x = gcjLon, y = gcjLat;
        var z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * this.x_pi);
        var theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * this.x_pi);
        bdLon = z * Math.cos(theta) + 0.0065;
        bdLat = z * Math.sin(theta) + 0.006;
        return { 'lat': bdLat, 'lon': bdLon };
    },
    //BD-09 to GCJ-02
    bd_decrypt: function (bdLat, bdLon) {
        var x = bdLon - 0.0065, y = bdLat - 0.006;
        var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * this.x_pi);
        var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * this.x_pi);
        var gcjLon = z * Math.cos(theta);
        var gcjLat = z * Math.sin(theta);
        return { 'lat': gcjLat, 'lon': gcjLon };
    },
    //WGS-84 to Web mercator
    //mercatorLat -> y mercatorLon -> x
    mercator_encrypt: function (wgsLat, wgsLon) {
        var x = wgsLon * 20037508.34 / 180.;
        var y = Math.log(Math.tan((90. + wgsLat) * this.PI / 360.)) / (this.PI / 180.);
        y = y * 20037508.34 / 180.;
        return { 'lat': y, 'lon': x };
        /*
        if ((Math.abs(wgsLon) > 180 || Math.abs(wgsLat) > 90))
            return null;
        var x = 6378137.0 * wgsLon * 0.017453292519943295;
        var a = wgsLat * 0.017453292519943295;
        var y = 3189068.5 * Math.log((1.0 + Math.sin(a)) / (1.0 - Math.sin(a)));
        return {'lat' : y, 'lon' : x};
        //*/
    },
    // Web mercator to WGS-84
    // mercatorLat -> y mercatorLon -> x
    mercator_decrypt: function (mercatorLat, mercatorLon) {
        var x = mercatorLon / 20037508.34 * 180.;
        var y = mercatorLat / 20037508.34 * 180.;
        y = 180 / this.PI * (2 * Math.atan(Math.exp(y * this.PI / 180.)) - this.PI / 2);
        return { 'lat': y, 'lon': x };
        /*
        if (Math.abs(mercatorLon) < 180 && Math.abs(mercatorLat) < 90)
            return null;
        if ((Math.abs(mercatorLon) > 20037508.3427892) || (Math.abs(mercatorLat) > 20037508.3427892))
            return null;
        var a = mercatorLon / 6378137.0 * 57.295779513082323;
        var x = a - (Math.floor(((a + 180.0) / 360.0)) * 360.0);
        var y = (1.5707963267948966 - (2.0 * Math.atan(Math.exp((-1.0 * mercatorLat) / 6378137.0)))) * 57.295779513082323;
        return {'lat' : y, 'lon' : x};
        //*/
    },
    // two point's distance
    distance: function (latA, lonA, latB, lonB) {
        var earthR = 6371000.;
        var x = Math.cos(latA * this.PI / 180.) * Math.cos(latB * this.PI / 180.) * Math.cos((lonA - lonB) * this.PI / 180);
        var y = Math.sin(latA * this.PI / 180.) * Math.sin(latB * this.PI / 180.);
        var s = x + y;
        if (s > 1) s = 1;
        if (s < -1) s = -1;
        var alpha = Math.acos(s);
        var distance = alpha * earthR;
        return distance;
    },
    outOfChina: function (lat, lon) {
        if (lon < 72.004 || lon > 137.8347)
            return true;
        if (lat < 0.8293 || lat > 55.8271)
            return true;
        return false;
    },
    transformLat: function (x, y) {
        var ret = -100.0 + 2.0 * x + 3.0 * y + 0.2 * y * y + 0.1 * x * y + 0.2 * Math.sqrt(Math.abs(x));
        ret += (20.0 * Math.sin(6.0 * x * this.PI) + 20.0 * Math.sin(2.0 * x * this.PI)) * 2.0 / 3.0;
        ret += (20.0 * Math.sin(y * this.PI) + 40.0 * Math.sin(y / 3.0 * this.PI)) * 2.0 / 3.0;
        ret += (160.0 * Math.sin(y / 12.0 * this.PI) + 320 * Math.sin(y * this.PI / 30.0)) * 2.0 / 3.0;
        return ret;
    },
    transformLon: function (x, y) {
        var ret = 300.0 + x + 2.0 * y + 0.1 * x * x + 0.1 * x * y + 0.1 * Math.sqrt(Math.abs(x));
        ret += (20.0 * Math.sin(6.0 * x * this.PI) + 20.0 * Math.sin(2.0 * x * this.PI)) * 2.0 / 3.0;
        ret += (20.0 * Math.sin(x * this.PI) + 40.0 * Math.sin(x / 3.0 * this.PI)) * 2.0 / 3.0;
        ret += (150.0 * Math.sin(x / 12.0 * this.PI) + 300.0 * Math.sin(x / 30.0 * this.PI)) * 2.0 / 3.0;
        return ret;
    }
};