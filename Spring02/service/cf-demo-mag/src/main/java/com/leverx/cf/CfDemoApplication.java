package com.leverx.cf;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletComponentScan;

@SpringBootApplication
@ServletComponentScan("com.sap.cloud.sdk")
public class CfDemoApplication {

	public static void main(String[] args) {
		SpringApplication.run(CfDemoApplication.class, args);
	}

}
