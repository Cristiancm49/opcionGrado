using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using MicroApi.Seguridad.Domain.DTOs.Auth;
using MicroApi.Seguridad.Domain.Interfaces;
using MicroApi.Seguridad.Domain.Interfaces.Services;

namespace MicroApi.Seguridad.Application.Services.Auth
{
    public class AuthService : IAuthService
    {
        private readonly IUsuarioRepository _usuarioRepository;
        private readonly IConfiguration _configuration;

        public AuthService(IUsuarioRepository usuarioRepository, IConfiguration configuration)
        {
            _usuarioRepository = usuarioRepository;
            _configuration = configuration;
        }

        public async Task<LoginResponseDto> LoginAsync(LoginDto loginDto)
        {
            try
            {
                // Buscar usuario por email
                var usuario = await _usuarioRepository.GetByEmailAsync(loginDto.Email);
                
                if (usuario == null)
                {
                    return new LoginResponseDto
                    {
                        Success = false,
                        Message = "Usuario no encontrado"
                    };
                }

                // NOTA: En producción deberías validar el password con hash
                // Por ahora, para desarrollo, aceptamos cualquier password no vacío
                if (string.IsNullOrEmpty(loginDto.Password))
                {
                    return new LoginResponseDto
                    {
                        Success = false,
                        Message = "Password requerido"
                    };
                }

                // Generar token JWT
                var usuarioAuth = new UsuarioAuthDto
                {
                    Id = usuario.Id,
                    NombreCompleto = usuario.NombreCompleto,
                    Email = usuario.Email,
                    IdRol = usuario.IdRol,
                    Rol = usuario.Rol?.NombreRol ?? "Usuario"
                };

                var token = GenerateJwtToken(usuarioAuth);
                var expiration = DateTime.UtcNow.AddMinutes(
                    double.Parse(_configuration["JwtSettings:ExpiryMinutes"] ?? "60")
                );

                return new LoginResponseDto
                {
                    Success = true,
                    Message = "Login exitoso",
                    Token = token,
                    Expiration = expiration,
                    Usuario = usuarioAuth
                };
            }
            catch (Exception ex)
            {
                return new LoginResponseDto
                {
                    Success = false,
                    Message = $"Error en login: {ex.Message}"
                };
            }
        }

        private string GenerateJwtToken(UsuarioAuthDto usuario)
        {
            var jwtSettings = _configuration.GetSection("JwtSettings");
            var secretKey = jwtSettings["SecretKey"] ?? throw new InvalidOperationException("JWT SecretKey no configurada");
            var issuer = jwtSettings["Issuer"];
            var audience = jwtSettings["Audience"];
            var expiryMinutes = int.Parse(jwtSettings["ExpiryMinutes"] ?? "60");

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, usuario.Id.ToString()),
                new Claim(JwtRegisteredClaimNames.Email, usuario.Email),
                new Claim(JwtRegisteredClaimNames.Name, usuario.NombreCompleto),
                new Claim(ClaimTypes.Role, usuario.Rol),
                new Claim("IdRol", usuario.IdRol.ToString()),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            var token = new JwtSecurityToken(
                issuer: issuer,
                audience: audience,
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(expiryMinutes),
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
