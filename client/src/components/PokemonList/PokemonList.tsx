import React from 'react';
import {
  Card, Col, Row, Input,
} from 'antd';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './PokemonList.scss';
import { filterPokemonListByName } from '../../actions/PokemonActions';

import { Pokemon } from '../../interfaces/interfaces';

const PokemonList = (props: any) => {
  const history = useHistory();
  const { filteredPokemonList, searchValue } = props;

  return (
    <div>
      <Card className="PokemonList">
        <h1>Список покемонов</h1>
        <Input
          placeholder="Фильтр по имени"
          value={searchValue}
          onChange={(event) => {
            props.filterPokemonListByName(event.target.value);
          }}
          style={{ width: 200, marginBottom: 30 }}
        />
        <Row gutter={16}>
          {filteredPokemonList
          && filteredPokemonList.length > 0
          && filteredPokemonList.map((pokemon: Pokemon) => (
            <Col span={4} xs={16} sm={12} md={8} xl={4} key={pokemon.name}>
              <Card
                hoverable
                onClick={() => {
                  history.push(`/pokemon/${pokemon.name}`);
                }}
                style={{ marginBottom: 30 }}
                cover={
                  <img alt="example" src={pokemon.sprites.front_default} />
                }
              >
                <Card.Meta title={pokemon.name} />
              </Card>
            </Col>
          ))}
        </Row>
      </Card>
    </div>
  );
};
const mapStateToProps = (state: any) => ({
  pokemonList: state.pokemonReducer.pokemonList,
  filteredPokemonList: state.pokemonReducer.filteredPokemonList,
  searchValue: state.pokemonReducer.searchValue,
});
const mapDispatchToProps = {
  filterPokemonListByName,
};

export default connect(mapStateToProps, mapDispatchToProps)(PokemonList);
