using AutoMapper;
using BuyAndSellApi.Models.Dtos;
using BuyAndSellApi.Models.Entities;

namespace BuyAndSellApi.Helpers
{
    public class AutoMapperProfile: Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<LoginDto, User>();
            CreateMap<UserDto, User>();
        }
    }
}