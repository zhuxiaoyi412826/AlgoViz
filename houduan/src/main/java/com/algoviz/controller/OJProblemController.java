package com.algoviz.controller;

import com.algoviz.entity.OJProblem;
import com.algoviz.service.OJProblemService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/problems")
@Tag(name = "题目管理", description = "OJ题目相关接口")
public class OJProblemController {

    private static final Logger logger = LoggerFactory.getLogger(OJProblemController.class);

    @Autowired
    private OJProblemService problemService;

    @GetMapping
    @Operation(summary = "获取题目列表", description = "获取所有题目或按条件筛选")
    public Map<String, Object> getProblems(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String difficulty) {
        
        logger.info("获取题目列表 - 关键词: {}, 难度: {}", keyword, difficulty);
        
        Map<String, Object> result = new HashMap<>();
        List<OJProblem> problems;

        if (keyword != null && !keyword.isEmpty()) {
            problems = problemService.searchProblems(keyword);
        } else if (difficulty != null && !difficulty.isEmpty()) {
            problems = problemService.getProblemsByDifficulty(difficulty);
        } else {
            problems = problemService.getActiveProblems();
        }

        result.put("success", true);
        result.put("problems", problems);
        result.put("count", problems.size());
        
        return result;
    }

    @GetMapping("/all")
    @Operation(summary = "获取所有题目(含禁用)", description = "获取所有题目，包括已禁用的")
    public Map<String, Object> getAllProblems() {
        logger.info("获取所有题目");
        
        Map<String, Object> result = new HashMap<>();
        List<OJProblem> problems = problemService.getAllProblems();
        
        result.put("success", true);
        result.put("problems", problems);
        result.put("count", problems.size());
        
        return result;
    }

    @GetMapping("/{id}")
    @Operation(summary = "获取题目详情", description = "根据ID获取题目详细信息")
    public Map<String, Object> getProblemById(@PathVariable String id) {
        logger.info("获取题目详情：{}", id);
        
        Map<String, Object> result = new HashMap<>();
        OJProblem problem = problemService.getProblemById(id);
        
        if (problem != null) {
            result.put("success", true);
            result.put("problem", problem);
        } else {
            result.put("success", false);
            result.put("message", "题目不存在");
        }
        
        return result;
    }

    @GetMapping("/by-no/{problemNo}")
    @Operation(summary = "按题号获取题目", description = "根据题号获取题目详细信息")
    public Map<String, Object> getProblemByNo(@PathVariable String problemNo) {
        logger.info("获取题目：{}", problemNo);
        
        Map<String, Object> result = new HashMap<>();
        OJProblem problem = problemService.getProblemByNo(problemNo);
        
        if (problem != null) {
            result.put("success", true);
            result.put("problem", problem);
        } else {
            result.put("success", false);
            result.put("message", "题目不存在");
        }
        
        return result;
    }

    @PostMapping
    @Operation(summary = "添加题目", description = "添加新的OJ题目")
    public Map<String, Object> addProblem(@RequestBody OJProblem problem) {
        logger.info("添加题目：{}", problem.getTitle());
        
        Map<String, Object> result = new HashMap<>();
        
        try {
            problemService.addProblem(problem);
            result.put("success", true);
            result.put("message", "题目添加成功");
        } catch (Exception e) {
            logger.error("添加题目失败", e);
            result.put("success", false);
            result.put("message", "添加题目失败：" + e.getMessage());
        }
        
        return result;
    }

    @PutMapping("/{id}")
    @Operation(summary = "更新题目", description = "更新题目信息")
    public Map<String, Object> updateProblem(@PathVariable String id, @RequestBody OJProblem problem) {
        logger.info("更新题目：{}", id);
        
        Map<String, Object> result = new HashMap<>();
        
        try {
            problem.setId(id);
            problemService.updateProblem(problem);
            result.put("success", true);
            result.put("message", "题目更新成功");
        } catch (Exception e) {
            logger.error("更新题目失败", e);
            result.put("success", false);
            result.put("message", "更新题目失败：" + e.getMessage());
        }
        
        return result;
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "删除题目", description = "删除指定题目")
    public Map<String, Object> deleteProblem(@PathVariable String id) {
        logger.info("删除题目：{}", id);
        
        Map<String, Object> result = new HashMap<>();
        
        try {
            problemService.deleteProblem(id);
            result.put("success", true);
            result.put("message", "题目删除成功");
        } catch (Exception e) {
            logger.error("删除题目失败", e);
            result.put("success", false);
            result.put("message", "删除题目失败：" + e.getMessage());
        }
        
        return result;
    }

    @GetMapping("/stats")
    @Operation(summary = "获取统计信息", description = "获取题目统计信息")
    public Map<String, Object> getStats() {
        logger.info("获取题目统计");
        
        Map<String, Object> result = new HashMap<>();
        result.put("success", true);
        result.put("total", problemService.countProblems());
        result.put("easy", problemService.countByDifficulty("easy"));
        result.put("medium", problemService.countByDifficulty("medium"));
        result.put("hard", problemService.countByDifficulty("hard"));
        
        return result;
    }
}