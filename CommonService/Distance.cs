using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CommonService
{
    /// <summary>
    /// 距离相关
    /// </summary>
    public static class Distance
    {
        public static double GetDistance(string mapType, double a_lat, double a_lng, double b_lat, double b_lng)
        {
            double distance = 0;
            switch (mapType)
            {
                case "baidu":
                    distance = GetBMapDistance(a_lat, a_lng, b_lat, b_lng);
                    break;
                default:
                    break;
            }
            return distance;

        }

        private static double GetBMapDistance(double a_lat, double a_lng, double b_lat, double b_lng)
        {
            double pk = 180 / Math.PI;
            double a1 = a_lat / pk;
            double a2 = a_lng / pk;
            double b1 = b_lat / pk;
            double b2 = b_lng / pk;
            double t1 = Math.Cos(a1) * Math.Cos(a2) * Math.Cos(b1) * Math.Cos(b2);
            double t2 = Math.Cos(a1) * Math.Sin(a2) * Math.Cos(b1) * Math.Sin(b2);
            double t3 = Math.Sin(a1) * Math.Sin(b1);
            double tt = Math.Acos(t1 + t2 + t3);
            return 6366000 * tt;
        }
    }
}
