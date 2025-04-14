import { QueryObserverResult, useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { client } from "../api/client";
import { TodoItem } from "../types/todo.types";

const fetchTodo = async (id: number): Promise<AxiosResponse<TodoItem>> => {
    return await client.get<TodoItem>(`/${id}`)
}

export const useFetchTodo = (todoId: number): QueryObserverResult<TodoItem> => {
    return useQuery<TodoItem>({
        queryFn: async () => {
            const { data } = await fetchTodo(todoId);
            return data;
        },
        queryKey: ["todo", todoId]
    })
}