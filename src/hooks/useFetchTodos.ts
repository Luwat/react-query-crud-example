import { QueryObserverResult,  useQuery} from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { client } from "../api/client";
import { TodoItem } from "../types/todo.types";

const fetchTodos = async (): Promise<AxiosResponse<TodoItem[]>> => {
    return await client.get("/");
}

export const useFetchTodos = (): QueryObserverResult<AxiosResponse<TodoItem[]>> => {
    return useQuery({
        queryFn: async () => {
            const { data } = await fetchTodos()
            return data;
        },
        queryKey: ["todos"],
    });
}