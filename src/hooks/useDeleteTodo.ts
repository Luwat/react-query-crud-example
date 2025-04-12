import { UseBaseMutationResult, useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { client } from "../api/client";
import { TodoInput } from "../types/todo.types";

const deleteTodo = async (id: number): Promise<AxiosResponse<TodoInput>> => {
    return await client.delete(`/${id}`)
}

export const useDeleteTodo = (): UseBaseMutationResult<AxiosResponse<TodoInput>, unknown, number, unknown > => {
    const QueryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteTodo,
        onSuccess: () => {
            QueryClient.invalidateQueries(["todos"])
        }
    })
}