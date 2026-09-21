package com.example.study_jvm.network.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class NetworkTestController {

    @GetMapping("/network")
    public ResponseEntity<String> networkTest(){
        return ResponseEntity.ok("network study");
    }

}
