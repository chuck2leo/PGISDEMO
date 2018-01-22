using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PGISDEMO.Models
{
    /// <summary>
    /// 轨迹数据
    /// </summary>
    public class PathDataModel
    {
        public PathDataModel(string id, string deviceId, string Number, DateTime time)
        {
            this.Id = id;
            this.DeviceId = deviceId;
            this.Number = Number;
            this.Time = time;
        }

        /// <summary>
        /// 唯一标识
        /// </summary>
        public string Id { get; set; }

        /// <summary>
        /// 设备编号
        /// </summary>
        public string DeviceId { get; set; }

        /// <summary>
        /// 标签号
        /// </summary>
        public string Number { get; set; }

        /// <summary>
        /// 时间
        /// </summary>
        public DateTime Time { get; set; }

        /// <summary>
        /// 轨迹数据
        /// </summary>
        /// <returns></returns>
        public static List<PathDataModel> GetAllPathData()
        {
            List<PathDataModel> list = new List<PathDataModel>();
            list.Add(new PathDataModel("1", "001", "66666", DateTime.Parse("2018/1/1 10:00:00")));  //66666于001网关处接收到信号
            list.Add(new PathDataModel("2", "002", "66666", DateTime.Parse("2018/1/1 10:00:00").AddMinutes(1)));  //66666于002网关处接收到信号
            list.Add(new PathDataModel("3", "003", "66666", DateTime.Parse("2018/1/1 10:00:00").AddMinutes(2)));  //66666于003网关处接收到信号
            list.Add(new PathDataModel("4", "002", "66666", DateTime.Parse("2018/1/1 10:00:00").AddMinutes(3)));  //66666于002网关处接收到信号

            list.Add(new PathDataModel("5", "001", "77777", DateTime.Parse("2018/1/1 10:00:00").AddMinutes(1)));  //77777于001网关处接收到信号
            list.Add(new PathDataModel("6", "004", "77777", DateTime.Parse("2018/1/1 10:00:00").AddMinutes(2)));  //77777于004网关处接收到信号
            list.Add(new PathDataModel("7", "005", "77777", DateTime.Parse("2018/1/1 10:00:00").AddMinutes(3)));  //77777于005网关处接收到信号
            list.Add(new PathDataModel("8", "006", "77777", DateTime.Parse("2018/1/1 10:00:00").AddMinutes(4)));  //77777于006网关处接收到信号
            return list;
        }
    }
}