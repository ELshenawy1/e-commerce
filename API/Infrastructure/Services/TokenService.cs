using Core.Entities;
using Core.Interfaces;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Services
{
    public class TokenService : ITokenService
    {
        private readonly IConfiguration config;
        private readonly SymmetricSecurityKey key;

        public TokenService(IConfiguration _config)
        {
            config = _config;
            key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["Token:Key"]));
        }
        public string CreateToken(AppUser User)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Email,User.Email),
                new Claim(ClaimTypes.GivenName,User.DisplayName),
            };
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);
            JwtSecurityToken token = new JwtSecurityToken(issuer: config["Token:Issure"],
                                              expires: DateTime.Now.AddDays(7),
                                              claims:claims,
                                              signingCredentials: credentials);
            return new JwtSecurityTokenHandler().WriteToken(token); 

        }
    }
}
