package com.algoviz.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

import java.security.MessageDigest;
import java.util.Arrays;
import java.util.Map;
import java.util.HashMap;

@RestController
@RequestMapping("/wx")
@Tag(name = "微信接口", description = "微信公众号相关接口")
public class WechatController {

    @Value("${wechat.token:algoviz_token}")
    private String token;

    @Value("${wechat.appid}")
    private String appid;

    @Value("${wechat.appsecret}")
    private String appsecret;

    /**
     * 微信公众号服务器验证接口
     * 微信服务器会发送GET请求验证服务器地址
     * 在微信公众平台配置时，需要填写此URL作为服务器地址
     */
    @GetMapping("/callback")
    @Operation(summary = "微信回调验证", description = "用于微信公众平台验证服务器地址")
    public String verify(
            @RequestParam(value = "signature", required = false) String signature,
            @RequestParam(value = "timestamp", required = false) String timestamp,
            @RequestParam(value = "nonce", required = false) String nonce,
            @RequestParam(value = "echostr", required = false) String echostr) {

        System.out.println("收到微信验证请求:");
        System.out.println("signature: " + signature);
        System.out.println("timestamp: " + timestamp);
        System.out.println("nonce: " + nonce);
        System.out.println("echostr: " + echostr);

        // 验证请求来源
        if (checkSignature(signature, timestamp, nonce)) {
            System.out.println("验证成功!");
            return echostr;
        }

        System.out.println("验证失败!");
        return "验证失败";
    }

    /**
     * 接收微信公众号推送的消息
     * 微信服务器会发送POST请求推送用户消息
     */
    @PostMapping("/callback")
    @Operation(summary = "接收微信消息", description = "接收微信公众号推送的用户消息")
    public String handleMessage(
            @RequestParam(value = "signature", required = false) String signature,
            @RequestParam(value = "timestamp", required = false) String timestamp,
            @RequestParam(value = "nonce", required = false) String nonce,
            @RequestBody String requestBody) {

        System.out.println("收到微信消息:");
        System.out.println("signature: " + signature);
        System.out.println("timestamp: " + timestamp);
        System.out.println("nonce: " + nonce);
        System.out.println("body: " + requestBody);

        // 验证请求来源
        if (!checkSignature(signature, timestamp, nonce)) {
            System.out.println("消息验证失败!");
            return "error";
        }

        // 处理消息并返回响应
        return processMessage(requestBody);
    }

    /**
     * 验证微信签名的方法
     */
    private boolean checkSignature(String signature, String timestamp, String nonce) {
        if (signature == null || timestamp == null || nonce == null) {
            return false;
        }

        String[] arr = new String[]{token, timestamp, nonce};
        Arrays.sort(arr);

        StringBuilder content = new StringBuilder();
        for (String s : arr) {
            content.append(s);
        }

        try {
            MessageDigest md = MessageDigest.getInstance("SHA-1");
            byte[] digest = md.digest(content.toString().getBytes());
            String tmpStr = byteToStr(digest);
            return tmpStr != null && tmpStr.equals(signature.toUpperCase());
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    /**
     * 将字节数组转换为十六进制字符串
     */
    private String byteToStr(byte[] byteArray) {
        StringBuilder strDigest = new StringBuilder();
        for (byte b : byteArray) {
            strDigest.append(byteToHex(b));
        }
        return strDigest.toString();
    }

    /**
     * 将字节转换为十六进制字符串
     */
    private String byteToHex(byte b) {
        char[] digit = {'0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'};
        char[] tempChar = {digit[(b >>> 4) & 0x0F], digit[b & 0x0F]};
        return new String(tempChar);
    }

    /**
     * 处理接收到的消息
     * 目前只是简单回复，后续可以根据实际需求完善
     */
    private String processMessage(String requestBody) {
        // 实际项目中，这里需要解析XML格式的消息
        // 并根据消息类型进行相应的处理

        // 示例：如果是关注事件，返回欢迎消息
        if (requestBody.contains("subscribe")) {
            return buildTextMessage("welcome", "感谢关注AlgoViz！我们将为您提供优质的数据结构和算法学习体验。");
        }

        // 示例：如果是文本消息，返回帮助信息
        if (requestBody.contains("msg type=\"text\"")) {
            return buildTextMessage("text", "您可以输入以下命令：\n1. 输入\"帮助\"查看所有功能\n2. 输入\"课程\"查看课程列表\n3. 输入\"联系\"获取联系方式");
        }

        // 默认返回成功
        return "success";
    }

    /**
     * 构建文本消息XML
     */
    private String buildTextMessage(String toUserName, String content) {
        String fromUserName = "gh_demo"; // 示例
        long createTime = System.currentTimeMillis() / 1000;

        return "<xml>" +
                "<ToUserName><![CDATA[" + toUserName + "]]></ToUserName>" +
                "<FromUserName><![CDATA[" + fromUserName + "]]></FromUserName>" +
                "<CreateTime>" + createTime + "</CreateTime>" +
                "<MsgType><![CDATA[text]]></MsgType>" +
                "<Content><![CDATA[" + content + "]]></Content>" +
                "</xml>";
    }

    /**
     * 获取微信配置信息（用于前端）
     */
    @GetMapping("/config")
    @Operation(summary = "获取微信配置", description = "获取微信公众号配置信息")
    public Map<String, String> getWechatConfig() {
        Map<String, String> config = new HashMap<>();
        config.put("appid", appid);
        config.put("appsecret", appsecret);
        return config;
    }
}
