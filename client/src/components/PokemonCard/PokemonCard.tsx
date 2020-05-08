import React from 'react';
import './PokemonCard.scss';
import {
  Breadcrumb, Card, Col, Row,
} from 'antd';
import { Link, useHistory, useParams } from 'react-router-dom';
import { connect } from 'react-redux';

const propsMapName: any = {
  abilities: 'Умения',
  base_experience: 'Базовый опыт',
  weight: 'Вес',
  types: 'Тип покемона',
};

const PokemonCard = (props: any) => {
  const { name } = useParams();
  const { pokemonListByName } = props;
  const pokemonInfo = (pokemonListByName
    && pokemonListByName[name])
    || {};
  const history = useHistory();
  return (
    <div>
      <Card className="PokemonCard">
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/">Список покемонов</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>{name}</Breadcrumb.Item>
        </Breadcrumb>
        <br />
        <h1 className="pokemon-name">{pokemonInfo.name}</h1>
        <Row>
          <Col span={4}>
            <img
              style={{ width: 300 }}
              alt="example"
              src={
                (pokemonInfo
                  && pokemonInfo.sprites
                  && pokemonInfo.sprites.front_default)
                || ''
              }
            />
          </Col>
          <Col span={12}>
            {Object.keys(pokemonInfo).map((item) => (
              propsMapName[item] && (
                <div key={item} style={{ marginBottom: 15 }}>
                  <h4 style={{ marginBottom: 5 }}>
                    {propsMapName[item]}
                    :
                  </h4>
                  {item === 'abilities'
                  && pokemonInfo[item].map((arrItem: any) => (
                    <div key={arrItem.ability.name}>
                      <button
                        className="link-button"
                        onClick={() => {
                          history.push({
                            pathname: `/ability/${arrItem.ability.name}`,
                            state: { url: arrItem.ability.url },
                          });
                        }}
                        style={{ marginRight: 5 }}
                      >
                        {arrItem.ability.name}
                      </button>
                    </div>
                  ))}
                  {typeof pokemonInfo[item] === 'string'
                  || (typeof pokemonInfo[item] === 'number'
                    && pokemonInfo[item])}
                  {item === 'types'
                  && pokemonInfo[item].map((arrItem: any) => (
                    <div key={arrItem.type.name}>
                      <span style={{ marginRight: 5 }}>
                        {arrItem.type.name}
                      </span>
                    </div>
                  ))}
                </div>
              )
            ))}
          </Col>
        </Row>
      </Card>
    </div>
  );
};
const mapStateToProps = (state: any) => ({
  pokemonListByName: state.pokemonReducer.pokemonListByName,
});
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(PokemonCard);
