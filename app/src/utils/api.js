import { bannerImagePath, profileImagePath } from './config';

const apiHost = `http://${window.location.hostname}:3001`;

export async function fetchJoin(newUserDetails) {
  const res = await fetch(`${apiHost}/auth/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newUserDetails),
    credentials: 'include',
  });

  const data = await res.json();
  if (data.error) throw new Error(data.error);

  return data;
}

export async function fetchLogin({ email, password }) {
  const res = await fetch(`${apiHost}/auth/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
    credentials: 'include',
  });

  const data = await res.json();
  if (res.status === 200) return data;

  throw new Error(data.error);
}

export async function fetchAuthN() {
  const res = await fetch(`${apiHost}/auth/signin`, {
    method: 'GET',
    credentials: 'include',
  });

  if (res.status === 200) {
    const data = await res.json();
    data.portraitUrl = `${profileImagePath}${data.handle}`;
    data.bannerUrl = `${bannerImagePath}${data.handle}`;

    return data;
  }

  const msg = await res.text();
  throw new Error(msg);
}

export async function fetchCurrentProfile() {
  const res = await fetch(`${apiHost}/profile/`, { credentials: 'include' });

  const profile = await res.json();
  if (res.status === 200) return profile;

  return {};
}

export async function fetchProfile(handle) {
  const res = await fetch(`${apiHost}/${handle}`, { credentials: 'include' });

  const profile = await res.json();
  if (res.status === 200) return profile;

  return {};
}

export async function fetchUpdateProfile(profile) {
  const formData = new FormData();
  Object.entries(profile).forEach(([name, value]) => {
    if (typeof value !== 'undefined' || value !== null) {
      formData.append(name, value);
    }
  });

  const res = await fetch(`${apiHost}/`, {
    method: 'PUT',
    credentials: 'include',
    body: formData,
  });

  if (res.status !== 200) {
    throw new Error('Unable to update profile image');
  }

  const data = await res.json();
  return data;
}

export async function fetchTweets(handle) {
  const res = await fetch(`${apiHost}/tweet?handle=${handle}`, {
    credentials: 'include',
  });

  const { tweets } = await res.json();
  if (res.status === 200) return tweets;

  return [];
}

export async function fetchFavorites(handle) {
  const res = await fetch(`${apiHost}/favorite?handle=${handle}`, {
    credentials: 'include',
  });

  const { likes } = await res.json();
  if (res.status === 200) return likes;

  return [];
}

export async function fetchToggleFavorite(id) {
  const res = await fetch(`${apiHost}/favorite?tweet=${id}`, {
    method: 'PUT',
    credentials: 'include',
  });

  const { favoriteTweets } = await res.json();
  if (res.status === 200) return favoriteTweets;

  return [];
}

export async function fetchCreateTweet(tweet) {
  const res = await fetch(`${apiHost}/tweet`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ body: tweet.text }),
    credentials: 'include',
  });

  if (res.status === 200) {
    const result = await res.json();
    return result;
  }

  return {};
}
