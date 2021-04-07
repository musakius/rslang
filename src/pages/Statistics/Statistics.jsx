import React, {useMemo, useState, useEffect} from 'react';
import Table from './components/Table';
import Spinner from '../../components/Spinner';
import Service from '../../services';

import classes from './Statistics.module.scss';

const Statistics = () => {
  const [gamesStats, setGameStats] = useState([]);
  const [load, setLoad] = useState(false);

  const api = useMemo(() => new Service(), []);

  useEffect(() => {
    setLoad(true);
    api
      .getStatisticsUser()
      .then((data) => setGameStats(data))
      .catch((error) => console.log(error))
      .finally(() => setLoad(false));
  }, [api]);

  return (
    <section className={classes['statistics-container']}>
      <h2 className="text-center my-5">Статистика мини-игр</h2>
      {load ? <Spinner size="70px" /> : <Table gamesStats={gamesStats} />}
    </section>
  );
};

export default Statistics;
