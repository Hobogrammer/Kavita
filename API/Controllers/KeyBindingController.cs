using System;
using API.Data;
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
   
    [HttpPost("create")]
    public async Task<ActionResult> CreateKeyBinding(BookReaderKeyBindingDto keyBinding) // I will need to make a generic keybindingdto class if I want to continue this route
    {

    }

    [HttpPost("update")]
    public async Task<ActionResult> UpdateKeyBinding(UpdateKeyBindingDto keyBinding)
    {

    }
    
    [HttpGet]
    public ActionResult<KeyBindingDto> GetKeybinding() // This only returns a single obj atm
    {
       return Ok(_unitOfWork.AppUserKeyBindingRepository.GetAllDtosByUserId(User.GetUserId())); // GetDtosByUserIdAndType
    }

    [HttpDelete]
    public async Task<ActionResult> DeleteKeyBinding(int keyBindingId)
    {

    }
}
