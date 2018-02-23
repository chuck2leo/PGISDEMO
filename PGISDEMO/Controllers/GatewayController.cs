using CommonService;
using PGISDEMO.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PGISDEMO.Controllers
{
    /// <summary>
    /// 网关相关
    /// </summary>
    public class GatewayController : Controller
    {
        private object CommonService;

        [HttpGet]
        public JsonResult GetGateway(string ids)
        {
            List<GatewayModel> list = new List<GatewayModel>();
            string[] deviceIds = ids.Trim().Split(',');
            foreach (var id in deviceIds)
            {
                GatewayModel model = Get(id);
                list.Add(model);
            }
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult GetAllGateway()
        {
            List<GatewayModel> list = GatewayModel.GetAllDevice();
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public static GatewayModel Get(string id)
        {
            return GatewayModel.GetAllDevice().Where(x => x.DeviceId == id).FirstOrDefault();
        }

        [HttpGet]
        public JsonResult GetDrawGateway(decimal x1, decimal y1, decimal x2, decimal y2)
        {
            //所有网关
            List<GatewayModel> devices = GatewayModel.GetAllDevice();

            //在矩形区域内的网关
            List<GatewayModel> innerDevices = new List<GatewayModel>();

            for (int i = 0; i < devices.Count; i++)
            {
                decimal xx1, xx2, yy1, yy2;
                if (decimal.TryParse(devices[i].LON, out xx1) && decimal.TryParse(devices[i].LON, out xx2) && decimal.TryParse(devices[i].LAT, out yy1) && decimal.TryParse(devices[i].LAT, out yy2))
                {
                    if (xx1 >= x1 && xx2 <= x2 && yy1 >= y1 && yy2 <= y2)
                    {
                        innerDevices.Add(devices[i]);
                    }
                }
            }

            return Json(innerDevices, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult GetNearbyGateways(string deviceId, double radius = 200)
        {
            GatewayModel gateway = Get(deviceId);
            List<GatewayModel> devices = GatewayModel.GetAllDevice();
            List<GatewayModel> res = new List<GatewayModel>();

            double xx1, yy1;
            double.TryParse(gateway.LON, out xx1);
            double.TryParse(gateway.LAT, out yy1);

            foreach (var device in devices)
            {
                double xx2, yy2;
                if (double.TryParse(device.LON, out xx2) && double.TryParse(device.LAT, out yy2))
                {
                    if (Distance.GetDistance("baidu", yy2, xx2, yy1, xx1) <= radius && device.DeviceId.ToLower() != deviceId.ToLower())
                    {
                        res.Add(device);
                    }
                }
            }

            return Json(new { Center = gateway, Nearby = res }, JsonRequestBehavior.AllowGet);
        }
    }
}