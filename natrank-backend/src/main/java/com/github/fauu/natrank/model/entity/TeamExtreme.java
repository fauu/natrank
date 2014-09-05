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

package com.github.fauu.natrank.model.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "TeamExtreme")
public class TeamExtreme extends BaseEntity {

  @Transient
  private int typeId;

  @ManyToOne
  @JoinColumn(name = "type_id")
  @JsonManagedReference
  private TeamExtremeType type;

  @Column(name = "value")
  private int value;

  @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
  @JoinTable(name = "TeamExtremePeriod",
             joinColumns = { @JoinColumn(name = "team_extreme_id", nullable = false) },
             inverseJoinColumns = { @JoinColumn(name = "period_id", nullable = false) })
  @JsonManagedReference
  private List<Period> periods;

  @OneToOne(mappedBy = "highestRank", cascade = CascadeType.MERGE)
  @JsonBackReference
  private Team highestRankTeam;

  @OneToOne(mappedBy = "lowestRank", cascade = CascadeType.MERGE)
  @JsonBackReference
  private Team lowestRankTeam;

  @OneToOne(mappedBy = "highestRating", cascade = CascadeType.MERGE)
  @JsonBackReference
  private Team highestRatingTeam;

  @OneToOne(mappedBy = "lowestRating", cascade = CascadeType.MERGE)
  @JsonBackReference
  private Team lowestRatingTeam;

  public TeamExtreme(int typeId, Team team , int value) {
    this.typeId = typeId;
    this.value = value;

    switch (typeId) {
      case 1:
        this.highestRankTeam = team;
        break;
      case 2:
        this.lowestRankTeam = team;
        break;
      case 3:
        this.highestRatingTeam = team;
        break;
      case 4:
        this.lowestRatingTeam = team;
        break;
    }
  }

}
