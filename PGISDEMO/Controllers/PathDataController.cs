using PGISDEMO.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PGISDEMO.Controllers
{
    /// <summary>
    /// 轨迹数据相关
    /// </summary>
    public class PathDataController : Controller
    {
        /// <summary>
        /// 获取轨迹数据
        /// </summary>
        [HttpGet]
        public JsonResult GetPathway(string numbers, DateTime timeIntervalsBegin, DateTime timeIntervalsEnd)
        {
            var res = new List<PathwayModel>();
            string[] nums = numbers.Trim().Split(',');
            int count = nums.Length;

            var pathData = PathDataModel.GetAllPathData();
            var gatewayData = GatewayModel.GetAllDevice();

            for (int i = 0; i < count; i++)
            {
                var pathway = new PathwayModel();
                pathway.Number = nums[i];
                pathway.Gateways = new List<GatewayPathModel>();

                var pData = pathData.Where(x => x.Number == nums[i] && x.Time >= timeIntervalsBegin && x.Time <= timeIntervalsEnd).OrderBy(x => x.Time).ToList();
                foreach (var item in pData)
                {
                    var gateway = GatewayController.Get(item.DeviceId);
                    GatewayPathModel gatewayPath = new GatewayPathModel(gateway.DeviceId, gateway.LAT, gateway.LON, gateway.Address, item.Time);
                    pathway.Gateways.Add(gatewayPath);
                }
                if (pathway.Gateways.Count > 0)
                {
                    res.Add(pathway);
                }
            }

            return Json(res, JsonRequestBehavior.AllowGet);
        }
    }
}