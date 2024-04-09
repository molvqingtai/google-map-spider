import { type RemeshQueryContext, type RemeshDomainContext, type RemeshAction } from 'remesh'
import { type AsyncData, AsyncModule, type AsyncModuleContext, type AsyncModuleOptions } from 'remesh/modules/async'

export interface ApiApiAsyncModuleOptions<T, U> extends AsyncModuleOptions<T, U> {
  loadingMessage?: string
  failMessage?: string
}

const ApiAsyncTaskModule = <T = void, U = void>(
  domain: RemeshDomainContext,
  options: ApiApiAsyncModuleOptions<T, U>
) => {
  const ApiAsyncModule = AsyncModule(domain, {
    name: 'ApiAsyncModule',
    mode: options.mode,
    load: async (context: RemeshQueryContext, arg: T): Promise<U> => {
      return await options.load(context, arg)
    },
    onLoading: (context: AsyncModuleContext, arg: T): RemeshAction => {
      return options.onLoading?.(context, arg) ?? null
    },
    onSuccess: (context: AsyncModuleContext, value: U, arg: T): RemeshAction => {
      return options.onSuccess?.(context, value, arg) ?? null
    },
    onFailed: (context: AsyncModuleContext, error: Error, arg: T): RemeshAction => {
      return options.onFailed?.(context, error, arg) ?? null
    },
    onCanceled: (context: AsyncModuleContext, arg: T): RemeshAction => {
      return options.onCanceled?.(context, arg) ?? null
    },
    onChanged: (context: AsyncModuleContext, data: AsyncData<U>, arg: T): RemeshAction => {
      return options.onChanged?.(context, data, arg) ?? null
    }
  })

  return {
    query: {
      ...ApiAsyncModule.query
    },
    command: {
      ...ApiAsyncModule.command
    },
    event: {
      ...ApiAsyncModule.event
    }
  }
}

export default ApiAsyncTaskModule
