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
}
