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
import com.github.fauu.natrank.repository.MatchRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class MatchServiceImpl implements MatchService {

  @Autowired
  private MatchRepository matchRepository;

  @Override
  @Transactional(readOnly = true)
  public List<Match> findAll() throws DataAccessException {
    return matchRepository.findAll();
  }

}
