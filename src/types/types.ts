export type AuthRequest = {
    username: string;
    password: string;
}

export type AuthResponse = {
    success: boolean,
    token: string | null,
    message: string | null
}


export type AuthData = { token: string | null; message: string };

export type Period = {
    month: number,
    year: number,
    day?: number
}

export type ApiError = {
    code: string;
    message: string;
};

export type ApiResponse<T> = {
    success: boolean;
    data: T | null;
    error: ApiError | null;
};
