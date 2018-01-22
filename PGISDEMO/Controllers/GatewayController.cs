using PGISDEMO.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PGISDEMO.Controllers
{
    public class GatewayController : Controller
    {

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
    }
}