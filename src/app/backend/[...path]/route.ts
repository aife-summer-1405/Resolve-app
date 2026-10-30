
import { NextRequest, NextResponse } from "next/server";
import type { AxiosError, Method } from "axios";
import apiServer from "@/lib/server";

interface IRouteContext {
    params: Promise<{
        path: string[];
    }>;
}

async function proxyRequest(
    request: NextRequest,
    context: IRouteContext
) {


    
    let endpoint = "";

    try {
        const { path } = await context.params;
        const query = request.nextUrl.search;
        endpoint = `/${path.join("/")}${query}`;

        const contentType = request.headers.get("content-type");
        const accept = request.headers.get("accept");

        const body =
            request.method === "GET" || request.method === "HEAD"
                ? undefined
                : await request.text();

        const response = await apiServer.request({
            url: endpoint,
            method: request.method as Method,
            data: body || undefined,
            headers: {
                ...(contentType ? { "Content-Type": contentType } : {}),
                ...(accept ? { Accept: accept } : {}),
            },
        });

        if (response.status === 204) {
            return new NextResponse(null, { status: 204 });
        }

        return NextResponse.json(response.data, {
            status: response.status,
        });
    } catch (error) {
        const axiosError = error as AxiosError;
        const status = axiosError.response?.status ?? 500;

        console.error("Proxy endpoint:", endpoint);
        console.error("Backend baseURL:", axiosError.config?.baseURL);
        console.error("Backend URL path:", axiosError.config?.url);
        console.error("Backend status:", status);
        console.error("Backend response:", axiosError.response?.data);
        console.error("Error message:", axiosError.message);

        return NextResponse.json(
            axiosError.response?.data ?? {
                message: "ارتباط با سرور با خطا مواجه شد.",
            },
            { status }
        );
    }
}

export const GET = proxyRequest;
export const POST = proxyRequest;
export const PUT = proxyRequest;
export const PATCH = proxyRequest;
export const DELETE = proxyRequest;
