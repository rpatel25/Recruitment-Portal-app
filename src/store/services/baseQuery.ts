import { fetchBaseQuery, FetchBaseQueryError } from "@reduxjs/toolkit/query";
import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import { base_url } from "@/util/api";
import { getUserAccessToken } from "@/util/authToken";

const baseQuery = fetchBaseQuery({
  baseUrl: base_url,
  prepareHeaders: async (headers) => {
    const user_token = await getUserAccessToken();
    if (user_token) {
      headers.set("Authorization", `Bearer ${user_token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  any,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 403) {
    console.warn("403 detected. Calling recovery function...");
    await handleForbidden();

    // Retry the original query
    result = await baseQuery(args, api, extraOptions);
  }

  return result;
};

async function handleForbidden() {
  // ToDo: Refresh token api call
}

export default baseQueryWithReauth;
