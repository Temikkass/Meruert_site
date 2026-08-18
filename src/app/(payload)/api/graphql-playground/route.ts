/* THIS FILE IS PART OF THE PAYLOAD ADMIN MOUNT — see (payload)/layout.tsx. */
import config from "@payload-config";
import { GRAPHQL_PLAYGROUND_GET } from "@payloadcms/next/routes";

export const GET = GRAPHQL_PLAYGROUND_GET(config);
