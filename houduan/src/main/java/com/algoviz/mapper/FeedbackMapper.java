package com.algoviz.mapper;

import com.algoviz.entity.Feedback;
import org.apache.ibatis.annotations.*;
import java.util.List;

@Mapper
public interface FeedbackMapper {
    @Insert("INSERT INTO feedback (id, user_id, user_nickname, type, content, images, status, created_at) " +
            "VALUES (#{id}, #{userId}, #{userNickname}, #{type}, #{content}, #{images}, #{status}, datetime('now'))")
    int insert(Feedback feedback);

    @Select("SELECT * FROM feedback ORDER BY created_at DESC LIMIT #{limit} OFFSET #{offset}")
    List<Feedback> findByPage(@Param("offset") int offset, @Param("limit") int limit);

    @Select("SELECT COUNT(*) FROM feedback")
    int count();

    @Select("SELECT * FROM feedback WHERE id = #{id}")
    Feedback findById(String id);

    @Update("UPDATE feedback SET status=#{status}, reply=#{reply}, reply_time=#{replyTime} WHERE id=#{id}")
    int update(Feedback feedback);

    @Delete("DELETE FROM feedback WHERE id=#{id}")
    int deleteById(String id);
}
