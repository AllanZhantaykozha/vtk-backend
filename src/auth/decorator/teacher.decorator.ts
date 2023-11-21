import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Teacher } from "@prisma/client";

export const CurrentTeacher = createParamDecorator(
    (data: keyof Teacher, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest()
        const teacher = request.user

        return data ? teacher[data] : teacher
    }
)