package com.algoviz.mapper;

import com.algoviz.entity.User;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface UserMapper {
    User findByUsername(@Param("username") String username);
    User findByEmail(@Param("email") String email);
    void insert(User user);
    void update(User user);
    void updateLastLoginAt(@Param("id") Integer id);
}
