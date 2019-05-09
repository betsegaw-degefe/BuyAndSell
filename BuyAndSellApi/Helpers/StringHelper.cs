using System.Linq;

namespace BuyAndSellApi.Helpers
{
    public static class StringHelper
    {
        public static string ToUnderScoreCase(this string str)
        {
            var chars = str.Select((x, i) => i > 0 && char.IsUpper(x) ? "_" + x.ToString() : x.ToString());
            return string.Concat(chars).ToLower();
        }
    }
}