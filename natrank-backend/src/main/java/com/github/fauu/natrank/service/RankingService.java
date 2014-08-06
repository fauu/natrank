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

package com.github.fauu.natrank.service;

import com.github.fauu.natrank.model.entity.Ranking;
import org.joda.time.LocalDate;
import org.springframework.dao.DataAccessException;

public interface RankingService {

  Ranking findLatest() throws DataAccessException;

  Ranking findByDate(LocalDate date) throws DataAccessException;

  void calculateRanking() throws DataAccessException;

}
