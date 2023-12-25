using Core.Entities;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Data
{
    public class AppIdentityDbContextSeed
    {
        public static async Task SeedUser(UserManager<AppUser> userManager)
        {
            if (!userManager.Users.Any())
            {
                var user = new AppUser()
                {
                    DisplayName = "Ahmed",
                    Email = "elshenawy1ahmed@gmail.com",
                    UserName = "Ahmed_Elshenawy",
                    Address = new Address()
                    {
                        FirstName = "Ahme",
                        LastName = "Elshenawy",
                        Street = "Gesr",
                        City = "Beheira",
                        State = "EG",
                        ZipCode = "22847"
                    }
                };
                await userManager.CreateAsync(user, "Shenawy2539@");
            }
        }
    }
}
