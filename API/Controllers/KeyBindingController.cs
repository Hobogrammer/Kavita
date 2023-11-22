using System;
using API.Data;
using API.Data.Repositories;
using API.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace API.Controller;

public class KeyBindingController : BaseApiController
{
    private readonly IUnitOfWork _unitOfWork;

    public KeyBindingController(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }
   
    [HttpPost("update")]
    public async Task<ActionResult> CreateOrUpdateBookReaderKeyBinding(BookReaderKeyBindingDto keyBindingDto)
    {
       var user = await _unitOfWork.UserRepository.GetUserByIdAsync(User.GetUserId());
       if (user == null) return Unauthorized();

       var exisitingKeyBinding = user.KeyBindings.FirstOrDefault(); // not finished
       if (exisitingKeyBinding != null)
       {
           exisitingKeyBinding.Next = keyBindingDto.Next;
           exisitingKeyBinding.Previous = keyBindingDto.Previous;
           exisitingKeyBinding.Close = keyBindingDto.Close;
           exisitingKeyBinding.ToggleMenu = keyBindingDto.ToggleMenu;
           exisitingKeyBinding.GoToPage = keyBindingDto.GoToPage;
           exisitingKeyBinding.FullScreen = keyBindingDto.FullScreen;

           _unitOfWork.AppUserKeyBindingRepository.Update(exisitingKeyBinding);
       }
       else
       {
           var keyBinding = new BookReaderKeyBinding()
           {
               Next = keyBindingDto.Next,
               Previous = keyBindingDto.Previous,
               Close = keyBindingDto.Close,
               ToggleMenu = keyBindingDto.ToggleMenu,
               GoToPage = keyBindingDto.GoToPage,
               FullScreen = keyBindingDto.FullScreen
           };
           user.KeyBinding.Add(keyBinding);
           _unitOfWork.UserRepository.Update(user);
       }

        if (!_unitOfWork.HasChanges()) return Ok();
        await _unitOfWork.CommitAsync();

        return Ok();
    }
    
    [HttpGet]
    public ActionResult<KeyBindingDto> GetBookReaderKeybinding()
    {
       return Ok(_unitOfWork.AppUserKeyBindingRepository.GetAllDtosByUserIdAndType(User.GetUserId(), ReaderType.Book));
    }

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
