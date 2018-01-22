using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PGISDEMO.Models
{
    public class GatewayPathModel : GatewayModel
    {
        public GatewayPathModel(string deviceId, string lat, string lon, string address, DateTime passTime) : base(deviceId, lat, lon, address)
        {
            this.PassTime = passTime;
        }

        /// <summary>
        /// 时间
        /// </summary>
        public DateTime PassTime { get; set; }
    }
}