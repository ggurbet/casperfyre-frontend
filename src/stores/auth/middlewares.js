import { toast } from 'react-toastify';
import { all, put, takeLatest } from 'redux-saga/effects';
import { getGuid, removeToken, setGuid } from 'shared/core/services/auth';
import { get, post } from 'shared/core/services/saga';
import { types } from 'stores/types';
import { clearUser, setUser } from './actions';

function* login({ payload, resolve, reject }) {
  try {
    const res = yield post(['user', 'login'], { data: payload });
    setGuid(res.detail?.guid);
    resolve(res);
  } catch (error) {
    toast(error.message);
    reject(error);
  }
}

function* sendLoginMail({ payload, resolve, reject }) {
  try {
    const res = yield get(['user', 'name-by-email'], { email: payload });
    resolve(res.detail);
  } catch (error) {
    toast(error.message);
    reject(error);
  }
}

function* resetPassword({ payload, resolve, reject }) {
  try {
    const res = yield post(['user', 'reset-password'], { data: payload });
    resolve(res.data);
  } catch (error) {
    toast(error.message);
    reject(error);
  }
}

function* forgotPassword({ payload, resolve, reject }) {
  try {
    const res = yield post(['user', 'forgot-password'], { data: payload });
    resolve(res.data);
  } catch (error) {
    toast(error.message);
    reject(error);
  }
}

function* register({ payload, resolve, reject }) {
  try {
    const res = yield post(['user', 'register'], { data: payload });
    resolve(res);
  } catch (error) {
    toast(error.message);
    reject(error);
  }
}

function* confirmRegistration({ payload, resolve, reject }) {
  try {
    const res = yield post(['user', 'confirm-registration'], { data: payload });
    resolve(res);
  } catch (error) {
    toast(error.message);
    reject(error);
  }
}

function* doLogout({ resolve }) {
  removeToken();
  yield put(clearUser());
  resolve();
}

function* verifyCode({ payload, resolve, reject }) {
  try {
    const res = yield post(['user', 'submit-mfa'], { data: payload });
    toast.success(res.detail);
    resolve(res);
  } catch (error) {
    toast(error.message);
    reject(error);
  }
}

function* confirmMFA({ payload, resolve, reject }) {
  try {
    const res = yield post(['admin', 'confirm-mfa'], { data: payload });
    toast.success(res.detail);
    resolve(res);
  } catch (error) {
    toast(error.message);
    reject(error);
  }
}

function* fetchUserInfo({ resolve, reject }) {
  try {
    const guid = getGuid();
    const res = yield get(['user', 'me'], { guid });

    yield put(setUser(res.detail));
    resolve(res);
  } catch (error) {
    toast(error.message);
    reject(error);
  }
}

export function* watchAuth() {
  yield all([
    takeLatest(types.LOGIN, login),
    takeLatest(types.LOGOUT, doLogout),
    takeLatest(types.SIGN_UP, register),
    takeLatest(types.SEND_LOGIN_MAIL, sendLoginMail),
    takeLatest(types.RESET_PASSWORD, resetPassword),
    takeLatest(types.FORGOT_PASSWORD, forgotPassword),
    takeLatest(types.VERIFY_CODE, verifyCode),
    takeLatest(types.CONFIRM_REGISTRATION, confirmRegistration),
    takeLatest(types.FETCH_USER_INFO, fetchUserInfo),
    takeLatest(types.CONFIRM_MFA, confirmMFA),
  ]);
}
