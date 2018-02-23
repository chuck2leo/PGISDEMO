using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PGISDEMO.Models
{
    /// <summary>
    /// 网关模型
    /// </summary>
    public class GatewayModel
    {
        public GatewayModel(string deviceId, string lat, string lon, string address)
        {
            this.DeviceId = deviceId;
            this.LAT = lat;
            this.LON = lon;
            this.Address = address;
        }

        /// <summary>
        /// 设备编号
        /// </summary>
        public string DeviceId { get; set; }

        /// <summary>
        /// 纬度
        /// </summary>
        public string LAT { get; set; }

        /// <summary>
        /// 经度
        /// </summary>
        public string LON { get; set; }

        /// <summary>
        /// 点位
        /// </summary>
        public string Address { get; set; }

        /// <summary>
        /// 网关数据
        /// </summary>
        /// <returns></returns>
        public static List<GatewayModel> GetAllDevice()
        {
            var list = new List<GatewayModel>();
            list.Add(new GatewayModel("001", "34.634845733642580", "113.692337036132810", "龙湖镇祥云路河南工业贸易职业学院"));
            list.Add(new GatewayModel("002", "34.629940032958984", "113.687667846679690", "龙湖镇富源路与107国道交叉口西南角"));
            list.Add(new GatewayModel("003", "34.592044830322266", "113.690055847167970", "龙湖镇正商红河谷东南门西北侧30米"));
            list.Add(new GatewayModel("004", "34.823562622070310", "113.705047607421880", "中州大道21世纪社区东门岗亭向东10米"));
            list.Add(new GatewayModel("005", "34.825103759765625", "113.688941955566400", "安泰银河小区8号楼东北侧"));
            list.Add(new GatewayModel("006", "34.842208862304690", "113.670982360839840", "花园路国基路交叉口东南角绿化带"));
            return list;
        }
    }
}