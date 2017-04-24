package com.github.fauu.natrank.util;

public final class StringUtils {

  private StringUtils() { }

  public static String urlFriendlyToProper(String input) {
    String[] words = input.split("-");

    StringBuilder builder = new StringBuilder();

    for (String word : words) {
      builder.append(word.substring(0, 1).toUpperCase())
             .append(word.substring(1).toLowerCase())
             .append(" ");
    }

    return builder.toString();
  }

}
