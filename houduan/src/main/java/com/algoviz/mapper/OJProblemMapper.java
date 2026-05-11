package com.algoviz.mapper;

import com.algoviz.entity.OJProblem;
import org.apache.ibatis.annotations.*;
import java.util.List;

@Mapper
public interface OJProblemMapper {
    
    @Select("SELECT * FROM oj_problem ORDER BY problem_no ASC")
    List<OJProblem> getAllProblems();
    
    @Select("SELECT * FROM oj_problem WHERE id = #{id}")
    OJProblem getProblemById(String id);
    
    @Select("SELECT * FROM oj_problem WHERE problem_no = #{problemNo}")
    OJProblem getProblemByNo(String problemNo);
    
    @Select("SELECT * FROM oj_problem WHERE title LIKE CONCAT('%', #{keyword}, '%') OR tags LIKE CONCAT('%', #{keyword}, '%') OR problem_no LIKE CONCAT('%', #{keyword}, '%') ORDER BY problem_no ASC")
    List<OJProblem> searchProblems(@Param("keyword") String keyword);
    
    @Select("SELECT * FROM oj_problem WHERE difficulty = #{difficulty} ORDER BY problem_no ASC")
    List<OJProblem> getProblemsByDifficulty(String difficulty);
    
    @Select("SELECT * FROM oj_problem WHERE status = #{status} ORDER BY problem_no ASC")
    List<OJProblem> getProblemsByStatus(String status);
    
    @Insert("INSERT INTO oj_problem (id, problem_no, title, difficulty, tags, description, template, status, submission_count, ac_rate, created_at, updated_at) " +
            "VALUES (#{id}, #{problemNo}, #{title}, #{difficulty}, #{tags}, #{description}, #{template}, #{status}, #{submissionCount}, #{acRate}, #{createdAt}, #{updatedAt})")
    void insertProblem(OJProblem problem);
    
    @Update("UPDATE oj_problem SET problem_no=#{problemNo}, title=#{title}, difficulty=#{difficulty}, tags=#{tags}, description=#{description}, " +
            "template=#{template}, status=#{status}, submission_count=#{submissionCount}, ac_rate=#{acRate}, updated_at=#{updatedAt} WHERE id=#{id}")
    void updateProblem(OJProblem problem);
    
    @Delete("DELETE FROM oj_problem WHERE id = #{id}")
    void deleteProblem(String id);
    
    @Update("UPDATE oj_problem SET submission_count = submission_count + 1 WHERE id = #{id}")
    void updateSubmissionCount(String id);
    
    @Select("SELECT COUNT(*) FROM oj_problem")
    int countProblems();
    
    @Select("SELECT COUNT(*) FROM oj_problem WHERE difficulty = #{difficulty}")
    int countByDifficulty(String difficulty);
    
    // 原有方法保持兼容
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