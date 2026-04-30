package com.algoviz.controller;

import com.algoviz.dto.LoginRequest;
import com.algoviz.dto.LoginResponse;
import com.algoviz.service.LoginService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/login")
@Tag(name = "登录管理", description = "登录相关接口")
public class LoginController {

    @Autowired
    private LoginService loginService;

    @PostMapping
    @Operation(summary = "登录", description = "通过验证码登录")
    public LoginResponse login(@RequestBody LoginRequest request) {
        return loginService.login(request);
    }

    @GetMapping("/verification-code")
    @Operation(summary = "获取验证码", description = "生成登录验证码")
    public String getVerificationCode() {
        return loginService.generateVerificationCode();
    }
}
