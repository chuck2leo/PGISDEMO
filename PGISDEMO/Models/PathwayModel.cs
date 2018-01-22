using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PGISDEMO.Models
{
    public class PathwayModel
    {
        /// <summary>
        /// 标签号
        /// </summary>
        public string Number { get; set; }

        /// <summary>
        /// 网关集合
        /// </summary>
        public List<GatewayPathModel> Gateways { get; set; }
    }
}