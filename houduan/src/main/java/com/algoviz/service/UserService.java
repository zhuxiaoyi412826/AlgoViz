package com.algoviz.service;

import com.algoviz.entity.User;

public interface UserService {
    User findByUsername(String username);
    User findByEmail(String email);
    User createUser(User user);
    User updateUser(User user);
    void updateLastLogin(Integer userId);
}
