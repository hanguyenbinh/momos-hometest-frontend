import { useCallback } from "react";
import useFetchBase from "../use-fetch-base";
import useFetch from "../use-fetch";
import { API_URL } from "../config";
import { User } from "../types/user";
import { Tokens } from "../types/tokens";
import wrapperFetchJsonResponse from "../wrapper-fetch-json-response";
import { RequestConfigType } from "./types/request-config";
import wrapperFetchJsonData from "../wrapper-json-data";

export type AuthLoginRequest = {
  email: string;
  password: string;
};

export type AuthLoginResponse = Tokens & {
  user: User;
};

export function useAuthLoginService() {
  const fetchBase = useFetchBase();

  return useCallback(
    (data: AuthLoginRequest) => {
      return fetchBase(`${API_URL}/auth/login`, {
        method: "POST",
        body: JSON.stringify(data),
      }).then(async (response) => {
        const wrapperResponse = await wrapperFetchJsonResponse(response);
        const wrapperData =
          wrapperFetchJsonData<AuthLoginResponse>(wrapperResponse);
        return wrapperData;
      });
    },
    [fetchBase]
  );
}

export type AuthGoogleLoginRequest = {
  idToken: string;
};

export type AuthGoogleLoginResponse = Tokens & {
  user: User;
};

export function useAuthGoogleLoginService() {
  const fetchBase = useFetchBase();

  return useCallback(
    (data: AuthGoogleLoginRequest) => {
      return fetchBase(`${API_URL}/auth/google/login`, {
        method: "POST",
        body: JSON.stringify(data),
      }).then(async (response) => {
        const wrapperResponse = await wrapperFetchJsonResponse(response);
        const wrapperData =
          wrapperFetchJsonData<AuthGoogleLoginResponse>(wrapperResponse);
        return wrapperData;
      });
    },
    [fetchBase]
  );
}

export type AuthFacebookLoginRequest = {
  accessToken: string;
};

export type AuthFacebookLoginResponse = Tokens & {
  user: User;
};

export function useAuthFacebookLoginService() {
  const fetchBase = useFetchBase();

  return useCallback(
    (data: AuthFacebookLoginRequest, requestConfig?: RequestConfigType) => {
      return fetchBase(`${API_URL}/auth/facebook/login`, {
        method: "POST",
        body: JSON.stringify(data),
        ...requestConfig,
      }).then(async (response) => {
        const wrapperResponse = await wrapperFetchJsonResponse(response);
        const wrapperData =
          wrapperFetchJsonData<AuthFacebookLoginResponse>(wrapperResponse);
        return wrapperData;
      });
    },
    [fetchBase]
  );
}

export type AuthSignUpRequest = {
  email: string;
  password: string;
};

export type AuthSignUpResponse = void;

export function useAuthSignUpService() {
  const fetchBase = useFetchBase();

  return useCallback(
    (data: AuthSignUpRequest, requestConfig?: RequestConfigType) => {
      return fetchBase(`${API_URL}/auth/register`, {
        method: "POST",
        body: JSON.stringify(data),
        ...requestConfig,
      }).then(async (response) => {
        const wrapperResponse = await wrapperFetchJsonResponse(response);
        const wrapperData =
          wrapperFetchJsonData<AuthSignUpResponse>(wrapperResponse);
        return wrapperData;
      });
    },
    [fetchBase]
  );
}

export type AuthConfirmEmailRequest = {
  hash: string;
};

export type AuthConfirmEmailResponse = void;

export function useAuthConfirmEmailService() {
  const fetchBase = useFetchBase();

  return useCallback(
    (data: AuthConfirmEmailRequest, requestConfig?: RequestConfigType) => {
      return fetchBase(`${API_URL}/auth/confirm`, {
        method: "POST",
        body: JSON.stringify(data),
        ...requestConfig,
      }).then(async (response) => {
        const wrapperResponse = await wrapperFetchJsonResponse(response);
        const wrapperData =
          wrapperFetchJsonData<AuthConfirmEmailResponse>(wrapperResponse);
        return wrapperData;
      });
    },
    [fetchBase]
  );
}

export type AuthConfirmNewEmailRequest = {
  hash: string;
};

export type AuthConfirmNewEmailResponse = void;

export function useAuthConfirmNewEmailService() {
  const fetchBase = useFetchBase();

  return useCallback(
    (data: AuthConfirmNewEmailRequest, requestConfig?: RequestConfigType) => {
      return fetchBase(`${API_URL}/auth/confirm/new`, {
        method: "POST",
        body: JSON.stringify(data),
        ...requestConfig,
      }).then(async (response) => {
        const wrapperResponse = await wrapperFetchJsonResponse(response);
        const wrapperData =
          wrapperFetchJsonData<AuthConfirmNewEmailResponse>(wrapperResponse);
        return wrapperData;
      });
    },
    [fetchBase]
  );
}

export type AuthForgotPasswordRequest = {
  email: string;
};

export type AuthForgotPasswordResponse = void;

export function useAuthForgotPasswordService() {
  const fetchBase = useFetchBase();

  return useCallback(
    (data: AuthForgotPasswordRequest, requestConfig?: RequestConfigType) => {
      return fetchBase(`${API_URL}/auth/forgot/password`, {
        method: "POST",
        body: JSON.stringify(data),
        ...requestConfig,
      }).then(async (response) => {
        const wrapperResponse = await wrapperFetchJsonResponse(response);
        const wrapperData =
          wrapperFetchJsonData<AuthForgotPasswordResponse>(wrapperResponse);
        return wrapperData;
      });
    },
    [fetchBase]
  );
}

export type AuthResetPasswordRequest = {
  password: string;
  hash: string;
};

export type AuthResetPasswordResponse = void;

export function useAuthResetPasswordService() {
  const fetchBase = useFetchBase();

  return useCallback(
    (data: AuthResetPasswordRequest, requestConfig?: RequestConfigType) => {
      return fetchBase(`${API_URL}/auth/reset/password`, {
        method: "POST",
        body: JSON.stringify(data),
        ...requestConfig,
      }).then(async (response) => {
        const wrapperResponse = await wrapperFetchJsonResponse(response);
        const wrapperData =
          wrapperFetchJsonData<AuthResetPasswordResponse>(wrapperResponse);
        return wrapperData;
      });
    },
    [fetchBase]
  );
}

export type AuthPatchMeRequest =
  | Partial<Pick<User, "firstName" | "lastName" | "email">>
  | { password: string; oldPassword: string };

export type AuthPatchMeResponse = User;

export function useAuthPatchMeService() {
  const fetch = useFetch();

  return useCallback(
    (data: AuthPatchMeRequest, requestConfig?: RequestConfigType) => {
      return fetch(`${API_URL}/auth/me`, {
        method: "PATCH",
        body: JSON.stringify(data),
        ...requestConfig,
      }).then(async (response) => {
        const wrapperResponse = await wrapperFetchJsonResponse(response);
        const wrapperData =
          wrapperFetchJsonData<AuthPatchMeResponse>(wrapperResponse);
        return wrapperData;
      });
    },
    [fetch]
  );
}

export type AuthGetMeResponse = User;

export function useAuthGetMeService() {
  const fetch = useFetch();

  return useCallback(
    (requestConfig?: RequestConfigType) => {
      return fetch(`${API_URL}/auth/me`, {
        method: "GET",
        ...requestConfig,
      }).then(async (response) => {
        const wrapperResponse = await wrapperFetchJsonResponse(response);
        const wrapperData =
          wrapperFetchJsonData<AuthGetMeResponse>(wrapperResponse);
        return wrapperData;
      });
    },
    [fetch]
  );
}
