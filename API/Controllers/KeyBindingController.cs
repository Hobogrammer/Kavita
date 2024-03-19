using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Entities.Enums.KeyBindings;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class KeyBindingController : BaseApiController
{
    private readonly IUnitOfWork _unitOfWork;

    public KeyBindingController(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    [HttpPost("update")]
    public async Task<ActionResult> CreateOrUpdateKeyBinding(int userId, KeyBindingDto keyBindingDto)
    {
        var user = await _unitOfWork.UserRepository.GetUserByIdAsync(userId);
        if (user == null) return Unauthorized();

        var existingKeyBinding = await _unitOfWork
            .AppUserKeyBindingRepository.GetByUserIdAndReaderType(userId, keyBindingDto.Type);
        // Update
        if (existingKeyBinding != null)
        {
            //existingKeyBinding.Bindings = keyBindingDto.Bindings; use map? ...nah new constructor if map doesn't work
            _unitOfWork.AppUserKeyBindingRepository.Update(existingKeyBinding);
        }
        else // New
        {
            var keyBinding = new AppUserKeyBinding() { Type = keyBindingDto.Type};

            user.KeyBindings.Add(keyBinding);
            _unitOfWork.UserRepository.Update(user);
        }

        if (!_unitOfWork.HasChanges()) return Ok();
        await _unitOfWork.CommitAsync();

        return Ok();
    }

    [HttpGet]
    public ActionResult<KeyBindingDto?> GetReaderKeybinding(int userId, ReaderType readerType)
    {
        var keyBinding = _unitOfWork.AppUserKeyBindingRepository.GetDtoByUserIdAndReaderType(userId, readerType);
        return Ok(keyBinding);
    }

    // Should there be some user verification?
    [HttpDelete]
    public async Task<ActionResult> DeleteKeyBinding(int keyBindingId)
    {
        var keyBinding = await _unitOfWork.AppUserKeyBindingRepository.GetById(keyBindingId);
        if (keyBinding == null) return Ok();

        _unitOfWork.AppUserKeyBindingRepository.Delete(keyBinding);
        await _unitOfWork.CommitAsync();
        return Ok();
    }
}
