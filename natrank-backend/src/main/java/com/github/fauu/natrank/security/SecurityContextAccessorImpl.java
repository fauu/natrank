/*
 * Copyright (C) 2014 natrank Developers (http://github.com/fauu/natrank)
 *
 * This software is licensed under the GNU General Public License
 * (version 3 or later). See the COPYING file in this distribution.
 *
 * You should have received a copy of the GNU Library General Public License
 * along with this software. If not, see <http://www.gnu.org/licenses/>.
 *
 * Authored by: Piotr Grabowski <fau999@gmail.com>
 */

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
