/*
 * Copyright (C) 2014 natrank Developers (http://github.com/fauu/natrank)
 *
 * This software is licensed under the GNU General Public License
 * (version 3 or later). See the COPYING file in this distribution.
 *
 * You should have received a copy of the GNU Library General Public License
 * along with this software. If not, see <http://www.gnu.org/licenses/>.
 *
 * Authored by: Piotr Grabowski <fau999(at)gmail.com>
 */

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
