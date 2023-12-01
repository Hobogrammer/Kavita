using System.Collections.Generic;
using System.Threading.Tasks;
using API.Data;
using API.Data.Repositories;
using API.DTOs;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class KeyBindingController : BaseApiController
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;

    public KeyBindingController(IUnitOfWork unitOfWork, IMapper mapper)
    {
        _unitOfWork = unitOfWork;
        _mapper = mapper;
    }

    [HttpPost("update")]
    public async Task<ActionResult> CreateOrUpdateKeyBinding(int userId, KeyBindingDto keyBindingDto)
    {
        var user = await _unitOfWork.UserRepository.GetUserByIdAsync(userId);
        if (user == null) return Unauthorized();

        var exisitingKeyBinding = await _unitOfWork
            .AppUserKeyBindingRepository.GetByUserIdAndReaderType(userId, keyBindingDto.Type);
        // Update
        if (exisitingKeyBinding != null)
        {
            exisitingKeyBinding.Next = keyBindingDto.Next;
            exisitingKeyBinding.Previous = keyBindingDto.Previous;
            exisitingKeyBinding.Close = keyBindingDto.Close;
            exisitingKeyBinding.GoToPage = keyBindingDto.GoToPage;
            exisitingKeyBinding.ToggleMenu = keyBindingDto.ToggleMenu;
            exisitingKeyBinding.FullScreen = keyBindingDto.FullScreen;

            _unitOfWork.AppUserKeyBindingRepository.Update(exisitingKeyBinding);
        }
        else // New
        {
            var keyBinding = _mapper.Map<KeyBindingDto,AppUserKeyBinding>(keyBindingDto, keyBinding); // wrong. search for examples in code base next session
            user.KeyBindings.Add(keyBinding);
            _unitOfWork.UserRepository.Update(user);
        }

        if (!_unitOfWork.HasChanges()) return Ok();
        await _unitOfWork.CommitAsync();

        return Ok();
    }

    [HttpGet]
    public ActionResult<KeyBindingDto?> GetReaderKeybinding(int userId, int readerType)
    {
        var keyBinding = _unitOfWork.AppUserKeyBindingRepository.GetByUserIdAndReaderType(userId, readerType);
        return Ok(_mapper.Map(keyBinding));
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
