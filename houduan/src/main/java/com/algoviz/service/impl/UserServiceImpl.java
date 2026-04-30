package com.algoviz.service.impl;

import com.algoviz.entity.User;
import com.algoviz.mapper.UserMapper;
import com.algoviz.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserMapper userMapper;

    @Override
    public User findByUsername(String username) {
        return userMapper.findByUsername(username);
    }

    @Override
    public User findByEmail(String email) {
        return userMapper.findByEmail(email);
    }

    @Override
    public User createUser(User user) {
        user.setCreatedAt(LocalDateTime.now());
        user.setUpdatedAt(LocalDateTime.now());
        user.setLastLoginAt(LocalDateTime.now());
        userMapper.insert(user);
        return user;
    }

    @Override
    public User updateUser(User user) {
        user.setUpdatedAt(LocalDateTime.now());
        userMapper.update(user);
        return user;
    }

    @Override
    public void updateLastLogin(Integer userId) {
        userMapper.updateLastLoginAt(userId);
    }
}
