package com.leverx.cf.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;

import org.springframework.stereotype.Service;

import com.auth0.jwt.interfaces.Claim;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.leverx.cf.model.domain.ClaimInfo;
import com.leverx.cf.model.domain.TokenInfo;
import com.sap.cloud.sdk.cloudplatform.security.AuthToken;
import com.sap.cloud.sdk.cloudplatform.security.AuthTokenAccessor;
import com.sap.cloud.sdk.cloudplatform.security.Authorization;
import com.sap.cloud.sdk.cloudplatform.security.user.ScpCfUser;
import com.sap.cloud.sdk.cloudplatform.security.user.UserAccessor;
import com.sap.cloud.sdk.s4hana.connectivity.exception.AccessDeniedException;

@Service
public class SecurityService {

	public List<String> getScopes() {
		List<String> scopeList = new ArrayList<String>();
		ScpCfUser user = (ScpCfUser)UserAccessor.getCurrentUser();
		Set<Authorization> scopes = user.getAuthorizations();
		scopes.forEach(scope -> {
			scopeList.add(scope.getName());
		});
		return scopeList;
	}

	public void userHasAuthorization(String authorization) throws AccessDeniedException {
		if (!UserAccessor.getCurrentUser().hasAuthorization(new Authorization(authorization))) {
			throw new AccessDeniedException("User action is not permitted! Insufficient privilege!");
		}
	}
	
	public TokenInfo getTokenInfo() {
		Optional<AuthToken> auth = AuthTokenAccessor.getCurrentToken();
		if (!auth.isPresent()) {
			return null;
		}
		DecodedJWT jwtToken = auth.get().getJwt();
		TokenInfo tokenInfo = new TokenInfo();
		List<ClaimInfo> claimList = new ArrayList<ClaimInfo>();
		Map<String, Claim> claimMap = jwtToken.getClaims();
		claimMap.forEach((key, value) -> {
			ClaimInfo claimInfo = new ClaimInfo();
			claimInfo.setName(key);
			claimInfo.setValue(value.asString());
			claimList.add(claimInfo);
		});
		tokenInfo.setHeader(jwtToken.getHeader());
		tokenInfo.setPayload(jwtToken.getPayload());
		tokenInfo.setSignature(jwtToken.getSignature());
		tokenInfo.setToken(jwtToken.getToken());
		tokenInfo.setClaimList(claimList);
		return tokenInfo;
	}
	
}
