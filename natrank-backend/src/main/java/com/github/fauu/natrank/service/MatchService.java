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

package com.github.fauu.natrank.service;

import com.github.fauu.natrank.model.City;
import com.github.fauu.natrank.model.Match;
import com.github.fauu.natrank.model.report.MatchReport;
import org.springframework.dao.DataAccessException;

import java.util.List;

public interface MatchService {

  City findCityById(int id) throws DataAccessException;

  List<Match> findAllMatches() throws DataAccessException;

  List<MatchReport> findAllMatchReports() throws DataAccessException;

}
