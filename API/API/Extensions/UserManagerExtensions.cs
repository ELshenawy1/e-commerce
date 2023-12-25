using Core.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace API.Extensions
{
    public static class UserManagerExtensions
    {
        public static AppUser FindUserByClaimsPrincipalWithAddress(this UserManager<AppUser> userManager,
                                                                   ClaimsPrincipal user)
        {
            var email = user.FindFirstValue(ClaimTypes.Email);
            return userManager.Users.Include(u => u.Address).FirstOrDefault(u => u.Email == email);
        }

        public static AppUser FindByEmailByClaimsPrincipa(this UserManager<AppUser> userManager,
                                                                   ClaimsPrincipal user)
        {
            var email = user.FindFirstValue(ClaimTypes.Email);
            return userManager.Users.FirstOrDefault(u => u.Email == email);

        }
    }
}
