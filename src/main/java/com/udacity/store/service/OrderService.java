package com.udacity.store.service;

import com.udacity.store.model.Order;
import com.udacity.store.repository.OrderRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    public void submitOrder(Order order) {
        orderRepository.save(order);
        log.info("Order saved: {}", order);
    }

}
