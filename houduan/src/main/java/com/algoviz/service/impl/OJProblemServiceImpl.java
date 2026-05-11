package com.algoviz.service.impl;

import com.algoviz.entity.OJProblem;
import com.algoviz.mapper.OJProblemMapper;
import com.algoviz.service.OJProblemService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.UUID;

@Service
public class OJProblemServiceImpl implements OJProblemService {

    private static final Logger logger = LoggerFactory.getLogger(OJProblemServiceImpl.class);

    @Autowired
    private OJProblemMapper problemMapper;

    @Override
    public List<OJProblem> getAllProblems() {
        logger.info("获取所有题目列表");
        return problemMapper.getAllProblems();
    }

    @Override
    public OJProblem getProblemById(String id) {
        logger.info("获取题目详情：{}", id);
        return problemMapper.getProblemById(id);
    }

    @Override
    public OJProblem getProblemByNo(String problemNo) {
        logger.info("获取题目：{}", problemNo);
        return problemMapper.getProblemByNo(problemNo);
    }

    @Override
    public List<OJProblem> searchProblems(String keyword) {
        logger.info("搜索题目：{}", keyword);
        return problemMapper.searchProblems(keyword);
    }

    @Override
    public List<OJProblem> getProblemsByDifficulty(String difficulty) {
        logger.info("获取难度为 {} 的题目", difficulty);
        return problemMapper.getProblemsByDifficulty(difficulty);
    }

    @Override
    public List<OJProblem> getActiveProblems() {
        logger.info("获取可用题目列表");
        return problemMapper.getProblemsByStatus("ACTIVE");
    }

    @Override
    public void addProblem(OJProblem problem) {
        logger.info("添加新题目：{}", problem.getTitle());
        
        problem.setId(UUID.randomUUID().toString());
        problem.setStatus("ACTIVE");
        problem.setSubmissionCount(0);
        problem.setAcRate(0.0);
        
        String now = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
        problem.setCreatedAt(now);
        problem.setUpdatedAt(now);
        
        problemMapper.insertProblem(problem);
        logger.info("题目添加成功：{}", problem.getId());
    }

    @Override
    public void updateProblem(OJProblem problem) {
        logger.info("更新题目：{}", problem.getId());
        
        problem.setUpdatedAt(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
        problemMapper.updateProblem(problem);
        
        logger.info("题目更新成功：{}", problem.getId());
    }

    @Override
    public void deleteProblem(String id) {
        logger.info("删除题目：{}", id);
        problemMapper.deleteProblem(id);
        logger.info("题目删除成功：{}", id);
    }

    @Override
    public void incrementSubmission(String problemId) {
        logger.info("增加提交次数：{}", problemId);
        problemMapper.updateSubmissionCount(problemId);
    }

    @Override
    public int countProblems() {
        return problemMapper.countProblems();
    }

    @Override
    public int countByDifficulty(String difficulty) {
        return problemMapper.countByDifficulty(difficulty);
    }
}