const base = 'https://apprslang.herokuapp.com/';

class Service {
  // Get
  _getResource = async (url) => {
    const response = await fetch(`${base}${url}`);
    if (!response.ok) {
      throw new Error(`Could not fetch ${base + url}, received ${response.status}`);
    }
    return await response.json();
  };

  getWordsAll = async () => {
    return await this._getResource('words/');
  };

  // Post

  _postResource = async (url, data = {}) => {
    const response = await fetch(`${base}${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    if (!response.ok) {
      throw new Error(`Could not fetch ${base + url}, received ${response.status}`);
    }
    return await response.json();
  };

  // Put

  _putResource = async (url, data = {}) => {
    const response = await fetch(`${base}${url}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error(`Could not fetch ${base + url}, received ${response.status}`);
    }
    return await response.json();
  };

  // Delete

  _deleteResource = async (url, data = {}) => {
    const response = await fetch(`${base}${url}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error(`Could not fetch ${base + url}, received ${response.status}`);
    }
  };
}

export default Service;
