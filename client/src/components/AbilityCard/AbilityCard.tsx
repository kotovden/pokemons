import React, { useEffect, useState } from 'react';
import './AbilityCard.scss';
import {
  Breadcrumb,
  Card,
  Spin,
  Alert,
} from 'antd';
import { useHistory, useParams } from 'react-router-dom';
import API from '../../services/api-service';

const AbilityCard = () => {
  const { name } = useParams();
  const history = useHistory();
  const [ability, setAbility] = useState({});
  // @ts-ignore
  const abilityUrl = `ability/${name}`;

  useEffect(() => {
    const fetchData = async () => {
      const result = await API.get(abilityUrl);

      setAbility(result.data);
    };
    fetchData();
  }, [abilityUrl]);
  // @ts-ignore
  // eslint-disable-next-line
  const { effect_entries, names } = ability;
  if (!ability) {
    return (
      <Spin tip="Loading...">
        <Alert
          message="Alert message title"
          description="Further details about the context of this alert."
          type="info"
        />
      </Spin>
    );
  }
  return (
    <div>
      <Card className="AbilityCard">
        <Breadcrumb>
          <Breadcrumb.Item>
            <button className="link-button ant-breadcrumb-link"
              onClick={() => {
                history.goBack();
              }}
            >
              {'< Назад'}
            </button>
          </Breadcrumb.Item>
        </Breadcrumb>
        <br />
        <h1 className="ability-name">
          {names && names.length && names[2].name}
        </h1>
        {}
        {// eslint-disable-next-line
          effect_entries && effect_entries[0].effect
        }
      </Card>
    </div>
  );
};
export default AbilityCard;
