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

package com.github.fauu.natrank.model;

public class MatchDataError {

  private int lineNo;
  private String line;
  private MatchDataErrorType type;

  public MatchDataError(int lineNo, String line, MatchDataErrorType type) {
    this.lineNo = lineNo;
    this.line = line;
    this.type = type;
  }

  public int getLineNo() {
    return lineNo;
  }

  public void setLineNo(int lineNo) {
    this.lineNo = lineNo;
  }

  public String getLine() {
    return line;
  }

  public void setLine(String line) {
    this.line = line;
  }

  public MatchDataErrorType getType() {
    return type;
  }

  public void setType(MatchDataErrorType type) {
    this.type = type;
  }

}
