package com.algoviz.service.impl;

import com.algoviz.dto.LoginRequest;
import com.algoviz.dto.LoginResponse;
import com.algoviz.entity.User;
import com.algoviz.service.LoginService;
import com.algoviz.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Random;

@Service
public class LoginServiceImpl implements LoginService {

    @Autowired
    private UserService userService;

    // 存储验证码，实际项目中应该使用Redis
    private Map<String, String> verificationCodes = new HashMap<>();

    @Override
    public LoginResponse login(LoginRequest request) {
        LoginResponse response = new LoginResponse();

        // 验证验证码
        if (!validateVerificationCode(request.getVerificationCode())) {
            response.setSuccess(false);
            response.setMessage("验证码无效或已过期");
            return response;
        }

        // 模拟微信扫码登录，实际项目中应该调用微信API
        // 这里简化处理，直接创建或获取用户
        String openId = "mock_openid_" + System.currentTimeMillis();
        User user = userService.findByUsername(openId);

        if (user == null) {
            // 创建新用户
            user = new User();
            user.setUsername(openId);
            user.setEmail(openId + "@example.com");
            user.setPassword(""); // 微信登录不需要密码
            user.setAvatar("👤");
            user.setGender("未知");
            user.setNickname("用户" + new Random().nextInt(10000));
            user = userService.createUser(user);
        } else {
            // 更新最后登录时间
            userService.updateLastLogin(user.getId());
        }

        // 生成token（实际项目中应该使用JWT）
        String token = "mock_token_" + System.currentTimeMillis();

        // 构建响应
        response.setSuccess(true);
        response.setMessage("登录成功");
        response.setToken(token);

        LoginResponse.UserInfo userInfo = new LoginResponse.UserInfo();
        userInfo.setId(user.getId());
        userInfo.setUsername(user.getUsername());
        userInfo.setEmail(user.getEmail());
        userInfo.setAvatar(user.getAvatar());
        userInfo.setNickname(user.getNickname());
        response.setUserInfo(userInfo);

        return response;
    }

    @Override
    public String generateVerificationCode() {
        // 生成6位数字验证码
        String code = String.format("%06d", new Random().nextInt(999999));
        // 存储验证码，实际项目中应该设置过期时间
        verificationCodes.put(code, code);
        return code;
    }

    @Override
    public boolean validateVerificationCode(String code) {
        return verificationCodes.containsKey(code);
    }
}
