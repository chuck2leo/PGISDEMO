using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CommonService.Models
{
    /// <summary>
    /// 百度骑行WebAPI接口返回数据格式
    /// </summary>
    public class BMapBackModel
    {
        public int status { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string message { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public int type { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public Info info { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public Result result { get; set; }
    }
    public class Copyright
    {
        /// <summary>
        /// 
        /// </summary>
        public string text { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string imageUrl { get; set; }
    }

    public class Info
    {
        /// <summary>
        /// 
        /// </summary>
        public Copyright copyright { get; set; }
    }

    public class StepOriginLocation
    {
        /// <summary>
        /// 
        /// </summary>
        public double lng { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public double lat { get; set; }
    }

    public class StepDestinationLocation
    {
        /// <summary>
        /// 
        /// </summary>
        public double lng { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public double lat { get; set; }
    }

    public class StepsItem
    {
        /// <summary>
        /// 
        /// </summary>
        public int area { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public int direction { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public int distance { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public int duration { get; set; }
        /// <summary>
        /// 从起点向东北方向出发,骑行10米,右转进入信息路
        /// </summary>
        public string instructions { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string path { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public List<PoisItem> pois { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public int type { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public StepOriginLocation stepOriginLocation { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public StepDestinationLocation stepDestinationLocation { get; set; }
        /// <summary>
        /// 从起点向东北方向出发 - 10米
        /// </summary>
        public string stepOriginInstruction { get; set; }
        /// <summary>
        /// 右转进入信息路 - 2.8公里
        /// </summary>
        public string stepDestinationInstruction { get; set; }
    }

    public class Location
    {
        /// <summary>
        /// 
        /// </summary>
        public double lng { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public double lat { get; set; }
    }

    public class PoisItem
    {
        /// <summary>
        /// 
        /// </summary>
        public string detail { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public Location location { get; set; }
        /// <summary>
        /// 人行道
        /// </summary>
        public string name { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public int type { get; set; }
    }

    public class OriginLocation
    {
        /// <summary>
        /// 
        /// </summary>
        public double lng { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public double lat { get; set; }
    }

    public class DestinationLocation
    {
        /// <summary>
        /// 
        /// </summary>
        public double lng { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public double lat { get; set; }
    }

    public class RoutesItem
    {
        /// <summary>
        /// 
        /// </summary>
        public int distance { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public int duration { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public List<StepsItem> steps { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public OriginLocation originLocation { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public DestinationLocation destinationLocation { get; set; }
    }

    public class OriginPt
    {
        /// <summary>
        /// 
        /// </summary>
        public double lng { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public double lat { get; set; }
    }

    public class Origin
    {
        /// <summary>
        /// 
        /// </summary>
        public int area_id { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string bid { get; set; }
        /// <summary>
        /// 海淀区
        /// </summary>
        public string cname { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string fatherson_coords { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string origin_pt { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string uid { get; set; }
        /// <summary>
        /// 奎科科技大厦
        /// </summary>
        public string wd { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public OriginPt originPt { get; set; }
    }

    public class DestinationPt
    {
        /// <summary>
        /// 
        /// </summary>
        public double lng { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public double lat { get; set; }
    }

    public class Destination
    {
        /// <summary>
        /// 
        /// </summary>
        public int area_id { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string bid { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string cname { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string fatherson_coords { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string origin_pt { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string uid { get; set; }
        /// <summary>
        /// 北京大学
        /// </summary>
        public string wd { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public DestinationPt destinationPt { get; set; }
    }

    public class Result
    {
        /// <summary>
        /// 
        /// </summary>
        public List<RoutesItem> routes { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public Origin origin { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public Destination destination { get; set; }
    }
}
