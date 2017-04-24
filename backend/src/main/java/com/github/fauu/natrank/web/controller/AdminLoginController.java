package com.github.fauu.natrank.web.controller;

//import com.github.fauu.natrank.security.SecurityContextAccessor;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping("/admin")
public class AdminLoginController {

  // @Autowired
  // SecurityContextAccessor securityContextAccessor;

  @RequestMapping(value = "/login", method = RequestMethod.GET)
  public String login() {
    // if (securityContextAccessor.isCurrentAuthenticationAnonymous()) {
    //   return "login";
    // } else {
      return "redirect:/admin";
    //}
  }

}
