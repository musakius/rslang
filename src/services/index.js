const base = 'https://apprslang.herokuapp.com/';

class Service {
  _getToken = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return user.token ? `Bearer ${user.token}` : '';
  };

  _getUserId = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return user.userId;
  };

  // Get
  _getResource = async (url) => {
    const response = await fetch(`${base}${url}`, {
      method: 'GET',
      withCredentials: true,
      headers: {
        Authorization: this._getToken(),
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      let error = new Error(
        `Could not fetch ${base + url}, received ${response.status}`
      );
      error.status = response.status;
      throw error;
    }

    return await response.json();
  };

  getWordsAll = async (group = 0, page = 0) => {
    return await this._getResource(`words?group=${group}&page=${page}`);
  };

  getAggregatedWordsAll = async (
    optional = '"userWord.optional.isDeleted":false'
  ) => {
    return await this._getResource(
      `users/${this._getUserId()}/aggregatedWords?&filter={${optional}}`
    );
  };
  getAggregatedWordsAll = async (
    group,
    page,
    optional = '"userWord.optional.isDeleted":true'
  ) => {
    return await this._getResource(
      `users/${this._getUserId()}/aggregatedWords?group=${group}&page=${page}&wordsPerPage=200&filter={${optional}}`
    );
  };

  getStatisticsUser = async () => {
    return await this._getResource(`users/${this._getUserId()}/statistics`);
  };

  getUserWord = async (wordId) => {
    return await this._getResource(
      `users/${this._getUserId()}/words/${wordId}`
    );
  };

  getUserWordsAll = async () => {
    return await this._getResource(
      `users/${this._getUserId()}/words`
    );
  };

  // Post

  _postResource = async (url, data = {}) => {
    const response = await fetch(`${base}${url}`, {
      method: 'POST',
      withCredentials: true,
      headers: {
        Authorization: this._getToken(),
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(
        `Could not fetch ${base + url}, received ${response.status}`
      );
    }
    return await response.json();
  };

  postWord = async (wordId, data) => {
    return await this._postResource(
      `users/${this._getUserId()}/words/${wordId}`,
      data
    );
  };

  // Put

  _putResource = async (url, data = {}) => {
    const response = await fetch(`${base}${url}`, {
      method: 'PUT',
      withCredentials: true,
      headers: {
        Authorization: this._getToken(),
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(
        `Could not fetch ${base + url}, received ${response.status}`
      );
    }
    return await response.json();
  };

  putStatisticsUser = async (data = {}) => {
    return await this._putResource(
      `users/${this._getUserId()}/statistics`,
      data
    );
  };

  putUserWord = async (wordId, data = {}) => {
    console.log('data', data);
    return await this._putResource(
      `users/${this._getUserId()}/words/${wordId}`,
      data
    );
  };

  // Delete

  _deleteResource = async (url, data = {}) => {
    const response = await fetch(`${base}${url}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(
        `Could not fetch ${base + url}, received ${response.status}`
      );
    }
  };

  postCreateUser = async (url, data = {}) => {
    const response = await fetch(`${base}${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      return response.json();
    }

    if (!response.ok) {
    }
  };

  login = async (url, data = {}) => {
    const response = await fetch(`${base}${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      return response.json();
    } else if (!response.ok) {
    }
  };
}

export default Service;
