package com.algoviz.mapper;

import com.algoviz.entity.Announcement;
import org.apache.ibatis.annotations.*;
import java.util.List;

@Mapper
public interface AnnouncementMapper {
    @Insert("INSERT INTO announcement (id, title, content, type, is_top, publish_time, status, created_at) " +
            "VALUES (#{id}, #{title}, #{content}, #{type}, #{isTop}, #{publishTime}, #{status}, datetime('now'))")
    int insert(Announcement announcement);

    @Select("SELECT * FROM announcement ORDER BY is_top DESC, publish_time DESC LIMIT #{limit} OFFSET #{offset}")
    List<Announcement> findByPage(@Param("offset") int offset, @Param("limit") int limit);

    @Select("SELECT COUNT(*) FROM announcement")
    int count();

    @Select("SELECT * FROM announcement WHERE id = #{id}")
    Announcement findById(String id);

    @Update("UPDATE announcement SET title=#{title}, content=#{content}, type=#{type}, is_top=#{isTop}, publish_time=#{publishTime}, status=#{status} WHERE id=#{id}")
    int update(Announcement announcement);

    @Delete("DELETE FROM announcement WHERE id=#{id}")
    int deleteById(String id);
}
