package com.github.fauu.natrank.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationTrustResolver;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

public class SecurityContextAccessorImpl implements SecurityContextAccessor {

  @Autowired
  private AuthenticationTrustResolver authenticationTrustResolver;

  @Override
  public boolean isCurrentAuthenticationAnonymous() {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

    return authenticationTrustResolver.isAnonymous(authentication);
  }

}
