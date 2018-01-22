using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Net.Http;
using System.Configuration;

namespace PGISDEMO.Controllers
{
    /// <summary>
    /// 沿路轨迹相关
    /// </summary>
    public class NavigationController : Controller
    {
        /// <summary>
        /// 调用百度路线规划webapi服务中的骑行接口
        /// api参数origin、destination表示起点、终点，格式为"纬度,经度"，如“40.056878,116.30815”
        /// 参数还支持中文地点名，但在地点不明确的情况下无法得到规划方案
        /// </summary>
        [HttpGet]
        public JsonResult GetBMapRideRoute(string from, string to)
        {
            HttpClient myHttpClient = new HttpClient();
            string ak = ConfigurationManager.AppSettings["BaiduAK"];
            var response = myHttpClient.GetAsync(string.Format("http://api.map.baidu.com/direction/v1/?mode=riding&origin={0}&destination={1}&region=杭州&output=json&ak={2}", from, to, ak)).Result;

            return Json(response.Content.ReadAsStringAsync().Result, JsonRequestBehavior.AllowGet);
        }
    }
}