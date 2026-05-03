package com.algoviz.util;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Component;

import javax.crypto.Cipher;
import javax.crypto.spec.GCMParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.security.*;
import java.security.spec.PKCS8EncodedKeySpec;
import java.util.Base64;
import java.util.UUID;

@Component
public class WechatPayUtil {
    
    private static final ObjectMapper objectMapper = new ObjectMapper();
    
    /**
     * 生成随机字符串
     */
    public static String generateNonceStr() {
        return UUID.randomUUID().toString().replace("-", "");
    }
    
    /**
     * 生成商户订单号
     */
    public static String generateOutTradeNo() {
        return "ALG" + System.currentTimeMillis();
    }
    
    /**
     * 构造V3签名
     */
    public static String buildSignature(String method, String url, String body, 
                                        String nonceStr, long timestamp, 
                                        PrivateKey privateKey) throws Exception {
        String signStr = method + "\n" +
                        url + "\n" +
                        timestamp + "\n" +
                        nonceStr + "\n" +
                        (body != null ? body : "") + "\n";
        
        Signature signature = Signature.getInstance("SHA256withRSA");
        signature.initSign(privateKey);
        signature.update(signStr.getBytes(StandardCharsets.UTF_8));
        return Base64.getEncoder().encodeToString(signature.sign());
    }
    
    /**
     * 构造Authorization头部
     */
    public static String buildAuthorization(String mchId, String serialNo, 
                                           String nonceStr, long timestamp, 
                                           String signature) {
        return "WECHATPAY2-SHA256-RSA2048 mchid=\"" + mchId +
                "\",nonce_str=\"" + nonceStr +
                "\",timestamp=\"" + timestamp +
                "\",serial_no=\"" + serialNo +
                "\",signature=\"" + signature + "\"";
    }
    
    /**
     * 从私钥字符串加载PrivateKey
     */
    public static PrivateKey loadPrivateKey(String privateKeyStr) throws Exception {
        // 去除PEM格式的头部和尾部
        privateKeyStr = privateKeyStr
                .replace("-----BEGIN PRIVATE KEY-----", "")
                .replace("-----END PRIVATE KEY-----", "")
                .replaceAll("\\s+", "");
        
        byte[] keyBytes = Base64.getDecoder().decode(privateKeyStr);
        PKCS8EncodedKeySpec keySpec = new PKCS8EncodedKeySpec(keyBytes);
        KeyFactory keyFactory = KeyFactory.getInstance("RSA");
        return keyFactory.generatePrivate(keySpec);
    }
    
    /**
     * 解密回调通知数据
     */
    public static String decryptNotifyData(String ciphertext, String nonce, 
                                            String associatedData, 
                                            String apiV3Key) throws Exception {
        byte[] keyBytes = apiV3Key.getBytes(StandardCharsets.UTF_8);
        byte[] cipherBytes = Base64.getDecoder().decode(ciphertext);
        byte[] nonceBytes = nonce.getBytes(StandardCharsets.UTF_8);
        byte[] aadBytes = associatedData != null ? 
                            associatedData.getBytes(StandardCharsets.UTF_8) : new byte[0];
        
        SecretKeySpec keySpec = new SecretKeySpec(keyBytes, "AES");
        GCMParameterSpec parameterSpec = new GCMParameterSpec(128, nonceBytes);
        
        Cipher cipher = Cipher.getInstance("AES/GCM/NoPadding");
        cipher.init(Cipher.DECRYPT_MODE, keySpec, parameterSpec);
        cipher.updateAAD(aadBytes);
        
        byte[] decryptedBytes = cipher.doFinal(cipherBytes);
        return new String(decryptedBytes, StandardCharsets.UTF_8);
    }
    
    /**
     * 生成二维码内容（模拟支付）
     * 实际项目中会调用真实的微信支付API获取二维码链接
     */
    public static String generateQRCodeText(String productId, String productName, 
                                            int amount) {
        return "wechat://pay/product/" + productId + "/amount/" + amount;
    }
}
