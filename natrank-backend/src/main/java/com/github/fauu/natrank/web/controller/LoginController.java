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

package com.github.fauu.natrank.web.controller;

import com.github.fauu.natrank.security.SecurityContextAccessor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping("/admin")
public class LoginController {

  @Autowired
  SecurityContextAccessor securityContextAccessor;

  @Autowired
  @Qualifier("defaultTargetUrl")
  private String defaultTargetUrl;

  @RequestMapping(value = "/login", method = RequestMethod.GET)
  public String login() {
    if (securityContextAccessor.isCurrentAuthenticationAnonymous()) {
      return "login";
    } else {
      return "redirect:" + defaultTargetUrl;
    }
  }

}
