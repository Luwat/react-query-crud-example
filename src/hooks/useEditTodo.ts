import { UseBaseMutationResult, useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import { client } from "../api/client";
import { TodoInput } from "../types/todo.types";

const editTodo = async (todoId: number, todo: TodoInput): Promise<AxiosResponse<TodoInput>> => {
    return await client.put<TodoInput>(`/${todoId}`, todo);
}

export const useEditTodo = (todoId: number): UseBaseMutationResult<AxiosResponse<TodoInput>, unknown, TodoInput> => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: (todo: TodoInput) => editTodo(todoId, todo),
        onSuccess: () => {
            queryClient.invalidateQueries([ "todos" ]);
            navigate("/", { replace: true })
        }
    })
}