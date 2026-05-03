package com.algoviz.service.impl;

import com.algoviz.config.WechatPayConfig;
import com.algoviz.dto.CreateOrderResponse;
import com.algoviz.dto.QueryOrderResponse;
import com.algoviz.entity.Order;
import com.algoviz.entity.Product;
import com.algoviz.mapper.OrderMapper;
import com.algoviz.mapper.ProductMapper;
import com.algoviz.service.PaymentService;
import com.algoviz.util.WechatPayUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class PaymentServiceImpl implements PaymentService {
    
    private static final Logger logger = LoggerFactory.getLogger(PaymentServiceImpl.class);
    
    @Autowired
    private WechatPayConfig wechatPayConfig;
    
    @Autowired
    private ProductMapper productMapper;
    
    @Autowired
    private OrderMapper orderMapper;
    
    @Override
    public List<Product> getProductList() {
        logger.info("获取商品列表");
        return productMapper.getAllProducts();
    }
    
    @Override
    public Product getProduct(String productId) {
        logger.info("获取商品详情：{}", productId);
        return productMapper.getProductById(productId);
    }
    
    @Override
    public CreateOrderResponse createOrder(String productId, Long userId) {
        logger.info("创建订单，商品ID：{}，用户ID：{}", productId, userId);
        
        Product product = productMapper.getProductById(productId);
        if (product == null) {
            logger.error("商品不存在：{}", productId);
            return CreateOrderResponse.fail("商品不存在");
        }
        
        // 生成订单号
        String orderId = WechatPayUtil.generateOutTradeNo();
        
        // 创建订单
        Order order = new Order();
        order.setOrderId(orderId);
        order.setProductId(productId);
        order.setProductName(product.getProductName());
        order.setAmount(product.getPrice());
        order.setUserId(userId);
        order.setStatus("PENDING");
        order.setCreateTime(LocalDateTime.now());
        order.setUpdateTime(LocalDateTime.now());
        
        // 插入数据库
        orderMapper.insertOrder(order);
        logger.info("订单创建成功：{}", orderId);
        
        // 生成支付二维码（模拟）
        String qrCodeText = WechatPayUtil.generateQRCodeText(
            productId, product.getProductName(), product.getPrice());
        
        return CreateOrderResponse.success(orderId, qrCodeText, 
            product.getProductName(), product.getPrice());
    }
    
    @Override
    public QueryOrderResponse queryOrder(String orderId) {
        logger.info("查询订单状态：{}", orderId);
        
        Order order = orderMapper.getOrderById(orderId);
        if (order == null) {
            logger.error("订单不存在：{}", orderId);
            return QueryOrderResponse.fail("订单不存在");
        }
        
        return QueryOrderResponse.success(order.getStatus(), orderId, 
            order.getProductName(), order.getAmount());
    }
    
    @Override
    public void handlePaymentCallback(String jsonData) {
        logger.info("收到支付回调：{}", jsonData);
        // 实际项目中会解析微信支付的回调数据
        // 这里先简化处理
    }
    
    @Override
    public void mockPayment(String orderId) {
        logger.info("模拟支付成功：{}", orderId);
        
        Order order = orderMapper.getOrderById(orderId);
        if (order == null) {
            logger.error("订单不存在：{}", orderId);
            return;
        }
        
        if ("SUCCESS".equals(order.getStatus())) {
            logger.info("订单已支付：{}", orderId);
            return;
        }
        
        // 更新订单支付信息
        String wechatTradeNo = "WX" + System.currentTimeMillis();
        String wechatTransactionId = "TRX" + System.currentTimeMillis();
        
        orderMapper.updateOrderPaymentInfo(orderId, wechatTradeNo, wechatTransactionId);
        logger.info("订单支付成功：{}", orderId);
    }
}
