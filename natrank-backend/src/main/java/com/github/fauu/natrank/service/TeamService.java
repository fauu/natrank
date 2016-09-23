/*
 * Copyright (C) 2014-2016 natrank Developers (http://github.com/fauu/natrank)
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

import com.github.fauu.natrank.model.entity.Team;
import com.github.fauu.natrank.model.entity.TeamRank;
import com.github.fauu.natrank.model.entity.TeamRating;
import org.springframework.dao.DataAccessException;

import java.util.List;

public interface TeamService {

  Team findById(int id) throws DataAccessException;

  Team findByName(String name) throws DataAccessException;

  List<TeamRank> findRanksByName(String name) throws DataAccessException;

  List<TeamRating> findRatingsByName(String name) throws DataAccessException;

}
