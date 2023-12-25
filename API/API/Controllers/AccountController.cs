using API.Extensions;
using AutoMapper;
using Core.DTOs;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<AppUser> userManager;
        private readonly SignInManager<AppUser> signInManager;
        private readonly ITokenService tokenService;
        private readonly IMapper mapper;

        public AccountController(UserManager<AppUser> _userManager, 
                                 SignInManager<AppUser> _signInManager,
                                 ITokenService _tokenService,
                                 IMapper _mapper)
        {
            userManager = _userManager;
            signInManager = _signInManager;
            tokenService = _tokenService;
            mapper = _mapper;
        }


        [HttpPost("Register")]
        public async Task<ActionResult<UserDTO>> Register(RegisterDTO register)
        {
            if(ModelState.IsValid)
            {
                AppUser userModel = new AppUser()
                {
                    UserName = register.DisplayName,
                    Email = register.Email,
                    DisplayName = register.DisplayName
                };
                IdentityResult result =  await userManager.CreateAsync(userModel, register.Password);
                if(result.Succeeded) 
                {
                    return new UserDTO()
                    {
                        DisplayName = register.DisplayName,
                        Email = register.Email,
                        Token = tokenService.CreateToken(userModel)
                    };
                }
                return BadRequest(result.Errors);
            }
            return BadRequest();
        }

        [HttpPost("Login")]
        public async Task<ActionResult<UserDTO>> Login(LoginDTO login)
        {
            if (ModelState.IsValid) 
            {
                AppUser user = await userManager.FindByEmailAsync(login.Email);
                if(user != null && await userManager.CheckPasswordAsync(user, login.Password))
                {
                    return new UserDTO()
                    {
                        Email = user.Email,
                        DisplayName = user.DisplayName,
                        Token = tokenService.CreateToken(user)
                    };
                }
                return Unauthorized();
            }
            return BadRequest(ModelState);
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<UserDTO>> GetCurrentUser()
        {
            var user = userManager.FindByEmailByClaimsPrincipa(User);
            return new UserDTO()
            {
                Email = user.Email,
                DisplayName = user.DisplayName,
                Token = tokenService.CreateToken(user)
            };
        }

        [HttpGet("EmailExists")]
        public async Task<ActionResult<bool>> CheckEmailExists([FromQuery] string email)
        {
            return (await userManager.FindByEmailAsync(email) != null);
        }

        [HttpGet("Address")]
        [Authorize]
        public async Task<ActionResult<AddressDTO>> GetUserAddress()
        {
            var user = userManager.FindUserByClaimsPrincipalWithAddress(User);
            return mapper.Map<Address,AddressDTO>(user.Address);
        }

        [Authorize]
        [HttpPut("Address")]
        public async Task<ActionResult<AddressDTO>> UpdateUserAddress(AddressDTO address)
        {
            var user = userManager.FindUserByClaimsPrincipalWithAddress(User);
            user.Address = mapper.Map<AddressDTO, Address>(address);
            var result = await userManager.UpdateAsync(user);
            if (result.Succeeded) return Ok(mapper.Map<Address,AddressDTO>(user.Address));
            return BadRequest("An error occurred!");
        }


    }
}
