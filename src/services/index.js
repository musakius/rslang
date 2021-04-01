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

    // Get Auth
    _getAuthResource = async (url, token) => {
        const response = await fetch(`${base}${url}`, {
            method: 'GET',
            withCredentials: true,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
            }
        });
        if (!response.ok) {
            throw new Error(`Could not fetch ${base + url}, received ${response.status}`);
        }
        return await response.json();
    };

    getWordsAll = async (group = 0, page = 0) => {
        return await this._getResource(`words?group=${group}&page=${page}`);
    };

    // Post

    _postResource = async (url, data = {}, token) => {
        const response = await fetch(`${base}${url}`, {
            method: 'POST',
            withCredentials: true,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
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

    postCreateUser = async (url, data = {}) => {

        const response = await fetch(`${base}${url}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        if (response.ok) {
            return response.json()
        }

        if (!response.ok) {

        }

    }

    login = async (url, data = {}) => {
        const response = await fetch(`${base}${url}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        if (response.ok) {
            return response.json()
        } else if (!response.ok) {

        }

    }

}

export default Service;
