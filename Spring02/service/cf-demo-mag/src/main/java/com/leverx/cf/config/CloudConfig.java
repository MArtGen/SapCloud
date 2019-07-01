package com.leverx.cf.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.sap.cloud.sdk.cloudplatform.CloudPlatformAccessor;
import com.sap.cloud.sdk.cloudplatform.ScpCfCloudPlatform;

@Configuration
public class CloudConfig {

	@Bean
	public ScpCfCloudPlatform platform() {
		return (ScpCfCloudPlatform)CloudPlatformAccessor.getCloudPlatform();
	}

}
