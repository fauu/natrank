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

import com.github.fauu.natrank.model.entity.Match;
import com.github.fauu.natrank.model.entity.NotableMatchCategory;
import org.springframework.dao.DataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Map;

public interface MatchService {

  Page<Match> findAll(Pageable pageable) throws DataAccessException;

  Page<Match> findByYear(int year, Pageable pageable) throws DataAccessException;

  Page<Match> findByCurrentTeamName(String name, Pageable pageable) throws DataAccessException;

  Map<NotableMatchCategory, List<Match>> findNotableMatchesByTeamName(String name) throws DataAccessException;

  List<NotableMatchCategory> findNotableMatchCategories() throws DataAccessException;

  List<Integer> getTeamFormByName(String name) throws DataAccessException;

  void generateNotableMatches() throws DataAccessException;

}
