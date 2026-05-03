package com.algoviz.mapper;

import com.algoviz.entity.OJProblem;
import org.apache.ibatis.annotations.*;
import java.util.List;

@Mapper
public interface OJProblemMapper {
    @Insert("INSERT INTO oj_problem (id, problem_no, title, difficulty, tags, description, template, status, submission_count, ac_rate, created_at, updated_at) " +
            "VALUES (#{id}, #{problemNo}, #{title}, #{difficulty}, #{tags}, #{description}, #{template}, #{status}, #{submissionCount}, #{acRate}, datetime('now'), datetime('now'))")
    int insert(OJProblem problem);

    @Select("SELECT * FROM oj_problem ORDER BY created_at DESC LIMIT #{limit} OFFSET #{offset}")
    List<OJProblem> findByPage(@Param("offset") int offset, @Param("limit") int limit);

    @Select("SELECT COUNT(*) FROM oj_problem")
    int count();

    @Select("SELECT * FROM oj_problem WHERE id = #{id}")
    OJProblem findById(String id);

    @Select("SELECT * FROM oj_problem WHERE problem_no = #{problemNo}")
    OJProblem findByProblemNo(String problemNo);

    @Update("UPDATE oj_problem SET title=#{title}, difficulty=#{difficulty}, tags=#{tags}, description=#{description}, template=#{template}, " +
            "status=#{status}, updated_at=datetime('now') WHERE id=#{id}")
    int update(OJProblem problem);

    @Delete("DELETE FROM oj_problem WHERE id=#{id}")
    int deleteById(String id);
}
