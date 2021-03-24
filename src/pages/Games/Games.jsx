import React, {useEffect, useMemo} from 'react';
import Service from '../../services';

const Games = () => {
  const api = useMemo(() => new Service(), []);

  useEffect(() => {
    api
      .getWordsAll()
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  }, [api]);
  return <div>GAMES</div>;
};

export default Games;
