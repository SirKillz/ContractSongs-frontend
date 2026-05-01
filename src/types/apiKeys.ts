export type GetApiKeysResponse = {
    id: number,
    access_token: string,
    token_type: string,
    scope: string,
    access_token_expires_at: string,
    refresh_token: string
}

export type RequestApiKeyResponse = {
    access_token: string,
    token_type: string,
    scope: string,
    access_token_expires_at: string,
    refresh_token: string
}

export type CreateApiTokensPayload = {
  access_token: string,
  token_type: string,
  scope: string,
  access_token_expires_at: string,
  refresh_token: string
}