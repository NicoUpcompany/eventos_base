import { basePath, apiVersion } from './config';

export function signUpApi(data) {
    const url = `${basePath}/${apiVersion}/sign-up`;

    const params = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    };

    return fetch(url, params)
        .then(resp => {
            return resp.json();
        }).then(result => {
            return result;
        }).catch(err => {
            return err.message;
        });
}

export function signInApi(data) {
    const url = `${basePath}/${apiVersion}/sign-in`;

    const params = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    };

    return fetch(url, params)
        .then(resp => {
            return resp.json();
        }).then(result => {
            return result;
        }).catch(err => {
            return err.message;
        });
}

export function signInAdminApi(data) {
    const url = `${basePath}/${apiVersion}/sign-in-admin`;

    const params = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    };

    return fetch(url, params)
        .then(resp => {
            return resp.json();
        }).then(result => {
            return result;
        }).catch(err => {
            return err.message;
        });
}

export function getUsersApi(token) {
    const url = `${basePath}/${apiVersion}/users`;

    const params = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: token
        }
    };

    return fetch(url, params)
        .then(resp => {
            return resp.json();
        })
        .then(result => {
            return result;
        })
        .catch(err => {
            return err.message;
        });
}

export function updateWaitingRoomTimeApi(token, data) {
    const url = `${basePath}/${apiVersion}/update-user-waiting-room`;

    const params = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
            Authorization: token
        }
    };

    return fetch(url, params)
        .then(response => {
            return response.json();
        })
        .then(result => {
            return result;
        })
        .catch(err => {
            return err.message;
        });
}

export function updateStreamTimeApi(token, data) {
    const url = `${basePath}/${apiVersion}/update-stream-time`;

    const params = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: token
        },
        body: JSON.stringify(data)
    };

    return fetch(url, params)
        .then(response => {
            return response.json();
        })
        .then(result => {
            return result;
        })
        .catch(err => {
            return err.message;
        });
}