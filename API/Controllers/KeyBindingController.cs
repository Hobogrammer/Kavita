using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using API.Data;
using API.Data.Repositories;
using API.DTOs;
using API.Entities;
using API.Entities.Enums;
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
        Enum.TryParse(keyBindingDto.Type, out ReaderType enumReaderType);

        var existingKeyBinding = await _unitOfWork
            .AppUserKeyBindingRepository.GetByUserIdAndReaderType(userId, enumReaderType);
        // Update
        if (existingKeyBinding != null)
        {
            //existingKeyBinding.Bindings = keyBindingDto.Bindings; use map? ...nah new constructor if map doesn't work
            _unitOfWork.AppUserKeyBindingRepository.Update(existingKeyBinding);
        }
        else // New
        {
            var keyBinding = new AppUserKeyBinding() { Type = enumReaderType};
            //keyBinding.Bindings = keyBindingDto.Bindings;

            user.KeyBindings.Add(keyBinding);
            _unitOfWork.UserRepository.Update(user);
        }

        if (!_unitOfWork.HasChanges()) return Ok();
        await _unitOfWork.CommitAsync();

        return Ok();
    }

    [HttpGet]
    public ActionResult<KeyBindingDto?> GetReaderKeybinding(int userId, string readerType)
    {
        Enum.TryParse(readerType, out ReaderType enumReaderType);
        var keyBinding = _unitOfWork.AppUserKeyBindingRepository.GetDtoByUserIdAndReaderType(userId, enumReaderType);
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
